import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import { StatsContext } from '@/contexts/StatsContext';
import { eval_weekly_score } from '@/utils/evaluateFeasibility';


const thresholds = {
  zscore: {
    good: { lower: -1, upper: 1 },
    moderate: { lower: -2, upper: 2 },
    poor: { lower: -3, upper: 3 },
  },
  points: {
    good: 100,
    moderate: 60,
    poor: 0,
  },
  overall: {
    good: { lower: 75, upper: 100 },
    moderate: { lower: 50, upper: 75 },
    poor: { lower: 0, upper: 50 },
  }
};

function EvaluationSection() {
  const { timeSum } = useContext(TaskContext)
  const statsCtx = useContext(StatsContext);

  const stats = statsCtx?.stats;

  const ave = stats?.week?.ave;
  const std = stats?.week?.std;

  const aveStr = Number.isFinite(ave) ? Math.round(ave) : '—';
  const stdStr = Number.isFinite(std) ? Math.round(std) : '—';

  const hasStats = Number.isFinite(ave) && Number.isFinite(std);
  const hasTime = Number.isFinite(timeSum);

  const weekScore = useMemo(() => {
    if (!hasStats || !hasTime) return null;
    try {
      // pass only what the function needs; if it expects { ave, std }, give that
      return eval_weekly_score(timeSum, stats.week, thresholds);
    } catch (e) {
      console.error('eval_weekly_score failed:', e);
      return null;
    }
  }, [hasStats, hasTime, timeSum, ave, std]);




  return (
    <div>
      <h1>Evaluation Section</h1>
      <h2>Week Time Sum Evaluation</h2>
      <div>
        <p>Sum: {Number.isFinite(timeSum) ? timeSum : '—'} mins</p>
        <p>
          Historical Ave: {aveStr} mins, Historical Std: {stdStr} mins
        </p>
        <p>Weekly Score: {weekScore ?? '—'}</p>
      </div>
    </div>
  );
}

export default EvaluationSection;
