import defaultThresholds from "@/utils/defaultThresholds.json" with { type: 'json' }
/**
 * Evaluate feasibility of a weekly plan by combining weekly workload realism
 * (compared to historical stats) and daily distribution balance.
 *
 * Thresholds define:
 *  - z-score bands for categories (good/moderate/poor)
 *  - points per category
 *  - score weight between weekly and daily contributions
 *  - overall category cutoffs for final labeling
 */

/**
 * Classify a sum against mean/std into a category using z-score thresholds.
 * @param {number} sum - Observed value (e.g., weekly or daily sum).
 * @param {{ave:number, std:number}} stats - Historical average & std deviation.
 * @param {object} zThresholds - Boundaries for "good", "moderate", "poor".
 * @returns {"good"|"moderate"|"poor"|null}
 */

function eval_category(sum, stats, zThresholds) {
  const zscore = Math.abs((sum - stats.ave) / stats.std);

  if (zscore < zThresholds?.good?.upper ) {
    return "good"
  }
  else if (zscore < zThresholds?.moderate?.upper) {
    return "moderate"
  } else if (zscore >= zThresholds?.moderate?.upper) {
    return "poor"
  }
  return "unknown"
}

/**
 * Map category → numeric score.
 * @param {"good"|"moderate"|"poor"} category
 * @param {object} scoreThresholds - e.g., { good:100, moderate:60, poor:0 }
 * @returns {number}
 */
function eval_score(category, scoreThresholds) {
  const score = scoreThresholds?.[category];
  if (typeof score === "number") return score;
  throw new Error(`No score mapping for category: ${category}`);
}

/**
 * Evaluate weekly score based on total week sum.
 */
function eval_weekly_score(week_sum, week_stats, thresholds) {
  const category = eval_category(week_sum, week_stats, thresholds.zscore);
  return eval_score(category, thresholds.points);
}

/**
 * Evaluate daily distribution score given counts of good/moderate/poor days.
 * @param {object} statusCount - e.g., { good:4, moderate:2, poor:1 }
 * @param {object} pointsThresholds - category → numeric mapping.
 * @returns {number} Daily score on 0–100 scale.
 */
function eval_dailies_score(statusCount, pointsThresholds) {
  let score = 0;
  let totalCount = 0;
  for (const status in statusCount) {
    if (Object.prototype.hasOwnProperty.call(statusCount, status) && pointsThresholds.hasOwnProperty(status)) {
      score += statusCount[status] * pointsThresholds[status];
      totalCount += statusCount[status];
    }
  }
  return totalCount === 0 ? 0 : score / totalCount;
}

/**
 * Combine weekly and daily scores into overall feasibility category.
 * @param {number} week_sum - Total planned week time.
 * @param {{ave:number,std:number}} week_stats - Historical week stats.
 * @param {object} statusCount - Counts of daily categories.
 * @param {object} thresholds - Config with zscore, points, score_weight, overall.
 * @returns {"good"|"moderate"|"poor"|null}
 */
function evaluateFeasibility(week_sum, week_stats, statusCount, thresholds) {
  const weekly_score = eval_weekly_score(week_sum, week_stats, thresholds);
  const dailies_score = eval_dailies_score(statusCount, thresholds.points);

  // Weighted combination (α*W + (1-α)*D)
  const weight = thresholds.score_weight ?? 0.5;
  const total_score = weight * weekly_score + (1 - weight) * dailies_score;

  // Final categorization
  if (total_score >= thresholds.overall.good.lower && total_score <= thresholds.overall.good.upper) {
    return "good";
  }
  if (total_score >= thresholds.overall.moderate.lower && total_score < thresholds.overall.moderate.upper) {
    return "moderate";
  }
  if (total_score >= thresholds.overall.poor.lower && total_score < thresholds.overall.poor.upper) {
    return "poor";
  }
  return null;
}

export { eval_category, eval_score, eval_weekly_score, eval_dailies_score, evaluateFeasibility };
