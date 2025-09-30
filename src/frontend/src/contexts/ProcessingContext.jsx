// import { useMemo, useState, useEffect, createContext, useContext } from "react"
// import defaultThresholds from "@/utils/defaultThresholds.json" with { type: 'json'}
// import { TaskContext } from "./TaskContext"
// import { StatsContext } from "./StatsContext"
// import testCardData from "@/utils/testCardData.json" with { type: 'json'}
// import toLocalMidnight from "@/utils/toLocalMidnight"
// import { evaluateFeasibility } from "@/utils/evaluateFeasibility"

// const calcStatus = (ave, std, sum) => {
//   if (std === 0) return "undetermined";

//   const zscore = Math.abs(sum - ave) / std;
//   if (zscore <= 1) return "good";
//   else if (zscore <= 2) return "moderate";
//   else return "poor";
// };

// function isSameDay(d1, d2) {
//   const day1 = toLocalMidnight(d1);
//   const day2 = toLocalMidnight(d2);
//   return day1.getTime() === day2.getTime();
// }

// function evalStatus(zScore, _std, sum) {
//   zScore = Math.abs(zScore);
//   if (sum === 0) return "neutral";
//   else if (zScore > 2) return "poor";
//   else if (zScore > 1) return "moderate";
//   else if (zScore <= 1) return "good";
//   else return "undefined";
// }

// export const feasibilityContext = createContext(undefined);

// export function FeasibilityContextProvider({ children, cardData = testCardData }) {
// const statsCtx = useContext(StatsContext);
// const stats = statsCtx?.stats
// const {tasks, timeSum} = useContext(TaskContext)

//   const evaluatedCardSums = useMemo(() =>
//     cardData.map(card => {
//       const cardDate = toLocalMidnight(card.date);
//       const daySum = tasks.reduce((sum, task) => {
//         const taskDate = toLocalMidnight(task["start_date"]);
//         return isSameDay(cardDate, taskDate) ? sum + task["time_estimation"] : sum;
//       }, 0);
//       return { ...card, sum: daySum };
//     }),
//     [tasks, cardData]
//   );

//   const evaluatedCardStatus = useMemo(() =>
//     evaluatedCardSums.map(evalCard => {
//       const zScore = (evalCard.sum - evalCard.ave) / evalCard.std;
//       const newStatus = evalStatus(zScore, evalCard.std, evalCard.sum);
//       return { ...evalCard, z_score: zScore, status: newStatus };
//     }),
//     [evaluatedCardSums]
//   );

//   const statusCount = useMemo(() => {
//     const regex = /^(good|moderate|poor)$/;

//     return evaluatedCardStatus.reduce((statObj, task) => {
//       const statusValue = task?.status;
//       if (statusValue && regex.test(statusValue)) {
//         return {
//           ...statObj,
//           [statusValue]: statObj[statusValue] + 1,
//         };
//       }
//       return statObj;
//     }, { good: 0, moderate: 0, poor: 0 });
//   }, [evaluatedCardStatus]);

// const feasibility = useMemo(() => {
//   const result = evaluateFeasibility(timeSum, stats?.week, statusCount, defaultThresholds);
//   console.log("eval result:", result);
//   return result;
// }, [timeSum, statusCount, stats]);

//     const test = 1
//     return (
//         <feasibilityContext.Provider value={test}>
//             {children}
//         </feasibilityContext.Provider>
//     );     
// }

import { useMemo, useState, useEffect, createContext, useContext } from "react"
import defaultThresholds from "@/utils/defaultThresholds.json" with { type: 'json'}
import { TaskContext } from "./TaskContext"
import default_stats from '@/utils/default_stats';
import toLocalMidnight from "@/utils/toLocalMidnight"
import isSameDay from "@/utils/isSameDay";
import { evaluateFeasibility } from "@/utils/evaluateFeasibility"
import retrieveStats from '@/utils/retrieveStats';
import { genDefaultCardsData } from "@/utils/genDefaultCardData";
import { toast } from 'sonner';

const processingContext = createContext(undefined);

// testCardData.json
// [
//   { "name": "Monday",    "ave": 90, "std": 35, "date": "2025-06-16", "status": "neutral", "sum": 0 },
//   { "name": "Tuesday",   "ave": 100, "std": 20, "date": "2025-06-17", "status": "neutral", "sum": 0 },
//   { "name": "Wednesday", "ave": 50, "std": 30, "date": "2025-06-18", "status": "neutral", "sum": 0 },
//   { "name": "Thursday",  "ave": 80, "std": 10, "date": "2025-06-19", "status": "neutral", "sum": 0 },
//   { "name": "Friday",    "ave": 120, "std": 40, "date": "2025-06-20", "status": "neutral", "sum": 0 },
//   { "name": "Saturday",  "ave": 70, "std": 15, "date": "2025-06-21", "status": "neutral", "sum": 0 },
//   { "name": "Sunday",    "ave": 40, "std": 25, "date": "2025-06-22", "status": "neutral", "sum": 0 }
// ]

export function ProcessingContextProvider({children, starting_stats = default_stats}) {
    const {tasks, timeSum} = useContext(TaskContext)

    // Generate starting card data for each day of the week
    let cardData = genDefaultCardsData()

    // Retrieve stats data
    const [stats, setStats] = useState(starting_stats);

    useEffect(() => {
    let cancelled = false;

    (async () => {
        try {
        const promise = retrieveStats(); // resolves to { message, details, data }

        // bind toast to the same promise (don’t await the toast)
        toast.promise(promise, {
            loading: 'Retrieving statistical data...',
            success: (r) => r?.message ?? 'Stats loaded',
            error:   (err) => err?.message || 'Failed to retrieve stats',
        });

        const res = await promise; // get full object back
        if (!cancelled && res?.data) setStats(res.data);
        } catch (err) {
        console.error('Stats init error:', err);
        if (!cancelled) toast.error('Error: Unexpected Internal Error When Retrieving Stats');
        }
    })();

    return () => { cancelled = true; };
    }, []);
    

    // On stat retrieval/update or task table update
    // 1. Process Card Data
    //      A. Calculate day sums for each card based on task state
    

    //! uncomment this after generating card daata
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

    //      B. Calculate card status for each card based on task state
    const evaluatedCardStatus = useMemo(() =>
        evaluatedCardSums.map(evalCard => {
            const zScore = (evalCard.sum - evalCard.ave) / evalCard.std;
            const newStatus = evalStatus(zScore, evalCard.std, evalCard.sum);
            return { ...evalCard, z_score: zScore, status: newStatus };
        }),
        [evaluatedCardSums]
    );


    //      C. Count the number of statuses

    // 2. Process Overall Feasibility
    //      A. Calculate overall score
    //          Note: requires week_sum, week_stats, statusCount, thresholds
    //      A. Calculate overall feasibility 


    return (
        <processingContext.Provider value={"a"}>
            {children}
        </processingContext.Provider>
    );
}