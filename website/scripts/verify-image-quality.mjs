#!/usr/bin/env node
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { basename, dirname, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { parseSsim } from './lib/media-gates.mjs'
import { run } from './lib/ffmpeg.mjs'

const manifestFile = resolve(process.argv[2] || 'media.quality.json')
const artifactsRoot = resolve(process.argv[3] || 'artifacts/quality')
const ffmpeg = process.env.FFMPEG_BIN || 'ffmpeg'
const ffprobe = process.env.FFPROBE_BIN || 'ffprobe'
const vmaf = process.env.VMAF_BIN || 'vmaf'
const publicBaseUrl = process.env.PUBLIC_BASE_URL || ''
const manifest = JSON.parse(await readFile(manifestFile, 'utf8'))
const manifestRoot = dirname(manifestFile)

function requireFinite(value, label) {
  const number = Number(value)
  if (!Number.isFinite(number)) throw new Error(`${label} must be a finite number`)
  return number
}

function parseVmaf(report, filename) {
  const score = Number(report?.pooled_metrics?.vmaf?.mean)
  if (!Number.isFinite(score)) {
    throw new Error(`${filename}: VMAF report does not contain pooled_metrics.vmaf.mean`)
  }
  return score
}

if (!Array.isArray(manifest.assets) || manifest.assets.length === 0) {
  throw new Error('quality manifest must contain at least one asset')
}

const thresholds = {
  ssimOverall: requireFinite(manifest.thresholds?.ssimOverall, 'thresholds.ssimOverall'),
  ssimLuma: requireFinite(manifest.thresholds?.ssimLuma, 'thresholds.ssimLuma'),
  vmaf: requireFinite(manifest.thresholds?.vmaf, 'thresholds.vmaf'),
}
const evaluation = {
  resolution: 'native',
  fps: requireFinite(manifest.evaluation?.fps, 'evaluation.fps'),
  frames: requireFinite(manifest.evaluation?.frames, 'evaluation.frames'),
  vmafModel: String(manifest.evaluation?.vmafModel || 'vmaf_v0.6.1'),
}

const ffmpegVersionResult = await run(ffmpeg, ['-version'])
const vmafVersionResult = await run(vmaf, ['--version'])
const ffmpegVersion = (ffmpegVersionResult.stdout || ffmpegVersionResult.stderr).split('\n')[0].trim()
const vmafVersion = (vmafVersionResult.stdout || vmafVersionResult.stderr).trim()
const work = await mkdtemp(resolve(tmpdir(), 'maplespire-quality-'))
const reports = []

async function renderY4m(input, output) {
  await run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', input,
    '-vf', 'tpad=stop_mode=clone:stop_duration=1,format=yuv420p',
    '-r', String(evaluation.fps),
    '-frames:v', String(evaluation.frames),
    output,
  ])
}

async function probeImage(input) {
  const result = await run(ffprobe, [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'json', input,
  ])
  const stream = JSON.parse(result.stdout)?.streams?.[0]
  const width = Number(stream?.width)
  const height = Number(stream?.height)
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error(`${input}: ffprobe did not return a valid image size`)
  }
  return { width, height }
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

