import { describe, expect, it } from 'vitest';
import { normalizeWheelDelta, resolveSmartTableScroll } from './smartTableScroll';

const framedTable = {
  scrollLeft: 0,
  maxScroll: 500,
  tableTop: 78,
  tableBottom: 1_400,
  headerBottom: 66,
  viewportHeight: 720,
};

describe('smart comparison table scrolling', () => {
  it('keeps vertical scrolling native until the table reaches the site header', () => {
    expect(resolveSmartTableScroll({ ...framedTable, tableTop: 180, delta: 100 })).toEqual({
      handled: false,
      nextScrollLeft: 0,
      overflowY: 0,
    });
  });

  it('converts a vertical wheel gesture to horizontal movement once well framed', () => {
    expect(resolveSmartTableScroll({ ...framedTable, delta: 120 })).toEqual({
      handled: true,
      nextScrollLeft: 120,
      overflowY: 0,
    });
  });

  it('releases the wheel back to vertical scrolling at either horizontal edge', () => {
    expect(resolveSmartTableScroll({ ...framedTable, scrollLeft: 500, delta: 80 }).handled).toBe(false);
    expect(resolveSmartTableScroll({ ...framedTable, scrollLeft: 499, delta: 80 }).handled).toBe(false);
    expect(resolveSmartTableScroll({ ...framedTable, scrollLeft: 0, delta: -80 }).handled).toBe(false);
  });

  it('passes an overshooting remainder back to the page for a seamless exit', () => {
    expect(resolveSmartTableScroll({ ...framedTable, scrollLeft: 470, delta: 90 })).toEqual({
      handled: true,
      nextScrollLeft: 500,
      overflowY: 60,
    });
  });

  it('normalizes line and page wheel units', () => {
    expect(normalizeWheelDelta(3, 1, 720)).toBe(54);
    expect(normalizeWheelDelta(1, 2, 720)).toBe(720);
  });
});
