// evaluateFeasibility.test.js (Vitest)
// Adjust the import path ↓ to your project structure.
import {
  eval_status,
  eval_score,
  eval_week,
  eval_daily_score,
  eval_daily_status,
  eval_days,
  evaluateFeasibility,
} from "@/utils/evaluateFeasibility"; // e.g., "../src/utils/evaluateFeasibility"

import { describe, it, expect } from "vitest";

// Small helper to make a consistent thresholds object
function makeThresholds(overrides = {}) {
  const base = {
    zscore: {
      // Only "upper" bounds are used by the implementation; z uses absolute value
      good: { upper: 0.5 },
      moderate: { upper: 1.0 },
    },
    points: { good: 100, moderate: 60, poor: 0 },
    weight: 0.5,
    overall: {
      good: { lower: 80, upper: 100 },
      moderate: { lower: 50, upper: 80 },
    },
  };
  return {
    ...base,
    ...overrides,
    zscore: { ...base.zscore, ...(overrides.zscore || {}) },
    points: { ...base.points, ...(overrides.points || {}) },
    overall: { ...base.overall, ...(overrides.overall || {}) },
  };
}

describe("eval_status()", () => {
  const stats = { ave: 100, std: 20 };

  it("returns 'good' when |z| < good.upper", () => {
    const th = makeThresholds();
    // sum=101 => z = 0.05 < 0.5 ⇒ good
    expect(eval_status(101, stats, th.zscore)).toBe("good");
  });

  it("uses half-open boundary for good: z == good.upper ⇒ moderate", () => {
    const th = makeThresholds({ zscore: { good: { upper: 0.5 }, moderate: { upper: 1.0 } } });
    // sum=110 => z = 0.5 ⇒ not < 0.5, but <1.0 ⇒ moderate
    expect(eval_status(110, stats, th.zscore)).toBe("moderate");
  });

  it("classifies 'poor' when |z| ≥ moderate.upper", () => {
    const th = makeThresholds({ zscore: { moderate: { upper: 1.0 } } });
    // sum=140 => z = 2.0 ⇒ poor
    expect(eval_status(140, stats, th.zscore)).toBe("poor");
  });

  it("returns 'unknown' for invalid inputs (nulls, negative sum, std<=0)", () => {
    const th = makeThresholds();
    expect(eval_status(null, stats, th.zscore)).toBe("unknown");
    expect(eval_status(10, null, th.zscore)).toBe("unknown");
    expect(eval_status(10, { ave: 0, std: 0 }, th.zscore)).toBe("unknown");
    expect(eval_status(-5, stats, th.zscore)).toBe("unknown");
    expect(eval_status(10, stats, null)).toBe("unknown");
    // zscore object present but empty ⇒ defaults kick in (0.5/1.5)
    expect(eval_status(10, { ave: 10, std: 1 }, {})).toBe("good");
  });
});

describe("eval_score()", () => {
  const points = { good: 100, moderate: 60, poor: 0 };

  it("maps known statuses to numbers", () => {
    expect(eval_score("good", points)).toBe(100);
    expect(eval_score("moderate", points)).toBe(60);
    expect(eval_score("poor", points)).toBe(0);
  });

  it("returns null for unknown or unmapped statuses", () => {
    expect(eval_score("unknown", points)).toBeNull();
    expect(eval_score("n/a", points)).toBeNull();
  });
});

describe("eval_week()", () => {
  const stats = { ave: 100, std: 20 };

  it("returns {score,status} derived from z-score + points", () => {
    const th = makeThresholds();
    const r1 = eval_week(100, stats, th); // z=0 ⇒ good ⇒ 100
    expect(r1).toEqual({ score: 100, status: "good" });

    const r2 = eval_week(140, stats, th); // z=2 ⇒ poor ⇒ 0
    expect(r2).toEqual({ score: 0, status: "poor" });
  });

  it("returns {score:null,status:'unknown'} when weekly category is unknown", () => {
    const th = makeThresholds();
    const r = eval_week(50, { ave: 0, std: 0 }, th); // std<=0 ⇒ unknown
    expect(r).toEqual({ score: null, status: "unknown" });
  });
});

