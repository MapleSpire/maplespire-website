#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { run } from './lib/ffmpeg.mjs'

const ffmpeg = process.env.FFMPEG_BIN || 'ffmpeg'
const renderReport = JSON.parse(await readFile(resolve('artifacts/story-render/render-report.json'), 'utf8'))
const totalFrames = Number(renderReport.totalFrames)
const clipCount = Number(renderReport.clipCount)
// Select at the original-frame threshold; independent VP9 delivery gets five
// thousandths of headroom while retaining a strict velocity-continuity gate.
const threshold = 0.025

async function adjacentMotion(theme) {
  const root = resolve(`artifacts/story-render/${theme}`)
  const statsFile = resolve(`artifacts/story-render/${theme}-adjacent-ssim.log`)
  await run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-framerate', '24', '-start_number', '0', '-i', resolve(root, 'frame-%04d.png'),
    '-framerate', '24', '-start_number', '1', '-i', resolve(root, 'frame-%04d.png'),
    '-lavfi', `ssim=stats_file=${statsFile.replaceAll('\\', '/')}`,
    '-frames:v', String(totalFrames - 1),
    '-f', 'null', '-',
  ])
  const values = [...(await readFile(statsFile, 'utf8')).matchAll(/All:([0-9.]+)/g)]
    .map((match) => Math.max(0, 1 - Number(match[1])))
    .slice(0, totalFrames - 1)
  if (values.length < totalFrames - 1) {
    throw new Error(`${theme}: expected at least ${totalFrames - 1} adjacent SSIM values, received ${values.length}`)
  }
  return values
}

const motion = {
  light: await adjacentMotion('light'),
  dark: await adjacentMotion('dark'),
}

function seamMetrics(frame) {
  const metrics = {}
  for (const theme of ['light', 'dark']) {
    const samples = motion[theme]
    const left = (samples[frame - 2] + samples[frame - 1]) / 2
    const right = (samples[frame] + samples[frame + 1]) / 2
    metrics[theme] = { left, right, delta: Math.abs(left - right) }
  }
  return metrics
}

const boundaries = [0]
const seams = []
for (let index = 1; index < clipCount; index += 1) {
  const target = Math.round(index * (totalFrames - 1) / clipCount)
  let candidates = []
  for (const radius of [8, 16, 24, 36]) {
    candidates = []
    const minimum = Math.max(boundaries.at(-1) + 3, target - radius, 2)
    const maximum = Math.min(totalFrames - 3, target + radius)
    for (let frame = minimum; frame <= maximum; frame += 1) {
      const metrics = seamMetrics(frame)
      const worstDelta = Math.max(metrics.light.delta, metrics.dark.delta)
      if (worstDelta <= threshold) {
        candidates.push({ frame, target, worstDelta, metrics })
      }
    }
    if (candidates.length) break
  }
  if (!candidates.length) {
    const nearest = []
    for (let frame = Math.max(boundaries.at(-1) + 3, 2); frame <= totalFrames - 3; frame += 1) {
      const metrics = seamMetrics(frame)
      nearest.push({ frame, worstDelta: Math.max(metrics.light.delta, metrics.dark.delta) })
    }
    nearest.sort((left, right) => left.worstDelta - right.worstDelta)
    throw new Error(`No motion-safe boundary found near frame ${target}; best remaining: ${JSON.stringify(nearest.slice(0, 8))}`)
  }
  candidates.sort((left, right) => {
    const leftScore = left.worstDelta + Math.abs(left.frame - target) * 0.0005
    const rightScore = right.worstDelta + Math.abs(right.frame - target) * 0.0005
    return leftScore - rightScore
  })
  const selected = candidates[0]
  boundaries.push(selected.frame)
  seams.push(selected)
}
boundaries.push(totalFrames - 1)

const report = { totalFrames, clipCount, threshold, boundaries, seams }
await writeFile(resolve('story.boundaries.json'), `${JSON.stringify(report, null, 2)}\n`)
console.log(`Selected motion-safe shared frames: ${boundaries.join(', ')}`)
