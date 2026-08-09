const assert = require('node:assert/strict')
const { existsSync, mkdirSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { chromium } = require('playwright-core')

// `localhost`, not `127.0.0.1`: the preview server binds to ::1 only, so the
// IPv4 literal refuses the connection while the name resolves to either family.
const baseUrl = process.env.QA_BASE_URL || 'http://localhost:5197'
const chromeCandidates = process.platform === 'win32'
  ? [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ]
  : process.platform === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser']
const chromePath = process.env.QA_CHROME_PATH || chromeCandidates.find(existsSync)
if (!chromePath) {
  throw new Error('Chrome/Chromium was not found. Set QA_CHROME_PATH to its executable.')
}

const artifacts = resolve(process.cwd(), 'artifacts', 'qa')
mkdirSync(artifacts, { recursive: true })

const localeExpectations = {
  fr: { htmlLang: 'fr-CA', copyright: '© 2026 MapleSpire contributors · Projet canadien' },
  en: { htmlLang: 'en-CA', copyright: '© 2026 MapleSpire contributors · Canadian project' },
  zh: { htmlLang: 'zh-Hans', copyright: '© 2026 MapleSpire 贡献者 · 加拿大项目' },
  ja: { htmlLang: 'ja', copyright: '© 2026 MapleSpire コントリビューター · カナダ発のプロジェクト' },
  ko: { htmlLang: 'ko', copyright: '© 2026 MapleSpire 기여자 · 캐나다 프로젝트' },
  hi: { htmlLang: 'hi', copyright: '© 2026 MapleSpire योगदानकर्ता · कनाडाई परियोजना' },
}

function monitorPage(page) {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  return errors
}

async function gotoLocale(page, locale) {
  const response = await page.goto(`${baseUrl}/${locale}/`, { waitUntil: 'networkidle' })
  assert.equal(response?.status(), 200, `${locale} must return HTTP 200`)
  await page.locator('.ms-site-shell').waitFor()
  await page.locator('.ms-comparison-range').waitFor()
  await page.locator('.ms-flight').waitFor()
}

async function seoHttpQa(browser) {
  const context = await browser.newContext({ viewport: { width: 1100, height: 760 }, colorScheme: 'light' })
  const page = await context.newPage()

  const rootResponse = await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  assert.equal(rootResponse?.status(), 200, 'The local redirect fallback must resolve successfully')
  await page.waitForURL((url) => url.pathname === '/en/')
  assert.equal(new URL(page.url()).pathname, '/en/', 'The root must resolve to the fixed English default')
  await page.locator('.ms-site-shell').waitFor()

  const robots = await context.request.get(`${baseUrl}/robots.txt`)
  assert.equal(robots.status(), 200)
  assert.match(await robots.text(), /Sitemap: https:\/\/maplespire\.ca\/sitemap-index\.xml/)

  const sitemapIndex = await context.request.get(`${baseUrl}/sitemap-index.xml`)
  assert.equal(sitemapIndex.status(), 200)
  assert.match(await sitemapIndex.text(), /https:\/\/maplespire\.ca\/sitemap-0\.xml/)

  const sitemap = await context.request.get(`${baseUrl}/sitemap-0.xml`)
  assert.equal(sitemap.status(), 200)
  for (const locale of Object.keys(localeExpectations)) {
    assert.match(await sitemap.text(), new RegExp(`https://maplespire\\.ca/${locale}/`))
  }
  assert.match(await sitemap.text(), /hreflang="x-default" href="https:\/\/maplespire\.ca\/en\/"/)

  await page.screenshot({ path: resolve(artifacts, 'root-redirect-en.png'), fullPage: false })
  await context.close()
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    clippedContent: Array.from(document.querySelectorAll([
      '.ms-comparison',
      '.ms-flight-sticky',
      '.ms-alternatives',
      '.ms-contact',
    ].join(','))).flatMap((element) => {
      const style = getComputedStyle(element)
      const bounds = element.getBoundingClientRect()
      if (
        style.display === 'none'
        || style.visibility === 'hidden'
        || Number(style.opacity) <= 0.1
        || bounds.width === 0
        || bounds.bottom <= 0
        || bounds.top >= window.innerHeight
      ) return []
      if (bounds.left >= -1 && bounds.right <= document.documentElement.clientWidth + 1) return []
      return [{
        selector: element.className,
        left: Math.round(bounds.left),
        right: Math.round(bounds.right),
        viewport: document.documentElement.clientWidth,
      }]
    }),
  }))
  assert.ok(
    overflow.document <= overflow.viewport + 1,
    `${label} horizontal overflow: ${JSON.stringify(overflow)}`,
  )
  assert.deepEqual(
    overflow.clippedContent,
    [],
    `${label} has important content clipped outside the viewport: ${JSON.stringify(overflow.clippedContent)}`,
  )
}

async function assertImagesHealthy(page, label) {
  await page.locator('img').evaluateAll((images) => {
    for (const image of images) image.loading = 'eager'
  })
  await page.waitForFunction(
    () => Array.from(document.images).every((image) => image.complete),
    undefined,
    { timeout: 20_000 },
  )

  const brokenImages = await page.locator('img').evaluateAll((images) => images
    .filter((image) => image.naturalWidth === 0 || image.naturalHeight === 0)
    .map((image) => ({ src: image.getAttribute('src'), currentSrc: image.currentSrc })))
  assert.deepEqual(brokenImages, [], `${label} broken images: ${JSON.stringify(brokenImages)}`)
}

