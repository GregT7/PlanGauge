// tests/evaluateFeasibility.test.js
// Adjust the import path to where your file lives.
import {
  eval_category,
  eval_score,
  eval_weekly_score,
  eval_dailies_score,
  eval_feasibility,
} from "@/utils/evaluateFeasibility"

import { describe, it, expect } from 'vitest';

/**
 * Helper to build a consistent thresholds object for tests.
 * Z-bands:
 *   good:     [-0.5,  0.5)
 *   moderate: [-1.0, -0.5) ∪ [0.5, 1.0)
 *   poor:     (-∞, -1.0) ∪ [1.0, +∞)
 * Points:
 *   good=100, moderate=60, poor=0
 * Overall categories are bucketed directly on the 0–100 scale.
 */
function makeThresholds(overrides = {}) {
  const base = {
    zscore: {
      good: { lower: -0.5, upper: 0.5 },
      moderate: { lower: -1.0, upper: 1.0 }, // we'll gate via order in eval_category tests
      poor: { lower: -Infinity, upper: Infinity },
    },
    points: { good: 100, moderate: 60, poor: 0 },
    score_weight: 0.5,
    overall: {
      good: { lower: 80, upper: 100 },
      moderate: { lower: 50, upper: 80 },
      poor: { lower: 0, upper: 50 },
    },
  };

  // Apply any overrides shallowly
  return {
    ...base,
    ...overrides,
    zscore: { ...base.zscore, ...(overrides.zscore || {}) },
    points: { ...base.points, ...(overrides.points || {}) },
    overall: { ...base.overall, ...(overrides.overall || {}) },
  };
}

describe('eval_category()', () => {
  const thresholds = makeThresholds({
    // tighten moderate so it doesn't swallow "good"
    zscore: {
      good: { lower: -0.5, upper: 0.5 },
      moderate: { lower: -1.0, upper: -0.5 }, // only the lower side
      poor: { lower: -Infinity, upper: Infinity },
    },
  });

  const stats = { ave: 100, std: 20 };

  it('returns "good" when z is within good band', () => {
    // sum that gives z=0.0
    expect(eval_category(100, stats, thresholds.zscore)).toBe('good');
    // boundary just inside upper
    expect(eval_category(109, stats, thresholds.zscore)).toBe('good'); // z=0.45
  });

  it('returns "moderate" when z is within moderate band', () => {
    // sum that gives z = -0.75
    expect(eval_category(85, stats, thresholds.zscore)).toBe('moderate');
  });

  it('returns "poor" when z is outside good/moderate ranges', () => {
    expect(eval_category(140, stats, thresholds.zscore)).toBe('poor'); // z=2
    expect(eval_category(60, stats, thresholds.zscore)).toBe('poor');  // z=-2
  });

  it('respects half-open boundaries [lower, upper) for good/moderate', () => {
    // good upper is exclusive
    expect(eval_category(110, stats, thresholds.zscore)).toBe('poor'); // z=0.5 falls out of good here → poor
    // good lower is inclusive
    expect(eval_category(90, stats, thresholds.zscore)).toBe('good'); // z=-0.5
  });

  it('returns null if no band matches (e.g., misconfigured thresholds)', () => {
    const bad = { good: { lower: 10, upper: 11 } }; // nothing matches normal z’s
    expect(eval_category(100, stats, bad)).toBeNull();
  });
});

describe('eval_score()', () => {
  const points = { good: 100, moderate: 60, poor: 0 };

  it('maps category to the correct numeric value', () => {
    expect(eval_score('good', points)).toBe(100);
    expect(eval_score('moderate', points)).toBe(60);
    expect(eval_score('poor', points)).toBe(0);
  });

  it('throws if mapping is missing', () => {
    expect(() => eval_score('unknown', points)).toThrow(/No score mapping/i);
  });
});

describe('eval_weekly_score()', () => {
  const thresholds = makeThresholds();
  const stats = { ave: 100, std: 20 };

  it('returns the points for the category determined by z-score', () => {
    expect(eval_weekly_score(100, stats, thresholds)).toBe(100); // good
    expect(eval_weekly_score(140, stats, thresholds)).toBe(0);   // poor
  });
});

