import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
// import StatCard from "@/components/StatCardSystem/StatCard";
import cardData from "@/utils/cardData";
import toLocalMidnight from '@/utils/toLocalMidnight';

const calcStatus = (ave, std, sum) => {
    if (std === 0) return "undetermined";

    const zscore = Math.abs(sum - ave) / std;
    if (zscore <= 1) {
        return "good";
    }
    else if (zscore <= 2) {
        return "moderate";
    }
    else {
        return "poor";
    }
}

function isSameDay(d1, d2) {
  const day1 = toLocalMidnight(d1);
  const day2 = toLocalMidnight(d2);
//   const sameDay = d1.getDate() === d2.getDate();
//   const sameMonth = d1.getMonth() === d2.getMonth();
//   const sameYear = d1.getFullYear() === d2.getFullYear();
//   return sameDay && sameMonth && sameYear;
return day1.getTime() === day2.getTime();
}

function StatCardSystem() {
    const { tasks, timeSum } = useContext(TaskContext);
    const statuses = []

    const evaluatedCardData = useMemo(() => 
        cardData.map(card => {
            const cardDate = toLocalMidnight(card.date);

            const daySum = tasks.reduce((sum, task) => {
                const taskDate = toLocalMidnight(task["start_date"]);
                return isSameDay(cardDate, taskDate) ? sum + task["time_estimation"]: sum
            }, 0)

            return {...card, sum: daySum};
        }),
    [tasks, cardData]);

    return (
        <div>
            {evaluatedCardData.map(card => <h3 key={card.name}>{`Day: ${card.name}, Date: ${card.date}, sum: ${card.sum}`}</h3>)}
        </div>
    );
}

export default StatCardSystem;