import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import StatCard from "@/components/StatCardSystem/StatCard";
import StatusCounter from "@/components/StatCardSystem/StatusCounter";
import toLocalMidnight from '@/utils/toLocalMidnight';
import isSameDay from '@/utils/isSameDay';
import testCardData from "@/utils/testCardData.json" with { type: 'json'}
import CardRow from './CardRow';


//! Fix ME -- want to use threshodl values for zscore instead of hard coded ones
function evalStatus(zScore, _std, sum) {
  zScore = Math.abs(zScore);
  if (sum === 0) return "neutral";
  else if (zScore > 2) return "poor";
  else if (zScore > 1) return "moderate";
  else if (zScore <= 1) return "good";
  else return "undefined";
}

// const renderCardRow = (evaluatedCardStatus, daysRegex, gridClassName, cardData) => (
//   <div className={`${gridClassName} gap-4`}>
//     {evaluatedCardStatus
//       .filter(card => daysRegex.test(card.name))
//       .map(card => (
//         <div key={card.date} className="flex justify-center items-center">
//           <div className="w-44 h-44 shrink-0">
//             <StatCard cardData={card} />
//           </div>
//         </div>
//       ))}
//   </div>
// );


function StatCardSystem({cardData = testCardData}) {
  const { tasks } = useContext(TaskContext);

  const evaluatedCardSums = useMemo(() =>
    cardData.map(card => {
      const cardDate = toLocalMidnight(card.date);
      const daySum = tasks.reduce((sum, task) => {
        const taskDate = toLocalMidnight(task["start_date"]);
        return isSameDay(cardDate, taskDate) ? sum + task["time_estimation"] : sum;
      }, 0);
      return { ...card, sum: daySum };
    }),
    [tasks, cardData]
  );

  const evaluatedCardStatus = useMemo(() =>
    evaluatedCardSums.map(evalCard => {
      const zScore = (evalCard.sum - evalCard.ave) / evalCard.std;
      const newStatus = evalStatus(zScore, evalCard.std, evalCard.sum);
      return { ...evalCard, z_score: zScore, status: newStatus };
    }),
    [evaluatedCardSums]
  );

  const statusCount = useMemo(() => {
    const regex = /^(good|moderate|poor)$/;

    return evaluatedCardStatus.reduce((statObj, task) => {
      const statusValue = task?.status;
      if (statusValue && regex.test(statusValue)) {
        return {
          ...statObj,
          [statusValue]: statObj[statusValue] + 1,
        };
      }
      return statObj;
    }, { good: 0, moderate: 0, poor: 0 });
  }, [evaluatedCardStatus]);

  return (
    <div className="w-[73.5%] mx-auto border-2 border-dashed pt-2">
        <h1 className="text-2xl pt-2 pb-4 text-left pl-8">Stat Card System</h1>

        {/* {renderCardRow(evaluatedCardStatus, /monday|tuesday|wednesday|thursday/i, "grid grid-cols-4", cardData)}
        {renderCardRow(evaluatedCardStatus, /friday|saturday|sunday/i, "grid grid-cols-3 mt-4", cardData)} */}
        <CardRow evaluatedCardStatus={evaluatedCardStatus} daysRegex={/monday|tuesday|wednesday|thursday/i}
        gridClassName = {"grid grid-cols-4"} cardData = {cardData}/>
        <CardRow evaluatedCardStatus={evaluatedCardStatus} daysRegex={/friday|saturday|sunday/i}
        gridClassName = {"grid grid-cols-3 mt-4"} cardData = {cardData}/>
        
        <div>
            <StatusCounter statusCount={statusCount} />
        </div>
    </div>
  );
}

export default StatCardSystem;