async function assertHealthyPage(page, locale, label) {
  assert.equal(await page.locator('.ms-flight-scene').count(), 3)
  assert.equal(await page.locator('.ms-flight-nav button').count(), 3)
  assert.equal(await page.locator('.ms-comparison-range').count(), 1)
  assert.equal(await page.locator('.ms-comparison-after-wrap').count(), 1)
  assert.equal(await page.locator('.ms-live-cursor').count(), 4)
  assert.equal(await page.locator('img[src="/media/story-collaboration.webp"]').count() > 0, true)
  assert.equal(await page.locator('.ms-coming-soon').count(), 1)
  assert.equal(await page.locator('.ms-alternatives-table tbody tr').count(), 15)
  assert.equal(await page.locator('.ms-alternatives-sticky-scrollbar').count(), 1)
  assert.equal(await page.locator('.ms-alternative-filters button').count(), 5)
  assert.equal(await page.locator('.ms-alternative-sources a').count() >= 15, true)
  assert.equal(await page.locator('.ms-facts-list > div').count(), 5)
  assert.equal(
    (await page.locator('.site-footer small').textContent())?.trim(),
    localeExpectations[locale].copyright,
  )
  assert.equal(await page.locator('.locale-menu a').count(), 6)
  assert.equal(await page.locator('.ms-contact').count(), 1)
  assert.equal(await page.locator('form.contact-form').count(), 1)
  assert.equal(await page.locator('a[href="https://github.com/MapleSpire"]').count() > 0, true)
  assert.equal(await page.locator('html').getAttribute('lang'), localeExpectations[locale].htmlLang)

  const navLabels = await page.locator('.ms-flight-nav button').allTextContents()
  assert.equal(navLabels.every((text) => text.trim().length > 2), true, 'Each flight step must have a visible label')

  const contactGap = await page.evaluate(() => {
    const alternatives = document.querySelector('#alternatives').getBoundingClientRect()
    const contact = document.querySelector('#contact').getBoundingClientRect()
    return contact.top - alternatives.bottom
  })
  assert.ok(contactGap >= 64, `Contact card needs breathing room below the section divider; measured ${contactGap}px`)

  await assertImagesHealthy(page, label)
  await assertNoHorizontalOverflow(page, label)
}

