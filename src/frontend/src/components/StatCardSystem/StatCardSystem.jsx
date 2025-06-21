import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
// import StatCard from "@/components/StatCardSystem/StatCard";
import cardData from "@/utils/cardData";
import StatCard from "@/components/StatCardSystem/StatCard"
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
    return day1.getTime() === day2.getTime();
}

function evalStatus(zScore, _std, sum) {
    zScore = Math.abs(zScore);
    if (sum === 0) {
        return "neutral";
    }
    else if (zScore > 2) {
        return "poor";
    } else if (zScore > 1) {
        return "moderate";
    } else if (zScore <= 1) {
        return "good";
    } else {
        return "undefined";
    }
}


function StatCardSystem() {
    const { tasks, timeSum } = useContext(TaskContext);


    const evaluatedCardSums = useMemo(() => 
        cardData.map(card => {
            const cardDate = toLocalMidnight(card.date);

            const daySum = tasks.reduce((sum, task) => {
                const taskDate = toLocalMidnight(task["start_date"]);
                return isSameDay(cardDate, taskDate) ? sum + task["time_estimation"]: sum
            }, 0);

            return {...card, sum: daySum};
        }),
    [tasks, cardData]);

    const evaluatedCardStatus = useMemo(() => 
        evaluatedCardSums.map(evalCard => {
            const zScore = (evalCard.sum - evalCard.ave) / evalCard.std;
            const newStatus = evalStatus(zScore, evalCard.std, evalCard.sum);

            return {...evalCard, z_score: zScore, status: newStatus}
        }),     
    [evaluatedCardSums])



    return (
        <div className=" w-[73.5%] mx-auto border-2 border-dashed pt-2">
            <h1 className="text-2xl py-2 text-left pl-8">Stat Card System</h1>
            {/* Top row: Mon–Thu */}
            <div className="grid grid-cols-4 gap-x-4">
                {evaluatedCardStatus
                .filter(card =>
                    /monday|tuesday|wednesday|thursday/i.test(card.name)
                )
                .map(card => (
                    <div
                    key={card.date}
                    className="h-48 w-full flex justify-center items-center"
                    >
                        <StatCard cardData={card}/>
                    </div>
                ))}
            </div>

            {/* Bottom row: Fri–Sun */}
            <div className="grid grid-cols-3 gap-x-6">
                {evaluatedCardStatus
                .filter(card =>
                    /friday|saturday|sunday/i.test(card.name)
                )
                .map(card => (
                    <div
                    key={card.date}
                    className="h-48 w-full flex justify-center items-center"
                    >
                        <StatCard cardData={card}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StatCardSystem;