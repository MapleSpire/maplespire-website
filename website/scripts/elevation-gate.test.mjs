import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const readSource = (path) => readFile(resolve(root, path), 'utf8');
const ruleBody = (css, selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`))?.[1] ?? '';
};

test('dark landing elevations use compact true-black shadows rather than warm light-theme halos', async () => {
  const [globalCss, revampCss, redirectLayout] = await Promise.all([
    readSource('src/styles/global.css'),
    readSource('src/styles/revamp.css'),
    readSource('src/layouts/RedirectLayout.astro'),
  ]);

  const darkTokens = ruleBody(globalCss, ":root[data-theme='dark']");
  assert.match(darkTokens, /--shadow: 0 16px 36px -18px rgba\(0, 0, 0, 0\.7\)/);
  assert.match(darkTokens, /--shadow-small: 0 8px 22px -14px rgba\(0, 0, 0, 0\.68\)/);
  assert.doesNotMatch(darkTokens, /--shadow(?:-small)?:[^;]*rgba\(45, 38, 32/);

  assert.match(ruleBody(revampCss, '.ms-comparison-frame'), /box-shadow: var\(--shadow\)/);
  for (const selector of ['.ms-layered-scene', '.ms-flight-copy', '.ms-closeup-scene']) {
    const rule = ruleBody(revampCss, selector);
    const shadow = rule.match(/box-shadow:\s*([^;]+)/)?.[1] ?? '';
    assert.match(shadow, /rgba\(0, 0, 0/);
    assert.doesNotMatch(shadow, /(?:70|80|90|100|120)px/);
  }

  const darkRedirectMain = redirectLayout.match(/@media \(prefers-color-scheme: dark\)[\s\S]*?main \{([^}]*)\}/)?.[1] ?? '';
  assert.match(darkRedirectMain, /border-color: #393a3c/);
  assert.doesNotMatch(darkRedirectMain, /box-shadow/);
});