async function exerciseAlternatives(page, mobile = false) {
  const section = page.locator('#alternatives')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(250)

  const rows = page.locator('.ms-alternatives-table tbody tr')
  assert.equal(await rows.count(), 15)
  assert.equal((await rows.first().innerText()).includes('MapleSpire'), true)

  const filters = page.locator('.ms-alternative-filters button')
  await filters.nth(3).click()
  assert.equal(await rows.count(), 4, 'Diagram-as-code filter should keep MapleSpire beside Mermaid, PlantUML and D2')
  assert.equal((await rows.first().innerText()).includes('MapleSpire'), true)
  assert.equal((await rows.allTextContents()).slice(1).every((text) => /Mermaid|PlantUML|D2/.test(text)), true)
  await filters.first().click()
  assert.equal(await rows.count(), 15)

  if (mobile) {
    const mobileLayout = await rows.first().evaluate((row) => {
      const bounds = row.getBoundingClientRect()
      return {
        display: getComputedStyle(row).display,
        left: bounds.left,
        right: bounds.right,
        viewport: document.documentElement.clientWidth,
        labelledCells: Array.from(row.querySelectorAll('td')).every((cell) => Boolean(cell.getAttribute('data-label'))),
      }
    })
    assert.equal(mobileLayout.display, 'block')
    assert.equal(mobileLayout.labelledCells, true)
    assert.ok(mobileLayout.left >= -1 && mobileLayout.right <= mobileLayout.viewport + 1, `Mobile comparison card is clipped: ${JSON.stringify(mobileLayout)}`)
  } else {
    const tableWrap = page.locator('.ms-alternatives-table-wrap')
    const stickyScrollbar = page.locator('.ms-alternatives-sticky-scrollbar')
    assert.equal(await tableWrap.evaluate((element) => getComputedStyle(element).overflowX), 'auto')
    assert.equal(await tableWrap.evaluate((element) => getComputedStyle(element).scrollbarWidth), 'none')
    assert.equal(await stickyScrollbar.isVisible(), true)

    await page.evaluate(() => {
      const wrap = document.querySelector('.ms-alternatives-table-wrap')
      const top = wrap.getBoundingClientRect().top + window.scrollY
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
      wrap.scrollLeft = 0
      window.scrollTo({ top: top - headerBottom, behavior: 'instant' })
    })
    await page.waitForTimeout(300)

    const wrapBounds = await tableWrap.boundingBox()
    assert.ok(wrapBounds, 'Desktop comparison table must have a visible bounding box')
    await page.mouse.move(wrapBounds.x + Math.min(420, wrapBounds.width / 2), wrapBounds.y + 150)

    const beforeHorizontalWheel = await page.evaluate(() => window.scrollY)
    await page.mouse.wheel(0, 160)
    await page.waitForFunction(() => document.querySelector('.ms-alternatives-table-wrap').scrollLeft > 80)
    await page.waitForTimeout(300)
    const capturedWheel = await page.evaluate(() => ({
      scrollY: window.scrollY,
      scrollLeft: document.querySelector('.ms-alternatives-table-wrap').scrollLeft,
      header: (() => {
        const element = document.querySelector('.site-header')
        const bounds = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        return {
          docked: element.classList.contains('is-table-docked'),
          left: bounds.left,
          right: bounds.right,
          bottom: bounds.bottom,
          bottomLeftRadius: Number.parseFloat(style.borderBottomLeftRadius),
          bottomRightRadius: Number.parseFloat(style.borderBottomRightRadius),
          underlay: getComputedStyle(element, '::before').backgroundColor,
        }
      })(),
      sticky: (() => {
        const element = document.querySelector('.ms-alternatives-sticky-header')
        const bounds = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        return {
          docked: element.closest('.ms-alternatives-table-shell').classList.contains('is-table-docked'),
          left: bounds.left,
          right: bounds.right,
          top: bounds.top,
          topLeftRadius: Number.parseFloat(style.borderTopLeftRadius),
          topRightRadius: Number.parseFloat(style.borderTopRightRadius),
        }
      })(),
    }))
    assert.ok(capturedWheel.scrollLeft > 80, 'Vertical wheel must move the comparison table horizontally')
    assert.ok(Math.abs(capturedWheel.scrollY - beforeHorizontalWheel) <= 2, 'Page must stay vertically anchored during horizontal table travel')
    assert.equal(capturedWheel.header.docked, true, 'Site navigation must enter the integrated table state')
    assert.equal(capturedWheel.sticky.docked, true, 'Comparison header must enter the integrated table state')
    assert.ok(capturedWheel.sticky.top >= capturedWheel.header.bottom)
    assert.ok(
      capturedWheel.sticky.top - capturedWheel.header.bottom <= 1,
      `Comparison header must touch the site navigation without a gap: ${JSON.stringify(capturedWheel)}`,
    )
    assert.ok(Math.abs(capturedWheel.header.left - capturedWheel.sticky.left) <= 1, `Integrated left edges must align: ${JSON.stringify(capturedWheel)}`)
    assert.ok(Math.abs(capturedWheel.header.right - capturedWheel.sticky.right) <= 1, `Integrated right edges must align: ${JSON.stringify(capturedWheel)}`)
    assert.ok(capturedWheel.header.bottomLeftRadius <= 1 && capturedWheel.header.bottomRightRadius <= 1, `Navigation bottom corners must flatten while docked: ${JSON.stringify(capturedWheel)}`)
    assert.notEqual(capturedWheel.header.underlay, 'rgba(0, 0, 0, 0)', `Docked navigation must mask table content behind its upper corners: ${JSON.stringify(capturedWheel)}`)
    assert.ok(capturedWheel.sticky.topLeftRadius <= 1 && capturedWheel.sticky.topRightRadius <= 1, `Table header top corners must flatten while docked: ${JSON.stringify(capturedWheel)}`)

    const compactHeader = await page.locator('.site-header').evaluate((element) => {
      const bounds = element.getBoundingClientRect()
      return {
        top: bounds.top,
        width: bounds.width,
        viewport: document.documentElement.clientWidth,
        borderRadius: Number.parseFloat(getComputedStyle(element).borderTopLeftRadius),
      }
    })
    assert.ok(compactHeader.top >= 8 && compactHeader.top <= 12, `Compact header should float near the viewport top: ${JSON.stringify(compactHeader)}`)
    assert.ok(compactHeader.width < compactHeader.viewport - 20, 'Compact header should be a floating pill rather than a full-width bar')
    assert.ok(compactHeader.borderRadius >= 24, 'Compact header should have pill-shaped ends')

    await stickyScrollbar.press('End')
    await page.waitForFunction(() => {
      const element = document.querySelector('.ms-alternatives-table-wrap')
      return element.scrollLeft >= element.scrollWidth - element.clientWidth - 1
    })
    const beforeExitWheel = await page.evaluate(() => window.scrollY)
    const exitBounds = await tableWrap.boundingBox()
    await page.mouse.move(exitBounds.x + Math.min(420, exitBounds.width / 2), exitBounds.y + 150)
    await page.mouse.wheel(0, 160)
    await page.waitForTimeout(120)
    if (await page.evaluate(() => window.scrollY) <= beforeExitWheel) await page.mouse.wheel(0, 160)
    await page.waitForFunction((previousY) => window.scrollY > previousY, beforeExitWheel)
    assert.ok(await page.evaluate(() => window.scrollY) > beforeExitWheel, 'Vertical page scrolling must resume at the horizontal end')

    await stickyScrollbar.press('Home')
    await page.waitForFunction(() => document.querySelector('.ms-alternatives-table-wrap').scrollLeft <= 1)
  }
}

