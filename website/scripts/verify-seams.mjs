#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import {
  DEFAULT_THRESHOLDS,
  evaluateSeam,
  loadManifest,
  normalizeProbe,
  parseSsim,
} from './lib/media-gates.mjs'
import { run } from './lib/ffmpeg.mjs'

const manifestFile = resolve(process.argv[2] || 'story.clips.json')
const artifactsRoot = resolve(process.argv[3] || 'artifacts/seams')
const ffmpeg = process.env.FFMPEG_BIN || 'ffmpeg'
const ffprobe = process.env.FFPROBE_BIN || 'ffprobe'
const manifest = await loadManifest(manifestFile)
const base = resolve(manifest.baseDir || '.')
const thresholds = { ...DEFAULT_THRESHOLDS, ...(manifest.thresholds || {}) }
const reports = []

async function probe(filename) {
  const result = await run(ffprobe, ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', filename])
  return normalizeProbe(JSON.parse(result.stdout), filename)
}

async function extractFrames(filename, firstFrame, count, pattern) {
  await run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', filename,
    '-vf', `select='between(n,${firstFrame},${firstFrame + count - 1})'`,
    '-vsync', '0', '-start_number', '0', pattern,
  ])
}

async function ssim(left, right) {
  const result = await run(ffmpeg, [
    '-hide_banner', '-i', left, '-i', right,
    '-lavfi', '[0:v][1:v]ssim', '-f', 'null', '-',
  ])
  return parseSsim(result.stderr)
}

for (let index = 0; index < manifest.clips.length - 1; index += 1) {
  const leftClip = manifest.clips[index]
  const rightClip = manifest.clips[index + 1]
  const leftFile = resolve(base, leftClip.file)
  const rightFile = resolve(base, rightClip.file)
  const leftMeta = await probe(leftFile)
  await probe(rightFile)
  const id = `${String(index + 1).padStart(2, '0')}-${leftClip.id}--${rightClip.id}`
  const out = resolve(artifactsRoot, id)
  await mkdir(out, { recursive: true })
  const leftPattern = resolve(out, 'left-%02d.png')
  const rightPattern = resolve(out, 'right-%02d.png')
  await extractFrames(leftFile, Math.max(0, leftMeta.frameCount - 3), 3, leftPattern)
  await extractFrames(rightFile, 0, 3, rightPattern)

  const boundary = await ssim(resolve(out, 'left-02.png'), resolve(out, 'right-00.png'))
  const leftMotion = [
    await ssim(resolve(out, 'left-00.png'), resolve(out, 'left-01.png')),
    await ssim(resolve(out, 'left-01.png'), resolve(out, 'left-02.png')),
  ]
  const rightMotion = [
    await ssim(resolve(out, 'right-00.png'), resolve(out, 'right-01.png')),
    await ssim(resolve(out, 'right-01.png'), resolve(out, 'right-02.png')),
  ]
  const evaluation = evaluateSeam({ boundary, leftMotion, rightMotion }, thresholds)

  await run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', resolve(out, 'left-02.png'), '-i', resolve(out, 'right-00.png'),
    '-filter_complex', '[0:v][1:v]blend=all_mode=difference,eq=contrast=4:brightness=0.08',
    '-frames:v', '1', resolve(out, 'difference.png'),
  ])

  const report = {
    seam: id,
    left: basename(leftFile),
    right: basename(rightFile),
    boundary,
    leftMotion,
    rightMotion,
    ...evaluation,
  }
  reports.push(report)
  await writeFile(resolve(out, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)
}

await mkdir(artifactsRoot, { recursive: true })
await writeFile(resolve(artifactsRoot, 'summary.json'), `${JSON.stringify({ thresholds, reports }, null, 2)}\n`)
const failed = reports.filter((report) => report.failures.length)
if (failed.length) {
  for (const report of failed) console.error(`${report.seam}: ${report.failures.join('; ')}`)
  process.exitCode = 1
} else {
  console.log(`Seam gate passed for ${reports.length} boundaries.`)
}
