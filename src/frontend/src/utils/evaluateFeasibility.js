import defaultThresholds from "@/utils/defaultThresholds.json" with { type: "json" };

/** Safe number helper */
const toNum = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);

/** Classify a sum against mean/std using z-score bands. */
function eval_status(sum, stats, zThresholds) {
  if (sum == null || stats == null || zThresholds == null) return "unknown"
  if (sum < 0 ) return "unknown"

  const ave = toNum(stats?.ave);
  const std = toNum(stats?.std);
  const x = toNum(sum);

  if (ave == null || std == null || x == null) return "unknown";
  if (std <= 0) return "unknown"; // cannot compute zscore robustly

  const z = Math.abs((x - ave) / std);

  // Provide robust defaults if thresholds are missing
  const goodUpper = toNum(zThresholds?.good?.upper) ?? 0.5;
  const modUpper  = toNum(zThresholds?.moderate?.upper) ?? 1.5;

  if (z < goodUpper) return "good";
  if (z < modUpper) return "moderate";
  return "poor";
}

/** Map status → numeric score. */
function eval_score(status, scoreThresholds) {
  const score = scoreThresholds?.[status];
  if (typeof score === "number") return score;
  if (status !== "unknown") {
    console.warn("[eval_score] No score mapping for:", status, scoreThresholds);
  }
  
  return null;
}

/** Weekly score from total sum. */
function eval_week(week_sum, week_stats, thresholds) {
  const status = eval_status(week_sum, week_stats, thresholds?.zscore);
  return {score: eval_score(status, thresholds?.points), status: status};
}

/** Daily distribution score (average of per-day points). */
function eval_daily_score(statusCount = {}, pointsThresholds = {}) {
  let score = 0;
  let total = 0;

  for (const k in statusCount) {
    if (!Object.prototype.hasOwnProperty.call(statusCount, k)) continue;
    const count = statusCount[k];
    const pts = pointsThresholds[k];
    if (typeof count === "number" && typeof pts === "number") {
      score += count * pts;
      total += count;
    }
  }
  return total === 0 ? 0 : score / total;
}

/**
 * Combine weekly and daily scores → overall feasibility status.
 * Returns "good" | "moderate" | "poor" | "unknown".
 */
function evaluateFeasibility(
  week_sum,
  week_stats,
  statusCount,
  thresholds = defaultThresholds
) {

  try {
    if (!thresholds) thresholds = defaultThresholds;

    const week_eval = eval_week(week_sum, week_stats, thresholds);
    const weekly_score = week_eval?.score
    const daily_score  = eval_daily_score(statusCount, thresholds?.points);

    if (weekly_score == null || daily_score == null) 
      return {score: -1, status: "unknown", week_eval: null, daily_score: null}

    const w = toNum(thresholds?.score_weight) ?? toNum(thresholds?.weight) ?? 0.5;
    const score_raw = w * weekly_score + (1 - w) * daily_score;
    const score = Math.max(0, Math.min(100, score_raw)); // clamp

    // Ordered checks so bands fully cover [0, 100]
    const ov = thresholds?.overall ?? {};
    const good = ov.good ?? { lower: 66, upper: 100 };
    const mod  = ov.moderate ?? { lower: 33, upper: 66 };
    // Anything below moderate.lower is poor.

    if (score >= (toNum(good.lower) ?? 66)) 
      return {score: score, status: "good", week_eval: week_eval, daily_score: daily_score};
    if (score >= (toNum(mod.lower) ?? 33))  
      return {score: score, status: "moderate", week_eval: week_eval, daily_score: daily_score};
    return {score: score, status: "poor", week_eval: week_eval, daily_score: daily_score};
  } catch (err) {
    console.warn("[evaluateFeasibility] Failed:", err);
    return {score: -1, status: "unknown", week_eval: null, daily_score: null}
  }
}

export { eval_status, eval_score, eval_week, eval_daily_score, evaluateFeasibility };