async function assertComparisonChromeAtReportedWidth(page) {
  await page.setViewportSize({ width: 1138, height: 965 })
  await gotoLocale(page, 'fr')
  await page.evaluate(() => {
    const toolbar = document.querySelector('.ms-alternatives-toolbar')
    window.scrollTo({ top: toolbar.getBoundingClientRect().top + window.scrollY - 250, behavior: 'instant' })
  })
  await page.waitForTimeout(300)

  const layout = await page.evaluate(() => {
    const filters = document.querySelector('.ms-alternative-filters')
    const legend = document.querySelector('.ms-alternative-legend')
    const sticky = document.querySelector('.ms-alternatives-sticky-header')
    const headerCell = sticky.querySelector('th')
    const scrollbar = sticky.querySelector('.ms-alternatives-sticky-scrollbar')
    const header = document.querySelector('.site-header').getBoundingClientRect()
    const cta = document.querySelector('.header-cta').getBoundingClientRect()
    const rowSpread = (elements) => {
      const tops = Array.from(elements, (element) => element.getBoundingClientRect().top)
      return Math.max(...tops) - Math.min(...tops)
    }
    return {
      filtersRowSpread: rowSpread(filters.children),
      filtersOverflow: filters.scrollWidth - filters.clientWidth,
      legendRowSpread: rowSpread(legend.children),
      legendOverflow: legend.scrollWidth - legend.clientWidth,
      headerScrollbarSpace: scrollbar.getBoundingClientRect().top - headerCell.getBoundingClientRect().top,
      headerCenter: (header.top + header.bottom) / 2,
      ctaCenter: (cta.top + cta.bottom) / 2,
    }
  })

  assert.ok(layout.filtersRowSpread <= 1, `Comparison filters must stay on one row: ${JSON.stringify(layout)}`)
  assert.ok(layout.filtersOverflow <= 1, `Comparison filters must fit without clipping: ${JSON.stringify(layout)}`)
  assert.ok(layout.legendRowSpread <= 1, `Comparison legend must stay on one row: ${JSON.stringify(layout)}`)
  assert.ok(layout.legendOverflow <= 1, `Comparison legend must fit without clipping: ${JSON.stringify(layout)}`)
  assert.ok(layout.headerScrollbarSpace >= 44, `Scrollbar needs clear space below header labels: ${JSON.stringify(layout)}`)
  assert.ok(Math.abs(layout.headerCenter - layout.ctaCenter) <= 0.5, `Header CTA must be vertically centered in the pill: ${JSON.stringify(layout)}`)
  await page.screenshot({ path: resolve(artifacts, 'desktop-fr-1138-toolbar.png'), fullPage: false })
}

async function assertFilterRailAtCompactWidth(page) {
  await page.setViewportSize({ width: 1009, height: 965 })
  await page.goto(`${baseUrl}/fr/?qa=filter-rail`, { waitUntil: 'networkidle' })
  await page.locator('.ms-alternative-filters').waitFor()
  await page.evaluate(() => {
    history.scrollRestoration = 'manual'
    const toolbar = document.querySelector('.ms-alternatives-toolbar')
    window.scrollTo({ top: toolbar.getBoundingClientRect().top + window.scrollY - 250, behavior: 'instant' })
  })
  await page.waitForTimeout(300)

  const rail = page.locator('.ms-alternative-filters')
  const initial = await rail.evaluate((element) => {
    const first = element.querySelector('button')
    const railBounds = element.getBoundingClientRect()
    const buttonBounds = first.getBoundingClientRect()
    const tops = Array.from(element.children, (child) => child.getBoundingClientRect().top)
    return {
      overflow: element.scrollWidth - element.clientWidth,
      scrollLeft: element.scrollLeft,
      topClearance: buttonBounds.top - railBounds.top,
      rowSpread: Math.max(...tops) - Math.min(...tops),
    }
  })
  assert.ok(initial.overflow > 20, `Compact comparison filters should form a scrollable rail: ${JSON.stringify(initial)}`)
  assert.ok(initial.topClearance >= 2, `Hovered filter borders need visible clearance above the rail: ${JSON.stringify(initial)}`)
  assert.ok(initial.rowSpread <= 1, `Compact comparison filters must remain on one line: ${JSON.stringify(initial)}`)

  const railBounds = await rail.boundingBox()
  assert.ok(railBounds, 'Compact filter rail must be visible')
  const pageY = await page.evaluate(() => window.scrollY)
  await rail.evaluate((element) => {
    window.__filterWheelProbe = []
    element.addEventListener('wheel', (event) => {
      window.__filterWheelProbe.push({ defaultPrevented: event.defaultPrevented, target: event.target.tagName, pageY: window.scrollY })
    }, { passive: false, once: true })
  })
  await page.mouse.move(railBounds.x + railBounds.width / 2, railBounds.y + railBounds.height / 2)
  await page.mouse.wheel(0, 800)
  await page.waitForFunction(() => {
    const element = document.querySelector('.ms-alternative-filters')
    return element.scrollLeft >= element.scrollWidth - element.clientWidth - 1
  })
  const afterWheel = await rail.evaluate((element) => ({
    scrollLeft: element.scrollLeft,
    maxScroll: element.scrollWidth - element.clientWidth,
    lastRight: element.lastElementChild.getBoundingClientRect().right,
    railRight: element.getBoundingClientRect().right,
  }))
  assert.ok(afterWheel.scrollLeft > 20, `Vertical wheel must reveal the hidden filters: ${JSON.stringify(afterWheel)}`)
  assert.ok(afterWheel.lastRight <= afterWheel.railRight + 1, `The final filter must be reachable: ${JSON.stringify(afterWheel)}`)
  const pageMotion = await page.evaluate((beforeY) => ({
    beforeY,
    afterY: window.scrollY,
    probe: window.__filterWheelProbe,
  }), pageY)
  assert.equal(pageMotion.probe[0]?.defaultPrevented, true, `Filter rail must cancel the page wheel while it can travel: ${JSON.stringify(pageMotion)}`)
  assert.ok(Math.abs(pageMotion.afterY - pageMotion.beforeY) <= 2, `Page must stay anchored while the filter rail consumes the wheel: ${JSON.stringify(pageMotion)}`)
  await page.screenshot({ path: resolve(artifacts, 'desktop-fr-1009-filter-rail.png'), fullPage: false })
}

