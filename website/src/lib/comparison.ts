export const COMPARISON_MIN = 0;
export const COMPARISON_MAX = 100;
export const COMPARISON_MANUAL_RELEASE_DISTANCE = 0.3;
export const COMPARISON_SCROLL_REVEAL_END = 0.8;

export type ManualComparison = {
  anchorProgress: number;
  offset: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function comparisonDividerForProgress(progress: number) {
  const normalized = clamp(progress, 0, 1);
  return COMPARISON_MAX - normalized * (COMPARISON_MAX - COMPARISON_MIN);
}

export function comparisonProgressForScroll(scrollProgress: number) {
  const normalized = clamp(scrollProgress, 0, 1);
  return clamp(normalized / COMPARISON_SCROLL_REVEAL_END, 0, 1);
}

export function createManualComparison(value: number, progress: number): ManualComparison {
  const normalizedProgress = clamp(progress, 0, 1);
  const divider = clamp(value, COMPARISON_MIN, COMPARISON_MAX);
  return {
    anchorProgress: normalizedProgress,
    offset: divider - comparisonDividerForProgress(normalizedProgress),
  };
}

export function resolveComparisonDivider(progress: number, manual: ManualComparison | null) {
  const normalizedProgress = clamp(progress, 0, 1);
  const scrollDivider = comparisonDividerForProgress(normalizedProgress);
  if (!manual) return { divider: scrollDivider, manual: null };

  const distance = Math.abs(normalizedProgress - manual.anchorProgress);
  if (distance >= COMPARISON_MANUAL_RELEASE_DISTANCE) {
    return { divider: scrollDivider, manual: null };
  }

  const releaseProgress = distance / COMPARISON_MANUAL_RELEASE_DISTANCE;
  const smoothRelease = releaseProgress * releaseProgress * (3 - 2 * releaseProgress);
  const retainedOffset = manual.offset * (1 - smoothRelease);
  return {
    divider: clamp(scrollDivider + retainedOffset, COMPARISON_MIN, COMPARISON_MAX),
    manual,
  };
}