try {
  for (const [index, asset] of manifest.assets.entries()) {
    if (!asset || typeof asset.id !== 'string' || typeof asset.reference !== 'string' || typeof asset.served !== 'string') {
      throw new Error(`quality manifest asset ${index} must provide string id, reference and served fields`)
    }

    const reference = resolve(manifestRoot, asset.reference)
    const served = resolve(manifestRoot, asset.served)
    await access(reference)
    await access(served)
    const referenceSize = await probeImage(reference)
    const servedSize = await probeImage(served)
    if (referenceSize.width !== servedSize.width || referenceSize.height !== servedSize.height) {
      throw new Error(`${asset.id}: served dimensions ${servedSize.width}x${servedSize.height} differ from reference ${referenceSize.width}x${referenceSize.height}`)
    }

    const assetWork = resolve(work, asset.id)
    const assetArtifacts = resolve(artifactsRoot, asset.id)
    await mkdir(assetWork, { recursive: true })
    await mkdir(assetArtifacts, { recursive: true })

    const referenceY4m = resolve(assetWork, 'reference.y4m')
    const servedY4m = resolve(assetWork, 'served.y4m')
    await renderY4m(reference, referenceY4m)
    await renderY4m(served, servedY4m)

    const ssimResult = await run(ffmpeg, [
      '-hide_banner', '-i', servedY4m, '-i', referenceY4m,
      '-lavfi', '[0:v][1:v]ssim', '-f', 'null', '-',
    ])
    const ssim = parseSsim(ssimResult.stderr)

    const vmafReportFile = resolve(assetArtifacts, 'vmaf.json')
    await run(vmaf, [
      '--reference', referenceY4m,
      '--distorted', servedY4m,
      '--model', `version=${evaluation.vmafModel}`,
      '--output', vmafReportFile,
      '--json',
      '--threads', '4',
      '--quiet',
    ])
    const rawVmaf = JSON.parse(await readFile(vmafReportFile, 'utf8'))
    const vmafScore = parseVmaf(rawVmaf, vmafReportFile)
    const failures = []
    if (ssim.overall < thresholds.ssimOverall) {
      failures.push(`overall SSIM ${ssim.overall.toFixed(6)} < ${thresholds.ssimOverall.toFixed(3)}`)
    }
    if (ssim.luma < thresholds.ssimLuma) {
      failures.push(`luma SSIM ${ssim.luma.toFixed(6)} < ${thresholds.ssimLuma.toFixed(3)}`)
    }
    if (vmafScore < thresholds.vmaf) {
      failures.push(`VMAF ${vmafScore.toFixed(4)} < ${thresholds.vmaf.toFixed(1)}`)
    }

    const builtBytes = await readFile(served)
    const builtSha256 = sha256(builtBytes)
    let httpVerification = { status: 'not-requested' }
    if (publicBaseUrl) {
      const assetUrl = new URL(`/media/${basename(served)}`, publicBaseUrl)
      const response = await fetch(assetUrl)
      if (!response.ok) {
        failures.push(`HTTP verification failed: ${assetUrl} returned ${response.status}`)
        httpVerification = { status: 'failed', url: String(assetUrl), httpStatus: response.status }
      } else {
        const httpSha256 = sha256(Buffer.from(await response.arrayBuffer()))
        const matchesBuild = httpSha256 === builtSha256
        if (!matchesBuild) failures.push(`HTTP asset hash ${httpSha256} differs from built asset ${builtSha256}`)
        httpVerification = { status: matchesBuild ? 'matched' : 'failed', url: String(assetUrl), sha256: httpSha256 }
      }
    }

    const report = {
      id: asset.id,
      reference: basename(reference),
      served: basename(served),
      qualityClass: manifest.qualityClass,
      thresholds,
      dimensions: referenceSize,
      builtSha256,
      httpVerification,
      ssim,
      vmaf: vmafScore,
      failures,
    }
    reports.push(report)
    await writeFile(resolve(assetArtifacts, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)
  }
} finally {
  await rm(work, { recursive: true, force: true })
}

const summary = {
  qualityClass: manifest.qualityClass,
  generatedAt: new Date().toISOString(),
  tools: { ffmpeg: ffmpegVersion, vmaf: vmafVersion },
  evaluation,
  thresholds,
  reports,
}
await mkdir(artifactsRoot, { recursive: true })
await writeFile(resolve(artifactsRoot, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`)

const failed = reports.filter((report) => report.failures.length)
for (const report of reports) {
  const status = report.failures.length ? 'FAIL' : 'PASS'
  const http = report.httpVerification.status === 'matched' ? ' HTTP=matched' : ''
  console.log(`${status} ${report.id}: SSIM(All)=${report.ssim.overall.toFixed(6)} SSIM(Y)=${report.ssim.luma.toFixed(6)} VMAF=${report.vmaf.toFixed(4)}${http}`)
}
if (failed.length) {
  console.error(`${manifest.qualityClass} quality gate failed for ${failed.length}/${reports.length} asset(s).`)
  for (const report of failed) console.error(`- ${report.id}: ${report.failures.join('; ')}`)
  process.exitCode = 1
} else {
  console.log(`${manifest.qualityClass} quality gate passed for ${reports.length} real source/served comparisons.`)
}