async function exerciseComparison(page) {
  const range = page.locator('.ms-comparison-range')
  const comparison = page.locator('.ms-comparison')
  const after = page.locator('.ms-comparison-after-wrap')
  const handle = page.locator('.ms-comparison-handle')

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForFunction(() => document.querySelector('.ms-comparison-range')?.value === '100')
  assert.equal(await range.inputValue(), '100', 'The page must start on the static drawing')

  const heroTravel = await page.evaluate(() => {
    const hero = document.querySelector('.ms-hero')
    return Math.max(1, hero.offsetHeight - window.innerHeight)
  })
  await page.evaluate((travel) => window.scrollTo(0, travel * 0.4), heroTravel)
  await page.waitForFunction(() => {
    const value = Number(document.querySelector('.ms-comparison-range')?.value)
    return value > 35 && value < 65
  })

  await range.press('End')
  await page.waitForFunction(() => document.querySelector('.ms-comparison-range')?.value === '100')
  await page.evaluate((travel) => window.scrollTo(0, travel * 0.52), heroTravel)
  await page.waitForFunction(() => {
    const value = Number(document.querySelector('.ms-comparison-range')?.value)
    return value >= 55 && value < 90
  })
  await page.evaluate((travel) => window.scrollTo(0, travel * 0.72), heroTravel)
  await page.waitForFunction(() => Number(document.querySelector('.ms-comparison-range')?.value) < 20)

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForFunction(() => document.querySelector('.ms-comparison-range')?.value === '100')

  await range.focus()
  await range.press('Home')
  await page.waitForFunction(() => document.querySelector('.ms-comparison-range')?.value === '0')
  await page.waitForTimeout(100)
  const minimum = await after.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      clipPath: style.clipPath,
      width: element.getBoundingClientRect().width,
      divider: getComputedStyle(document.querySelector('.ms-comparison')).getPropertyValue('--divider').trim(),
    }
  })
  const minimumHandle = await handle.evaluate((element) => {
    const frame = element.closest('.ms-comparison-frame').getBoundingClientRect()
    return (element.getBoundingClientRect().left - frame.left) / frame.width
  })
  assert.equal(parseFloat(minimum.divider), 0)
  assert.ok(minimumHandle < 0.02, `Home must move the divider fully left, received ${minimumHandle}`)

  await range.press('End')
  await page.waitForFunction(() => document.querySelector('.ms-comparison-range')?.value === '100')
  await page.waitForTimeout(100)
  const maximum = await after.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      clipPath: style.clipPath,
      width: element.getBoundingClientRect().width,
      divider: getComputedStyle(document.querySelector('.ms-comparison')).getPropertyValue('--divider').trim(),
    }
  })
  const maximumHandle = await handle.evaluate((element) => {
    const frame = element.closest('.ms-comparison-frame').getBoundingClientRect()
    return (element.getBoundingClientRect().left - frame.left) / frame.width
  })
  assert.equal(parseFloat(maximum.divider), 100)
  assert.ok(maximumHandle > 0.98, `End must move the divider fully right, received ${maximumHandle}`)
  assert.notDeepEqual(
    { clipPath: minimum.clipPath, width: minimum.width },
    { clipPath: maximum.clipPath, width: maximum.width },
    'The range value changed but the comparison reveal did not move',
  )
  assert.equal(await comparison.isVisible(), true)
}

async function assertFlightSceneMatchesStep(page, index) {
  await page.waitForFunction(
    (step) => {
      const scenes = Array.from(document.querySelectorAll('.ms-flight-scene'))
      const opacity = scenes.map((scene) => {
        const style = getComputedStyle(scene)
        return style.visibility === 'hidden' || style.display === 'none' ? 0 : Number(style.opacity)
      })
      const target = opacity[step] ?? 0
      const otherMaximum = Math.max(0, ...opacity.filter((_, sceneIndex) => sceneIndex !== step))
      const title = scenes[step]?.querySelector('h2')
      const titleBounds = title?.getBoundingClientRect()
      const titleIntersectsViewport = Boolean(titleBounds && titleBounds.bottom > 0 && titleBounds.top < window.innerHeight)
      return target >= 0.5 && target >= otherMaximum && titleIntersectsViewport
    },
    index,
    { timeout: 10_000 },
  )

  const sceneState = await page.locator('.ms-flight-scene').evaluateAll((scenes) => scenes.map((scene) => {
    const style = getComputedStyle(scene)
    return { opacity: Number(style.opacity), visibility: style.visibility }
  }))
  assert.ok(sceneState[index].opacity >= 0.5, `Flight step ${index + 1} is active but its scene is not visible: ${JSON.stringify(sceneState)}`)
}

