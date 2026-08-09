#!/usr/bin/env node
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { loadManifest } from './lib/media-gates.mjs'
import { run } from './lib/ffmpeg.mjs'

const manifestFile = resolve(process.argv[2] || 'story.clips.json')
const output = resolve(process.argv[3] || 'public/story/master.webm')
const ffmpeg = process.env.FFMPEG_BIN || 'ffmpeg'
const manifest = await loadManifest(manifestFile)
const base = resolve(manifest.baseDir || '.')
const listFile = resolve(dirname(output), '.concat.txt')
await mkdir(dirname(output), { recursive: true })
const lines = manifest.clips.map((clip) => {
  const filename = resolve(base, clip.file).replaceAll("'", "'\\''")
  return `file '${filename}'`
})
await writeFile(listFile, `${lines.join('\n')}\n`)
await run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', output], { capture: false })
await rm(listFile, { force: true })
console.log(`Wrote ${relative(process.cwd(), output)}`)
