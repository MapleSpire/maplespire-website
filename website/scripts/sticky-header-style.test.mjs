import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const cssPath = resolve(import.meta.dirname, '../src/styles/revamp.css');

test('the docked comparison header has no transparent seam below the site menu', async () => {
  const css = await readFile(cssPath, 'utf8');
  const dockedRule = css.match(
    /\.ms-alternatives-table-shell\.is-table-docked \.ms-alternatives-sticky-header\s*\{([^}]*)\}/,
  );

  assert.ok(dockedRule, 'Missing docked comparison header styles');
  assert.match(dockedRule[1], /border-top:\s*0\s*;/);
  assert.match(dockedRule[1], /background:\s*var\(--paper-3\)\s*;/);
  assert.doesNotMatch(dockedRule[1], /border-top-color:\s*transparent\s*;/);
});