async function exerciseFlightNavigation(page) {
  const buttons = page.locator('.ms-flight-nav button')
  for (const index of [0, 1, 2]) {
    await buttons.nth(index).click()
    await page.waitForFunction(
      (step) => document.querySelectorAll('.ms-flight-nav button')[step]?.getAttribute('aria-current') === 'step',
      index,
      { timeout: 10_000 },
    )
    assert.equal(await buttons.nth(index).getAttribute('aria-current'), 'step')
    await assertFlightSceneMatchesStep(page, index)
  }

  await page.waitForFunction(() => Array.from(document.querySelectorAll('.ms-live-cursor'))
    .every((cursor) => Number(getComputedStyle(cursor).opacity) >= 0.5), undefined, { timeout: 10_000 })
  const cursorState = await page.locator('.ms-live-cursor').evaluateAll((cursors) => cursors.map((cursor) => {
    const style = getComputedStyle(cursor)
    const bounds = cursor.getBoundingClientRect()
    return { opacity: Number(style.opacity), left: Math.round(bounds.left), top: Math.round(bounds.top) }
  }))
  assert.equal(cursorState.every((cursor) => cursor.opacity >= 0.5), true, `Collaboration cursors are not visible: ${JSON.stringify(cursorState)}`)
  assert.ok(new Set(cursorState.map((cursor) => `${cursor.left}:${cursor.top}`)).size >= 3, 'Collaboration cursors did not move to distinct positions')

  const visibleScenes = await page.locator('.ms-flight-scene').evaluateAll((scenes) => scenes.filter((scene) => {
    const style = getComputedStyle(scene)
    return style.visibility !== 'hidden' && Number(style.opacity) > 0.05
  }).length)
  assert.ok(visibleScenes >= 1, 'Flight navigation left the sticky stage blank')
}

async function desktopFrQa(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' })
  const page = await context.newPage()
  const errors = monitorPage(page)

  await gotoLocale(page, 'fr')
  await assertHealthyPage(page, 'fr', 'desktop FR light')
  assert.match(await page.locator('h1').innerText(), /C4/)
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light')

  await exerciseComparison(page)
  await page.screenshot({ path: resolve(artifacts, 'desktop-fr-light-hero.png'), fullPage: false })

  const themeButton = page.locator('.theme-switch')
  await themeButton.click()
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark')
  assert.equal(await page.evaluate(() => localStorage.getItem('maplespire:theme')), 'dark')
  await page.waitForTimeout(300)
  await page.screenshot({ path: resolve(artifacts, 'desktop-fr-dark-hero.png'), fullPage: false })

  await exerciseFlightNavigation(page)
  await page.screenshot({ path: resolve(artifacts, 'desktop-fr-flight-final.png'), fullPage: false })
  await assertNoHorizontalOverflow(page, 'desktop FR flight')
  assert.deepEqual(errors, [], `desktop FR browser errors: ${errors.join('\n')}`)
  await context.close()
}

async function wideShortHeroQa(browser) {
  const context = await browser.newContext({ viewport: { width: 2048, height: 687 }, colorScheme: 'light' })
  const page = await context.newPage()
  const errors = monitorPage(page)

  await gotoLocale(page, 'fr')

  const heroTravel = await page.evaluate(() => {
    const hero = document.querySelector('.ms-hero')
    return Math.max(1, hero.offsetHeight - window.innerHeight)
  })
  await page.evaluate((travel) => window.scrollTo(0, travel * 0.82), heroTravel)
  await page.waitForFunction(() => Number(document.querySelector('.ms-comparison-range')?.value) === 0)

  const layout = await page.evaluate(() => {
    const bounds = (selector) => {
      const rect = document.querySelector(selector).getBoundingClientRect()
      return {
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height),
      }
    }
    return {
      viewportHeight: window.innerHeight,
      inner: bounds('.ms-hero-inner'),
      comparison: bounds('.ms-comparison'),
      frame: bounds('.ms-comparison-frame'),
      divider: Number(document.querySelector('.ms-comparison-range')?.value),
    }
  })

  assert.ok(layout.inner.top >= -1, `Wide hero escaped above the viewport before the comparison completed: ${JSON.stringify(layout)}`)
  assert.ok(layout.inner.bottom <= layout.viewportHeight + 1, `Wide hero is taller than the viewport: ${JSON.stringify(layout)}`)
  assert.ok(layout.frame.top >= -1 && layout.frame.bottom <= layout.viewportHeight + 1, `Completed comparison image is clipped: ${JSON.stringify(layout)}`)
  assert.equal(layout.divider, 0, `Comparison did not reach its completed state: ${JSON.stringify(layout)}`)
  await page.screenshot({ path: resolve(artifacts, 'desktop-fr-wide-short-hero-complete.png'), fullPage: false })
  assert.deepEqual(errors, [], `wide short hero browser errors: ${errors.join('\n')}`)
  await context.close()
}

