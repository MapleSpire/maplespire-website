#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { run } from './lib/ffmpeg.mjs'

const theme = process.argv[2]
if (theme !== 'light' && theme !== 'dark') throw new Error('Theme must be light or dark')

const ffmpeg = process.env.FFMPEG_BIN || 'ffmpeg'
const framesPerClip = Number(process.env.RENDER_FRAMES_PER_CLIP || 25)
const frameRate = Number(process.env.RENDER_FRAME_RATE || 24)
const framesRoot = resolve(process.argv[3] || `artifacts/story-render/${theme}`)
const outputRoot = resolve(process.argv[4] || `public/story/clips/${theme}`)
const ids = [
  'static-drawing',
  'lost-decision',
  'living-source',
  'right-depth',
  'same-thread',
  'your-architecture',
  'clear-tomorrow',
]
const boundaryReport = JSON.parse(await readFile(resolve('story.boundaries.json'), 'utf8'))
const boundaries = boundaryReport.boundaries

if (!Number.isInteger(framesPerClip) || framesPerClip < 3) {
  throw new Error('RENDER_FRAMES_PER_CLIP must be an integer of at least 3')
}
if (!Number.isFinite(frameRate) || frameRate <= 0) throw new Error('RENDER_FRAME_RATE must be positive')
if (!Array.isArray(boundaries) || boundaries.length !== ids.length + 1) {
  throw new Error('story.boundaries.json must contain one shared boundary around every clip')
}

await mkdir(outputRoot, { recursive: true })
const clips = []
for (const [index, id] of ids.entries()) {
  const start = Number(boundaries[index])
  const end = Number(boundaries[index + 1])
  const frameCount = end - start + 1
  const file = `${String(index + 1).padStart(2, '0')}-${id}.webm`
  await run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-framerate', String(frameRate),
    '-start_number', String(start),
    '-i', resolve(framesRoot, 'frame-%04d.png'),
    '-frames:v', String(frameCount),
    '-an',
    '-c:v', 'libvpx-vp9',
    '-deadline', 'good',
    '-cpu-used', '2',
    '-row-mt', '1',
    '-crf', '34',
    '-b:v', '0',
    '-g', '1',
    '-pix_fmt', 'yuv420p',
    '-color_primaries', 'bt709',
    '-color_trc', 'bt709',
    '-colorspace', 'bt709',
    resolve(outputRoot, file),
  ], { capture: false })
  clips.push({ id, file, startFrame: start, endFrame: end })
}

const manifest = {
  baseDir: `./public/story/clips/${theme}`,
  thresholds: { overall: 0.985, luma: 0.990, motionDelta: 0.030 },
  clips,
}
await writeFile(resolve(`story.clips.${theme}.json`), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Encoded ${clips.length} ${theme} clips and wrote story.clips.${theme}.json.`)
