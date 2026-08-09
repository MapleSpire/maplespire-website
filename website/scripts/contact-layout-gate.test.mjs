import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const revamp = await readFile(new URL('../src/styles/revamp.css', import.meta.url), 'utf8');
const global = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('contact grid tracks can shrink without crossing the card padding', () => {
  assert.match(
    revamp,
    /\.ms-contact\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*0\.72fr\)\s+minmax\(0,\s*1\.28fr\)/,
  );
  assert.match(
    revamp,
    /\.ms-contact\s*>\s*\.contact-form\s*\{[\s\S]*?min-width:\s*0;[\s\S]*?max-width:\s*100%/,
  );
});

test('contact form row children are allowed to shrink inside the grid', () => {
  assert.match(global, /\.contact-form\s*\{[\s\S]*?min-width:\s*0;/);
  assert.match(global, /\.form-row\s*>\s*label\s*\{\s*min-width:\s*0;/);
});
