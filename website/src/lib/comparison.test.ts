import { describe, expect, it } from 'vitest';
import {
  COMPARISON_MAX,
  COMPARISON_MIN,
  COMPARISON_MANUAL_RELEASE_DISTANCE,
  COMPARISON_SCROLL_REVEAL_END,
  comparisonDividerForProgress,
  comparisonProgressForScroll,
  createManualComparison,
  resolveComparisonDivider,
} from './comparison';

describe('hero comparison scroll and manual arbitration', () => {
  it('starts on the static drawing and reveals MapleSpire as the page scrolls', () => {
    expect(COMPARISON_MAX).toBe(100);
    expect(COMPARISON_MIN).toBe(0);
    expect(comparisonDividerForProgress(0)).toBe(COMPARISON_MAX);
    expect(comparisonDividerForProgress(0.5)).toBe(50);
    expect(comparisonDividerForProgress(1)).toBe(COMPARISON_MIN);
  });

  it('finishes the reveal before the sticky hero releases', () => {
    expect(comparisonProgressForScroll(0)).toBe(0);
    expect(comparisonProgressForScroll(COMPARISON_SCROLL_REVEAL_END / 2)).toBe(0.5);
    expect(comparisonProgressForScroll(COMPARISON_SCROLL_REVEAL_END)).toBe(1);
    expect(comparisonProgressForScroll(0.9)).toBe(1);
    expect(comparisonProgressForScroll(1)).toBe(1);
  });

  it('keeps a manual divider position at the interaction point', () => {
    const manual = createManualComparison(82, 0.25);
    expect(resolveComparisonDivider(0.25, manual).divider).toBe(82);
  });

  it('smoothly hands control back to scroll after a manual drag', () => {
    const anchor = 0.2;
    const manual = createManualComparison(90, anchor);
    const halfwayProgress = anchor + COMPARISON_MANUAL_RELEASE_DISTANCE / 2;
    const halfway = resolveComparisonDivider(halfwayProgress, manual);
    const halfwayBase = comparisonDividerForProgress(halfwayProgress);

    expect(halfway.divider).toBeGreaterThan(halfwayBase);
    expect(halfway.divider).toBeLessThan(90);

    const releasedProgress = anchor + COMPARISON_MANUAL_RELEASE_DISTANCE;
    const released = resolveComparisonDivider(releasedProgress, manual);
    expect(released.divider).toBe(comparisonDividerForProgress(releasedProgress));
    expect(released.manual).toBeNull();
  });
});
