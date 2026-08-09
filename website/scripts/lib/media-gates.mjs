import { readFile } from 'node:fs/promises'

export const DEFAULT_THRESHOLDS = Object.freeze({
  overall: 0.985,
  luma: 0.990,
  motionDelta: 0.030,
})

export function parseRate(value) {
  if (typeof value !== 'string' || !value) return Number.NaN
  const [numerator, denominator = '1'] = value.split('/').map(Number)
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return Number.NaN
  }
  return numerator / denominator
}

export function parseSsim(output) {
  const matches = [...String(output).matchAll(/SSIM[^\n]*?Y:([0-9.]+)[^\n]*?All:([0-9.]+)/g)]
  const fallback = [...String(output).matchAll(/All:([0-9.]+)/g)]
  const match = matches.at(-1)
  if (match) return { luma: Number(match[1]), overall: Number(match[2]) }
  const last = fallback.at(-1)
  if (last) return { luma: Number(last[1]), overall: Number(last[1]) }
  throw new Error('ffmpeg output did not contain an SSIM summary')
}

export function normalizeProbe(raw, file = '<unknown>') {
  const streams = Array.isArray(raw?.streams) ? raw.streams : []
  const videos = streams.filter((stream) => stream.codec_type === 'video')
  const audio = streams.filter((stream) => stream.codec_type === 'audio')
  if (videos.length !== 1) throw new Error(`${file}: expected exactly one video stream`)
  const video = videos[0]
  const frameRate = parseRate(video.avg_frame_rate || video.r_frame_rate)
  const frameCount = Number(video.nb_read_frames || video.nb_frames)
  const duration = Number(video.duration || raw?.format?.duration)
  return {
    file,
    width: Number(video.width),
    height: Number(video.height),
    frameRate,
    frameCount,
    duration,
    pixelFormat: video.pix_fmt || 'unknown',
    colorSpace: video.color_space || 'unknown',
    colorTransfer: video.color_transfer || 'unknown',
    colorPrimaries: video.color_primaries || 'unknown',
    audioStreams: audio.length,
  }
}

export function validateMediaSet(items) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('manifest contains no clips')
  const failures = []
  const baseline = items[0]
  const fields = [
    'width',
    'height',
    'pixelFormat',
    'colorSpace',
    'colorTransfer',
    'colorPrimaries',
  ]
  for (const item of items) {
    if (item.audioStreams !== 0) failures.push(`${item.file}: audio is not allowed`)
    if (!Number.isFinite(item.frameRate) || item.frameRate <= 0) {
      failures.push(`${item.file}: invalid frame rate`)
    }
    if (!Number.isFinite(item.frameCount) || item.frameCount < 3) {
      failures.push(`${item.file}: at least three decoded frames are required`)
    }
    for (const field of fields) {
      if (item[field] !== baseline[field]) {
        failures.push(`${item.file}: ${field}=${item[field]} differs from ${baseline.file} (${baseline[field]})`)
      }
    }
    if (Number.isFinite(item.frameRate) && Math.abs(item.frameRate - baseline.frameRate) > 0.001) {
      failures.push(`${item.file}: frameRate=${item.frameRate} differs from ${baseline.file} (${baseline.frameRate})`)
    }
  }
  return failures
}

export function evaluateSeam({ boundary, leftMotion, rightMotion }, thresholds = DEFAULT_THRESHOLDS) {
  const failures = []
  if (boundary.overall < thresholds.overall) {
    failures.push(`overall SSIM ${boundary.overall.toFixed(6)} < ${thresholds.overall.toFixed(3)}`)
  }
  if (boundary.luma < thresholds.luma) {
    failures.push(`luma SSIM ${boundary.luma.toFixed(6)} < ${thresholds.luma.toFixed(3)}`)
  }
  const leftSamples = (Array.isArray(leftMotion) ? leftMotion : [leftMotion])
    .map((sample) => Math.max(0, 1 - sample.overall))
  const rightSamples = (Array.isArray(rightMotion) ? rightMotion : [rightMotion])
    .map((sample) => Math.max(0, 1 - sample.overall))
  const average = (samples) => samples.reduce((sum, value) => sum + value, 0) / samples.length
  const leftVelocity = average(leftSamples)
  const rightVelocity = average(rightSamples)
  const motionDelta = Math.abs(leftVelocity - rightVelocity)
  if (motionDelta > thresholds.motionDelta) {
    failures.push(`motion delta ${motionDelta.toFixed(6)} > ${thresholds.motionDelta.toFixed(3)}`)
  }
  return { failures, leftVelocity, rightVelocity, motionDelta, leftSamples, rightSamples }
}

export async function loadManifest(filename) {
  const value = JSON.parse(await readFile(filename, 'utf8'))
  if (!Array.isArray(value?.clips) || value.clips.length < 2) {
    throw new Error('manifest must contain at least two ordered clips')
  }
  for (const [index, clip] of value.clips.entries()) {
    if (!clip || typeof clip.id !== 'string' || typeof clip.file !== 'string') {
      throw new Error(`manifest clip ${index} must have string id and file fields`)
    }
  }
  return value
}