describe('eval_dailies_score()', () => {
  const points = { good: 100, moderate: 60, poor: 0 };

  it('averages per-day points weighted by counts', () => {
    const counts = { good: 4, moderate: 2, poor: 1 };
    // (4*100 + 2*60 + 1*0) / 7 = (400 + 120 + 0) / 7 = 520/7 ≈ 74.2857
    expect(eval_dailies_score(counts, points)).toBeCloseTo(74.2857, 4);
  });

  it('ignores unknown keys in statusCount', () => {
    const counts = { good: 1, wow: 3 };
    expect(eval_dailies_score(counts, points)).toBe(100); // only the good=1 counts
  });

  it('returns 0 when totalCount is 0', () => {
    const counts = { good: 0, moderate: 0, poor: 0 };
    expect(eval_dailies_score(counts, points)).toBe(0);
  });
});

describe('eval_feasibility()', () => {
  const base = makeThresholds({
    // Define non-overlapping overall cutoffs
    overall: {
      good: { lower: 80, upper: 101 },     // allow 100 inclusive
      moderate: { lower: 50, upper: 80 },
      poor: { lower: 0, upper: 50 },
    },
  });
  const weekStats = { ave: 100, std: 20 };

  it('combines weekly and daily via weighted average', () => {
    // weekly good (100 pts), daily moderate (~60) with weight 0.7
    const thresholds = makeThresholds({ ...base, score_weight: 0.7 });
    const statusCount = { good: 0, moderate: 7, poor: 0 }; // daily score = 60
    const weeklySum = 100; // good → 100
    // total = 0.7*100 + 0.3*60 = 82 → "good"
    expect(eval_feasibility(weeklySum, weekStats, statusCount, thresholds)).toBe('good');
  });

  it('lands in "moderate" when combined score falls into that bucket', () => {
    // weekly poor (0), daily good (100), weight 0.5 → total 50 → moderate lower bound
    const thresholds = makeThresholds({ ...base, score_weight: 0.5 });
    const statusCount = { good: 7, moderate: 0, poor: 0 }; // 100
    const weeklySum = 140; // poor → 0
    expect(eval_feasibility(weeklySum, weekStats, statusCount, thresholds)).toBe('moderate');
  });

  it('returns "poor" for low combined scores', () => {
    const thresholds = makeThresholds({ ...base, score_weight: 0.5 });
    const statusCount = { good: 0, moderate: 0, poor: 7 }; // 0
    const weeklySum = 140; // poor → 0
    expect(eval_feasibility(weeklySum, weekStats, statusCount, thresholds)).toBe('poor');
  });

  it('respects custom score weights (α)', () => {
    // Make weekly score dominate (α=0.9)
    const thresholds = makeThresholds({ ...base, score_weight: 0.9 });
    const statusCount = { good: 0, moderate: 7, poor: 0 }; // 60
    const weeklySum = 140; // weekly poor = 0 → total = 0.9*0 + 0.1*60 = 6 → poor
    expect(eval_feasibility(weeklySum, weekStats, statusCount, thresholds)).toBe('poor');
  });

  it('returns null if combined score falls outside all overall bands (misconfig)', () => {
    const thresholds = makeThresholds({
      overall: {
        good: { lower: 90, upper: 95 },
        moderate: { lower: 60, upper: 70 },
        poor: { lower: 10, upper: 20 },
      },
    });
    // produce a score like 80 which hits no band
    const statusCount = { good: 7, moderate: 0, poor: 0 }; // 100
    const weeklySum = 100; // 100
    // total = 0.5*100 + 0.5*100 = 100 → not in any band → null
    expect(eval_feasibility(weeklySum, { ave: 100, std: 1 }, statusCount, thresholds)).toBeNull();
  });
});

/**
 * Optional: edge-condition notes
 * - If week_stats.std is 0 in production data, z = (sum - ave)/0 → +/-Infinity.
 *   You may want to guard against std<=0 in the implementation or add a policy
 *   in thresholds to catch Infinity in "poor".
 */
