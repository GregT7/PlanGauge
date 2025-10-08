// src/components/StatCardSystem/StatusCounter.jsx
import CountElement from "./CountElement";

const DEFAULT_COUNT = { good: 0, moderate: 0, poor: 0 };

function StatusCounter({ statusCount = DEFAULT_COUNT }) {
  const valid =
    Number.isInteger(statusCount?.good) &&
    Number.isInteger(statusCount?.moderate) &&
    Number.isInteger(statusCount?.poor);

  const counts = valid ? statusCount : DEFAULT_COUNT;

  return (
    <div className="flex justify-center gap-5 items-center py-5" data-testid="StatusCounter">
      <CountElement styling={"bg-emerald-500"} count={counts.good} />
      <CountElement styling={"bg-amber-500"} count={counts.moderate} />
      <CountElement styling={"bg-rose-500"} count={counts.poor} />
    </div>
  );
}

export default StatusCounter;
