export type SmartTableScrollInput = {
  delta: number;
  scrollLeft: number;
  maxScroll: number;
  tableTop: number;
  tableBottom: number;
  headerBottom: number;
  viewportHeight: number;
  activationGap?: number;
};

export type SmartTableScrollResult = {
  handled: boolean;
  nextScrollLeft: number;
  overflowY: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function resolveSmartTableScroll({
  delta,
  scrollLeft,
  maxScroll,
  tableTop,
  tableBottom,
  headerBottom,
  viewportHeight,
  activationGap = 18,
}: SmartTableScrollInput): SmartTableScrollResult {
  const current = clamp(scrollLeft, 0, Math.max(0, maxScroll));
  const activationLine = headerBottom + activationGap;
  const minimumReadableBottom = Math.min(viewportHeight - 24, activationLine + 220);
  const isWellFramed = tableTop <= activationLine && tableBottom >= minimumReadableBottom;

  if (!isWellFramed || !Number.isFinite(delta) || delta === 0 || maxScroll <= 1) {
    return { handled: false, nextScrollLeft: current, overflowY: 0 };
  }

  const edgeTolerance = 2;
  if ((delta > 0 && maxScroll - current <= edgeTolerance) || (delta < 0 && current <= edgeTolerance)) {
    return { handled: false, nextScrollLeft: current, overflowY: 0 };
  }

  const nextScrollLeft = clamp(current + delta, 0, maxScroll);
  const consumed = nextScrollLeft - current;
  if (Math.abs(consumed) < 0.5) {
    return { handled: false, nextScrollLeft: current, overflowY: 0 };
  }

  return {
    handled: true,
    nextScrollLeft,
    overflowY: delta - consumed,
  };
}

export function normalizeWheelDelta(delta: number, deltaMode: number, viewportHeight: number) {
  if (deltaMode === 1) return delta * 18;
  if (deltaMode === 2) return delta * viewportHeight;
  return delta;
}

/**
 * Distance scrolled from the inline start of a horizontal scroller. In a right-to-left
 * scroller `scrollLeft` starts at 0 and goes negative toward the end, so code that
 * reasons in "0 = start, max = end" converts through these two helpers.
 */
export const toScrollProgress = (scrollLeft: number, rtl: boolean) => (rtl ? -scrollLeft : scrollLeft);
export const fromScrollProgress = (progress: number, rtl: boolean) => (rtl ? -progress : progress);
