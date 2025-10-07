// evaluateFeasibility.js
// --------------------------------------------------------------
// Purpose: Central logic for translating time-based task stats
//          into a normalized "feasibility" score and category.
//
// Structure:
//   1. Helpers
//   2. Z-score based status evaluation
//   3. Score mapping
//   4. Daily / Weekly aggregation
//   5. Main combined evaluation
//
// Notes:
//   - All thresholds are loaded from context or defaultThresholds.json.
//   - All results return safe objects (never throw).
// --------------------------------------------------------------

import defaultThresholds from "@/utils/defaultThresholds.json" // ✅ removed "with { type: 'json' }"

// -------------------- 1. Helpers ------------------------------

/** Convert value → finite number or null */
const toNum = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null)

/** Clamp a numeric value into a range [min, max] */
const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

// -------------------- 2. Z-Score Evaluation -------------------

/**
 * Classify a total sum against mean/std using z-score bands.
 * - Returns "good" | "moderate" | "poor" | "unknown"
 */
function eval_status(sum, stats, zThresholds) {
  if (sum == null || stats == null || zThresholds == null) return "unknown"
  if (sum < 0) return "unknown"

  const ave = toNum(stats?.ave)
  const std = toNum(stats?.std)
  const x = toNum(sum)
  if (ave == null || std == null || x == null) return "unknown"
  if (std <= 0) return "unknown" // Cannot compute z-score robustly
  if (sum === 0) return "neutral"

  const z = Math.abs((x - ave) / std)

  // Safe fallbacks
  const goodUpper = toNum(zThresholds?.good?.upper) ?? 0.5
  const modUpper = toNum(zThresholds?.moderate?.upper) ?? 1.5

  if (z < goodUpper) return "good"
  if (z < modUpper) return "moderate"
  return "poor"
}

// -------------------- 3. Score Mapping ------------------------

/**
 * Map a status → numeric score via thresholds.points.
 * Returns null if status unknown or not mapped.
 */
function eval_score(status, scoreThresholds) {
  const normalized_status = status?.toLowerCase()
  const score = scoreThresholds?.[normalized_status]
  if (typeof score === "number") return score
  if (status !== "unknown") {
    console.warn("[eval_score] No score mapping for:", status, scoreThresholds)
  }
  return null
}

// -------------------- 4. Aggregations -------------------------

/**
 * Weekly score from total sum.
 * - Combines z-score evaluation + point mapping.
 */
function eval_week(week_sum, week_stats, thresholds) {
  const status = eval_status(week_sum, week_stats, thresholds?.zscore)
  return { score: eval_score(status, thresholds?.points), status }
}

/**
 * Weighted average of per-day statuses → numeric score.
 */
function eval_daily_score(statusCount = {}, pointsThresholds = {}) {
  let totalPts = 0
  let totalCount = 0

  for (const [status, count] of Object.entries(statusCount)) {
    const pts = pointsThresholds[status]
    if (typeof count === "number" && typeof pts === "number") {
      totalPts += count * pts
      totalCount += count
    }
  }

  return totalCount === 0 ? 0 : totalPts / totalCount
}

/**
 * Classify a daily numeric score (0–100) into feasibility bands.
 */
function eval_daily_status(score, thresholds) {
  if (score == null || score > 100 || score < 0) return "unknown"
  const ov = thresholds?.overall
  if (!ov) return "unknown"

  const good = ov.good ?? {}
  const mod = ov.moderate ?? {}

  const inGood = score >= toNum(good.lower) && score <= toNum(good.upper)
  const inMod = score >= toNum(mod.lower) && score < toNum(mod.upper)

  if (inGood) return "good"
  if (inMod) return "moderate"
  return "poor"
}

/**
 * Combine daily score + classification.
 */
function eval_days(statusCount, thresholds) {
  const score = eval_daily_score(statusCount, thresholds?.points)

  let status
  if (statusCount?.neutral === 7) status = "neutral"
  else status = eval_daily_status(score, thresholds)
  return { score, status }
}

// -------------------- 5. Main Feasibility ---------------------

/**
 * Combine weekly & daily evaluations → overall feasibility.
 * Returns object:
 *   { score, status, week_eval, days_eval }
 */
function evaluateFeasibility(
  week_sum,
  week_stats,
  statusCount,
  thresholds = defaultThresholds
) {
  try {
    if (!thresholds) thresholds = defaultThresholds

    // Sub-evaluations
    const week_eval = eval_week(week_sum, week_stats, thresholds)
    const days_eval = eval_days(statusCount, thresholds)
    const weekly_score = toNum(week_eval?.score)
    const daily_score = toNum(days_eval?.score)

    if (weekly_score == null || daily_score == null) {
      return { score: 0, status: "unknown", week_eval: null, days_eval: null }
    }

    // Combine via weighting
    const weight = toNum(thresholds?.weight) ?? 0.5
    const raw = weight * weekly_score + (1 - weight) * daily_score
    const score = clamp(raw, 0, 100)

    // Apply overall bands
    const ov = thresholds?.overall ?? {}
    const good = ov.good ?? { lower: 66, upper: 100 }
    const mod = ov.moderate ?? { lower: 33, upper: 66 }

    if (days_eval?.status === "neutral" && week_eval?.status === "neutral") {
      return { score, status: "neutral", week_eval, days_eval }
    }

    if (score >= (toNum(good.lower) ?? 66)) {
      return { score, status: "good", week_eval, days_eval }
    }
    if (score >= (toNum(mod.lower) ?? 33)) {
      return { score, status: "moderate", week_eval, days_eval }
    }

    return { score, status: "poor", week_eval, days_eval }
  } catch (err) {
    console.warn("[evaluateFeasibility] Failed:", err)
    return { score: -1, status: "unknown", week_eval: null, days_eval: null }
  }
}

// -------------------- Exports --------------------------------
export {
  eval_status,
  eval_score,
  eval_week,
  eval_daily_score,
  eval_daily_status,
  eval_days,
  evaluateFeasibility,
}