async function recordedWideHeroScrollQa(browser) {
  const context = await browser.newContext({ viewport: { width: 3410, height: 1258 }, colorScheme: 'light' })
  const page = await context.newPage()
  const errors = monitorPage(page)

  await gotoLocale(page, 'fr')
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForFunction(() => document.querySelector('.ms-comparison-range')?.value === '100')
  await page.mouse.move(2600, 620)

  let state
  for (let step = 0; step < 24; step += 1) {
    const divider = Number(await page.locator('.ms-comparison-range').inputValue())
    await page.mouse.wheel(0, divider > 20 ? 80 : 20)
    await page.waitForTimeout(45)
    state = await page.evaluate(() => ({
      divider: Number(document.querySelector('.ms-comparison-range')?.value),
      scrollY: Math.round(window.scrollY),
    }))
    if (state.divider === 0) break
  }

  assert.equal(state?.divider, 0, `The recorded 3410x1258 interaction must fully reveal MapleSpire: ${JSON.stringify(state)}`)
  const completed = await page.evaluate(() => {
    const bounds = (selector) => {
      const rect = document.querySelector(selector).getBoundingClientRect()
      return { top: Math.round(rect.top), bottom: Math.round(rect.bottom), height: Math.round(rect.height) }
    }
    return {
      viewportHeight: window.innerHeight,
      scrollY: Math.round(window.scrollY),
      inner: bounds('.ms-hero-inner'),
      frame: bounds('.ms-comparison-frame'),
    }
  })
  assert.ok(completed.inner.top >= -1, `The hero moved before the image was fully revealed: ${JSON.stringify(completed)}`)
  assert.ok(completed.frame.top >= -1 && completed.frame.bottom <= completed.viewportHeight + 1, `The completed image is not fully visible: ${JSON.stringify(completed)}`)

  await page.mouse.wheel(0, 80)
  await page.waitForTimeout(80)
  const held = await page.evaluate(() => {
    const inner = document.querySelector('.ms-hero-inner').getBoundingClientRect()
    return {
      divider: Number(document.querySelector('.ms-comparison-range')?.value),
      scrollY: Math.round(window.scrollY),
      innerTop: Math.round(inner.top),
    }
  })
  assert.equal(held.divider, 0, `The completed reveal must remain complete during its hold: ${JSON.stringify(held)}`)
  assert.ok(held.scrollY > completed.scrollY, `The hold must consume real scroll distance: ${JSON.stringify({ completed, held })}`)
  assert.ok(held.innerTop >= -1, `The hero must remain pinned after the reveal completes: ${JSON.stringify(held)}`)

  await page.screenshot({ path: resolve(artifacts, 'desktop-fr-recorded-wide-hero-hold.png'), fullPage: false })

  for (let step = 0; step < 12; step += 1) {
    await page.mouse.wheel(0, 80)
    await page.waitForTimeout(30)
    if (await page.evaluate(() => document.querySelector('.ms-hero-inner').getBoundingClientRect().top < -1)) break
  }
  assert.ok(await page.evaluate(() => document.querySelector('.ms-hero-inner').getBoundingClientRect().top < -1), 'Vertical page scrolling must resume after the completed-image hold')
  assert.deepEqual(errors, [], `recorded wide hero browser errors: ${errors.join('\n')}`)
  await context.close()
}

async function desktopEnAndContactQa(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' })
  const page = await context.newPage()
  const errors = monitorPage(page)
  let payload

  await page.route('**/api/contact', async (route) => {
    payload = route.request().postDataJSON()
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({ accepted: true, requestId: 'qa-request' }),
    })
  })

  await gotoLocale(page, 'en')
  await assertHealthyPage(page, 'en', 'desktop EN')
  assert.match(await page.locator('h1').innerText(), /C4/)
  await page.waitForTimeout(1_800)
  await page.screenshot({ path: resolve(artifacts, 'desktop-en-hero.png'), fullPage: false })

  await exerciseAlternatives(page)
  await page.screenshot({ path: resolve(artifacts, 'desktop-en-alternatives.png'), fullPage: false })

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.locator('input[name="name"]').fill('Ada Architect')
  await page.locator('input[name="email"]').fill('ada@example.com')
  await page.locator('input[name="company"]').fill('Northwind')
  await page.locator('input[name="subject"]').fill('Architecture review')
  await page.locator('textarea[name="message"]').fill('We would like to model a complex platform with MapleSpire.')
  await page.locator('input[name="consent"]').check()
  await page.locator('button[type="submit"]').click()
  await page.locator('.form-status-success').waitFor()

  assert.equal(payload.locale, 'en')
  assert.equal(payload.consent, true)
  assert.equal(typeof payload.startedAt, 'number')
  assert.equal(payload.website, '')
  assert.equal(payload.company, 'Northwind')
  await page.screenshot({ path: resolve(artifacts, 'desktop-en-contact-success.png'), fullPage: false })
  await assertNoHorizontalOverflow(page, 'desktop EN contact')
  await assertComparisonChromeAtReportedWidth(page)
  await assertFilterRailAtCompactWidth(page)
  assert.deepEqual(errors, [], `desktop EN browser errors: ${errors.join('\n')}`)
  await context.close()
}