describe("eval_daily_score()", () => {
  const pts = { good: 100, moderate: 60, poor: 0 };

  it("returns weighted average of per-day counts", () => {
    const counts = { good: 4, moderate: 2, poor: 1 };
    // (4*100 + 2*60 + 1*0) / 7 = 520/7 ≈ 74.2857
    expect(eval_daily_score(counts, pts)).toBeCloseTo(74.2857, 4);
  });

  it("ignores keys without point mappings", () => {
    const counts = { good: 1, wow: 3 };
    expect(eval_daily_score(counts, pts)).toBe(100);
  });

  it("returns 0 when there are no counted days", () => {
    expect(eval_daily_score({ good: 0, moderate: 0, poor: 0 }, pts)).toBe(0);
    expect(eval_daily_score({}, pts)).toBe(0);
  });
});

describe("eval_daily_status()", () => {
  const base = makeThresholds();

  it("buckets scores into overall bands (inclusive good upper)", () => {
    expect(eval_daily_status(85, base)).toBe("good");      // in [80,100]
    expect(eval_daily_status(50, base)).toBe("moderate");  // in [50,80)
    expect(eval_daily_status(49.999, base)).toBe("poor");
  });

  it("returns 'unknown' when score is out of range or thresholds missing", () => {
    expect(eval_daily_status(-1, base)).toBe("unknown");
    expect(eval_daily_status(101, base)).toBe("unknown");
    expect(eval_daily_status(75, { ...base, overall: null })).toBe("unknown");
  });
});

describe("eval_days()", () => {
  it("returns {score,status} composed from daily score + bands", () => {
    const th = makeThresholds();
    const r = eval_days({ good: 7 }, th); // daily score=100 ⇒ status 'good'
    expect(r.score).toBe(100);
    expect(r.status).toBe("good");
  });
});

describe("evaluateFeasibility()", () => {
  const weekStats = { ave: 100, std: 20 };
  const base = makeThresholds({
    overall: {
      good: { lower: 80, upper: 100 },
      moderate: { lower: 50, upper: 80 },
    },
  });
  
  it("combines weekly & daily via weight and returns rich object", () => {
    // weekly: good ⇒ 100; daily: moderate ⇒ 60; weight α=0.7
    const th = { ...base, weight: 0.7 };
    const out = evaluateFeasibility(100, weekStats, { moderate: 7 }, th);

    expect(out.status).toBe("good");        // 88 → good
    expect(out.score).toBeCloseTo(88, 4);   // 0.7*100 + 0.3*60 = 88
    expect(out.week_eval).toEqual({ score: 100, status: "good" });
    expect(out.days_eval.status).toBe("moderate");
});

  it("respects different weights", () => {
    const th = makeThresholds({ ...base, weight: 0.9 });
    // weekly poor (0) dominates ⇒ overall poor
    const out = evaluateFeasibility(140, weekStats, { moderate: 7 }, th);
    expect(out.status).toBe("poor");
    expect(out.score).toBeCloseTo(6, 4); // 0.9*0 + 0.1*60
  });

  it("clamps score into [0,100]", () => {
    // Force extreme mix: weekly 100, daily 100 ⇒ still 100
    const th = makeThresholds({ ...base, weight: 1.0 });
    const out = evaluateFeasibility(100, weekStats, { good: 7 }, th);
    expect(out.score).toBe(100);
  });

  it("returns safe 'unknown' object when any sub-score is null", () => {
    // Make weekly unknown by giving std<=0
    const th = makeThresholds(base);
    const out = evaluateFeasibility(100, { ave: 100, std: 0 }, { good: 7 }, th);
    expect(out).toEqual({ score: 0, status: "unknown", week_eval: null, days_eval: null });
  });
});

// ---- Added tests for 'neutral' weekly classification and propagation ----
describe("neutral handling (sum === 0)", () => {
  const stats = { ave: 100, std: 20 };
  const th = makeThresholds();

  it("eval_status() returns 'neutral' when weekly sum is exactly 0", () => {
    expect(eval_status(0, stats, th.zscore)).toBe("neutral");
  });

  it("eval_score() returns null for 'neutral' (unmapped) status", () => {
    const pts = { good: 100, moderate: 60, poor: 0 };
    expect(eval_score("neutral", pts)).toBeNull();
  });

  it("eval_week() yields {score:null,status:'neutral'}", () => {
    const r = eval_week(0, stats, th);
    expect(r).toEqual({ score: null, status: "neutral" });
  });

  it("evaluateFeasibility() returns safe unknown object if weekly is neutral (null score)", () => {
    const out = evaluateFeasibility(0, stats, { good: 7 }, th);
    expect(out).toEqual({ score: 0, status: "unknown", week_eval: null, days_eval: null });
  });
});
