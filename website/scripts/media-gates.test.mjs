import assert from 'node:assert/strict'
import test from 'node:test'
import {
  evaluateSeam,
  normalizeProbe,
  parseRate,
  parseSsim,
  validateMediaSet,
} from './lib/media-gates.mjs'

test('parses rational frame rates', () => {
  assert.equal(parseRate('30000/1001').toFixed(3), '29.970')
})

test('parses the final ffmpeg SSIM summary', () => {
  assert.deepEqual(
    parseSsim('[Parsed_ssim_0] SSIM Y:0.998000 U:0.997000 V:0.996000 All:0.997800 (26.57)'),
    { luma: 0.998, overall: 0.9978 },
  )
})

test('normalizes ffprobe metadata and rejects mismatched media', () => {
  const raw = {
    streams: [{
      codec_type: 'video', width: 1920, height: 1080, avg_frame_rate: '24/1',
      nb_read_frames: '72', duration: '3', pix_fmt: 'yuv420p', color_space: 'bt709',
      color_transfer: 'bt709', color_primaries: 'bt709',
    }],
    format: { duration: '3' },
  }
  const first = normalizeProbe(raw, 'one.webm')
  const second = { ...normalizeProbe(raw, 'two.webm'), width: 1280, audioStreams: 1 }
  assert.deepEqual(validateMediaSet([first]), [])
  assert.match(validateMediaSet([first, second]).join('\n'), /audio is not allowed/)
  assert.match(validateMediaSet([first, second]).join('\n'), /width=1280 differs/)
})

test('enforces structural and motion continuity thresholds', () => {
  const result = evaluateSeam({
    boundary: { overall: 0.984, luma: 0.989 },
    leftMotion: { overall: 0.999 },
    rightMotion: { overall: 0.95 },
  })
  assert.equal(result.failures.length, 3)
  assert.ok(result.motionDelta > 0.025)
})

test('uses both decoded motion intervals on each side of a seam', () => {
  const result = evaluateSeam({
    boundary: { overall: 1, luma: 1 },
    leftMotion: [{ overall: 0.98 }, { overall: 0.96 }],
    rightMotion: [{ overall: 0.97 }, { overall: 0.95 }],
  })
  assert.deepEqual(result.leftSamples.map((value) => value.toFixed(2)), ['0.02', '0.04'])
  assert.deepEqual(result.rightSamples.map((value) => value.toFixed(2)), ['0.03', '0.05'])
  assert.equal(result.motionDelta.toFixed(2), '0.01')
})
