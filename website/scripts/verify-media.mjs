#!/usr/bin/env node
import { resolve } from 'node:path'
import { loadManifest, normalizeProbe, validateMediaSet } from './lib/media-gates.mjs'
import { run } from './lib/ffmpeg.mjs'

const manifestFile = resolve(process.argv[2] || 'story.clips.json')
const ffprobe = process.env.FFPROBE_BIN || 'ffprobe'
const manifest = await loadManifest(manifestFile)
const base = resolve(manifest.baseDir || '.')
const items = []

for (const clip of manifest.clips) {
  const filename = resolve(base, clip.file)
  const result = await run(ffprobe, [
    '-v', 'error',
    '-count_frames',
    '-show_streams',
    '-show_format',
    '-of', 'json',
    filename,
  ])
  items.push(normalizeProbe(JSON.parse(result.stdout), filename))
}

const failures = validateMediaSet(items)
if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`Media gate passed for ${items.length} clips (${items[0].width}x${items[0].height} @ ${items[0].frameRate.toFixed(3)} fps).`)
}