async function reducedMotionQa(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce',
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  const errors = monitorPage(page)

  await gotoLocale(page, 'fr')
  await assertHealthyPage(page, 'fr', 'reduced motion')
  assert.equal(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), true)
  assert.equal(await page.locator('.ms-comparison-range').inputValue(), '100')

  const reducedLayout = await page.evaluate(() => ({
    stickyPosition: getComputedStyle(document.querySelector('.ms-flight-sticky')).position,
    scenes: Array.from(document.querySelectorAll('.ms-flight-scene')).map((scene) => {
      const style = getComputedStyle(scene)
      const bounds = scene.getBoundingClientRect()
      return {
        display: style.display,
        visibility: style.visibility,
        opacity: Number(style.opacity),
        height: bounds.height,
        left: bounds.left,
        right: bounds.right,
        viewport: document.documentElement.clientWidth,
      }
    }),
    runningAnimations: document.getAnimations().filter((animation) => animation.playState === 'running').length,
  }))
  assert.notEqual(reducedLayout.stickyPosition, 'sticky')
  assert.equal(reducedLayout.scenes.every((scene) => (
    scene.display !== 'none'
    && scene.visibility !== 'hidden'
    && scene.opacity > 0.99
    && scene.height > 0
    && scene.left >= -1
    && scene.right <= scene.viewport + 1
  )), true, `Reduced-motion scenes are not all readable: ${JSON.stringify(reducedLayout.scenes)}`)
  assert.equal(reducedLayout.runningAnimations, 0)

  await page.locator('.ms-flight-scene').nth(1).scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  await assertNoHorizontalOverflow(page, 'reduced motion scene')
  await page.screenshot({ path: resolve(artifacts, 'reduced-motion.png'), fullPage: false })
  assert.deepEqual(errors, [], `reduced-motion browser errors: ${errors.join('\n')}`)
  await context.close()
}

async function mobileQa(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    colorScheme: 'light',
  })
  const page = await context.newPage()
  const errors = monitorPage(page)

  await gotoLocale(page, 'fr')
  await assertHealthyPage(page, 'fr', 'mobile FR')
  assert.equal(await page.locator('.ms-comparison').isVisible(), true)
  assert.equal(await page.locator('.ms-flight-sticky').evaluate((element) => getComputedStyle(element).position), 'sticky')
  await page.waitForTimeout(1_800)
  await page.screenshot({ path: resolve(artifacts, 'mobile-fr-hero.png'), fullPage: false })

  await page.locator('.ms-flight-nav button').nth(1).click()
  await page.waitForFunction(
    () => document.querySelectorAll('.ms-flight-nav button')[1]?.getAttribute('aria-current') === 'step',
    undefined,
    { timeout: 10_000 },
  )
  await assertFlightSceneMatchesStep(page, 1)
  await page.waitForTimeout(200)
  await page.screenshot({ path: resolve(artifacts, 'mobile-fr-flight.png'), fullPage: false })

  await exerciseAlternatives(page, true)
  await page.screenshot({ path: resolve(artifacts, 'mobile-fr-alternatives.png'), fullPage: false })
  await page.locator('.ms-alternatives-table tbody tr').first().scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  await page.screenshot({ path: resolve(artifacts, 'mobile-fr-alternatives-card.png'), fullPage: false })

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.screenshot({ path: resolve(artifacts, 'mobile-fr-contact.png'), fullPage: false })
  await assertNoHorizontalOverflow(page, 'mobile FR contact')
  assert.deepEqual(errors, [], `mobile browser errors: ${errors.join('\n')}`)
  await context.close()
}

async function translatedLocalesQa(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: 'light' })
  const page = await context.newPage()
  const errors = monitorPage(page)

  for (const locale of ['zh', 'ja', 'ko', 'hi']) {
    await gotoLocale(page, locale)
    await assertHealthyPage(page, locale, `desktop ${locale.toUpperCase()}`)
    assert.ok((await page.locator('h1').innerText()).trim().length > 8)
    await page.screenshot({ path: resolve(artifacts, `desktop-${locale}-hero.png`), fullPage: false })
  }

  await gotoLocale(page, 'zh')
  await page.locator('.locale-switch').click()
  await page.locator('.locale-menu a[href="/ja/"]').click()
  await page.waitForURL(`${baseUrl}/ja/`)
  assert.equal(await page.evaluate(() => localStorage.getItem('maplespire:locale')), 'ja')
  assert.equal(await page.locator('html').getAttribute('lang'), 'ja')

  assert.deepEqual(errors, [], `translated locale browser errors: ${errors.join('\n')}`)
  await context.close()
}

;(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true })
  try {
    if (process.env.QA_ONLY === 'recorded-wide-hero') {
      await recordedWideHeroScrollQa(browser)
      console.log('Recorded 3410x1258 hero scroll regression passed.')
      return
    }
    if (process.env.QA_ONLY === 'seo-http') {
      await seoHttpQa(browser)
      console.log('SEO HTTP and fixed-default redirect browser regression passed.')
      return
    }
    await seoHttpQa(browser)
    await desktopFrQa(browser)
    await wideShortHeroQa(browser)
    await recordedWideHeroScrollQa(browser)
    await desktopEnAndContactQa(browser)
    await reducedMotionQa(browser)
    await mobileQa(browser)
    await translatedLocalesQa(browser)
    const report = {
      passed: true,
      baseUrl,
      checkedAt: new Date().toISOString(),
      scenarios: ['seo-http-default-redirect', 'desktop-fr-light-dark', 'desktop-fr-wide-short-hero', 'desktop-fr-recorded-wide-hero', 'desktop-en-comparison-contact', 'reduced-motion', 'mobile-fr-comparison', 'desktop-zh-ja-ko-hi', 'locale-selector-navigation'],
    }
    writeFileSync(resolve(artifacts, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)
    console.log('Playwright visual QA passed for all six locales, locale navigation, comparator, wide-short hero pinning, market comparison, flight, themes, reduced motion, mobile, assets, overflow, and mocked contact submission.')
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
