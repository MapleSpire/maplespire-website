#!/usr/bin/env node
const { existsSync, mkdirSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { chromium } = require('playwright-core')

// See visual-qa.cjs: the preview server binds to ::1, which the IPv4 literal misses.
const baseUrl = process.env.RENDER_BASE_URL || 'http://localhost:5197'
const width = Number(process.env.RENDER_WIDTH || 1280)
const height = Number(process.env.RENDER_HEIGHT || 720)
const framesPerClip = Number(process.env.RENDER_FRAMES_PER_CLIP || 25)
const clipCount = 7
const totalFrames = clipCount * (framesPerClip - 1) + 1
const outputRoot = resolve(process.cwd(), 'artifacts', 'story-render')
const chromeCandidates = process.platform === 'win32'
  ? [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ]
  : process.platform === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser']
const chromePath = process.env.QA_CHROME_PATH || chromeCandidates.find(existsSync)

if (!chromePath) throw new Error('Chrome/Chromium was not found. Set QA_CHROME_PATH.')
if (!Number.isInteger(framesPerClip) || framesPerClip < 3) {
  throw new Error('RENDER_FRAMES_PER_CLIP must be an integer of at least 3')
}

async function renderTheme(browser, theme) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme,
    deviceScaleFactor: 1,
  })
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem('maplespire:theme', selectedTheme)
  }, theme)
  const page = await context.newPage()
  await page.goto(`${baseUrl}/fr/?__renderStory=1`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: `
    *, *::before, *::after { animation-play-state: paused !important; transition: none !important; }
    .site-header, .hero-copy, .scroll-cue, .chapter-rail, .scroll-progress,
    .chapter-copy, .mobile-scene, .site-footer { visibility: hidden !important; }
    .experience-stage { z-index: 0 !important; }
  ` })
  await page.evaluate(async () => {
    const images = Array.from(document.images)
    for (const image of images) image.loading = 'eager'
    await Promise.all(images.map(async (image) => {
      if (!image.complete) {
        await new Promise((done) => {
          image.addEventListener('load', done, { once: true })
          image.addEventListener('error', done, { once: true })
        })
      }
      try { await image.decode() } catch (_) {}
    }))
  })

  const bounds = await page.evaluate(() => {
    const chapters = Array.from(document.querySelectorAll('.story-chapter'))
    const first = chapters[0]
    const last = chapters.at(-1)
    if (!(first instanceof HTMLElement) || !(last instanceof HTMLElement)) {
      throw new Error('Story chapters were not rendered')
    }
    const firstTop = first.getBoundingClientRect().top + window.scrollY
    const lastBottom = last.getBoundingClientRect().bottom + window.scrollY
    return {
      start: Math.max(0, firstTop - window.innerHeight),
      end: Math.max(0, lastBottom - window.innerHeight),
    }
  })

  const stage = page.locator('.experience-stage')
  const themeRoot = resolve(outputRoot, theme)
  mkdirSync(themeRoot, { recursive: true })

  for (let frame = 0; frame < totalFrames; frame += 1) {
    const progress = frame / (totalFrames - 1)
    const y = bounds.start + (bounds.end - bounds.start) * progress
    await page.evaluate(async (scrollY) => {
      window.scrollTo(0, scrollY)
      window.__maplespireRenderUpdate?.()
      await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
    }, y)
    const filename = `frame-${String(frame).padStart(4, '0')}.png`
    await stage.screenshot({ path: resolve(themeRoot, filename), animations: 'disabled' })
  }

  await context.close()
  return { theme, frames: totalFrames, ...bounds }
}

;(async () => {
  mkdirSync(outputRoot, { recursive: true })
  const browser = await chromium.launch({ executablePath: chromePath, headless: true })
  try {
    const reports = []
    for (const theme of ['light', 'dark']) reports.push(await renderTheme(browser, theme))
    writeFileSync(resolve(outputRoot, 'render-report.json'), `${JSON.stringify({
      width,
      height,
      framesPerClip,
      clipCount,
      totalFrames,
      reports,
    }, null, 2)}\n`)
    console.log(`Rendered ${totalFrames} deterministic frames for light and dark themes.`)
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
