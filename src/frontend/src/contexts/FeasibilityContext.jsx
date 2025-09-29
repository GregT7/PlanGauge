import { useMemo, useState, useEffect, createContext, useContext } from "react"
import defaultThresholds from "@/utils/defaultThresholds.json" with { type: 'json'}
import { TaskContext } from "./TaskContext"
import { StatsContext } from "./StatsContext"
import testCardData from "@/utils/testCardData.json" with { type: 'json'}
import toLocalMidnight from "@/utils/toLocalMidnight"
import { evaluateFeasibility } from "@/utils/evaluateFeasibility"

const calcStatus = (ave, std, sum) => {
  if (std === 0) return "undetermined";

  const zscore = Math.abs(sum - ave) / std;
  if (zscore <= 1) return "good";
  else if (zscore <= 2) return "moderate";
  else return "poor";
};

function isSameDay(d1, d2) {
  const day1 = toLocalMidnight(d1);
  const day2 = toLocalMidnight(d2);
  return day1.getTime() === day2.getTime();
}

function evalStatus(zScore, _std, sum) {
  zScore = Math.abs(zScore);
  if (sum === 0) return "neutral";
  else if (zScore > 2) return "poor";
  else if (zScore > 1) return "moderate";
  else if (zScore <= 1) return "good";
  else return "undefined";
}

export const feasibilityContext = createContext(undefined);

export function FeasibilityContextProvider({ children, cardData = testCardData }) {
const statsCtx = useContext(StatsContext);
const stats = statsCtx?.stats
const {tasks, timeSum} = useContext(TaskContext)

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

const feasibility = useMemo(() => {
  const result = evaluateFeasibility(timeSum, stats?.week, statusCount, defaultThresholds);
  console.log("eval result:", result);
  return result;
}, [timeSum, statusCount, stats]);

  

//   console.log("evaluatedCardSums", evaluatedCardSums)
  console.log("evaluatedCardSums", statusCount)


    const test = 1
    return (
        <feasibilityContext.Provider value={test}>
            {children}
        </feasibilityContext.Provider>
    );     
}