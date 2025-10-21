import { useMemo, useState, useEffect, createContext, useContext } from "react"
import defaultThresholds from "@/utils/defaultThresholds.json" with { type: 'json'}
import { TaskContext } from "./TaskContext"
import default_stats from '@/utils/default_stats';
import toLocalMidnight from "@/utils/toLocalMidnight"
import isSameDay from "@/utils/isSameDay";
import { evaluateFeasibility } from "@/utils/evaluateFeasibility"
import retrieveStats from '@/utils/retrieveStats';
import { genDefaultCardsData } from "@/utils/genDefaultCardData";
import { eval_status } from "@/utils/evaluateFeasibility";
import { toast } from 'sonner';
import updateCardStats from "@/utils/updateCardStats";
import { DEFAULT_PLAN_START, DEFAULT_PLAN_END } from "@/utils/planningRange";

export const processingContext = createContext(undefined);

export function ProcessingContextProvider({children, starting_stats = default_stats, thresholds = defaultThresholds, IS_DEMO}) {
    const {tasks, timeSum} = useContext(TaskContext)

    // Generate starting card data for each day of the week
    let cardData = genDefaultCardsData()

    // Retrieve stats data
    const [stats, setStats] = useState(starting_stats);
    // const [cardData, setCardData] = useState(genDefaultCardsData())

    useEffect(() => {
        let cancelled = false;
            (async () => {
                try {

                const baseURL = "http://127.0.0.1:5000"
                const flaskURL = "/api/db/stats"
                const endpointURL = baseURL + flaskURL
                const promise = retrieveStats(DEFAULT_PLAN_START, DEFAULT_PLAN_END, 
                    endpointURL, IS_DEMO); // resolves to { message, details, data }

                // bind toast to the same promise (don’t await the toast)
                toast.promise(promise, {
                    loading: 'Retrieving statistical data...',
                    success: (r) => r?.message ?? 'Stats loaded',
                    error:   (err) => "Error: Stats Retrieval Failure!",
                });

                const res = await promise; // get full object back
                if (!cancelled && res?.data) setStats(res.data);
                } catch (err) {
                console.error('Stats init error:', err);
                // if (!cancelled) toast.error('Error: Unexpected Internal Error When Retrieving Stats');
                }
            })();
    return () => { cancelled = true; };
    }, []);

    // Update Card Data
    const statsUpdated = updateCardStats(cardData, stats?.day)

    

    // On stat retrieval/update or task table update
    // 1. Process Card Data
    //      A. Calculate day sums for each card based on task state
    cardData = useMemo(() =>
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
    // eval_category(sum, stats, zThresholds)
    cardData = useMemo(() =>
        cardData.map(evalCard => {
            const newStatus = eval_status(evalCard.sum, {std: evalCard.std, ave: evalCard.ave}, thresholds.zscore)
            return { ...evalCard, status: newStatus };
        }),
        [cardData]
    );


    //      C. Count the number of statuses
    const statusCount = useMemo(() => {
        
        const regex = /^(good|moderate|poor|neutral|unknown)$/;

        return cardData.reduce((statObj, task) => {
            const statusValue = task?.status;
            if (statusValue && regex.test(statusValue)) {
                return {
                    ...statObj,
                    [statusValue]: statObj[statusValue] + 1,
                };
            }
            return statObj;
        }, { good: 0, moderate: 0, poor: 0, neutral: 0, unknown: 0});
    }, [cardData]);
    
    // 2. Process Overall Feasibility
    //      A. Calculate overall feasibility 
    //          Note: requires week_sum, week_stats, statusCount, thresholds
    const feasibility = useMemo(() => {
        return evaluateFeasibility(timeSum, stats?.week, statusCount, thresholds)
    }, [cardData, statusCount])

    const initialDates = {start: DEFAULT_PLAN_START, end: DEFAULT_PLAN_END}
    const [filterDates, setFilterDates] = useState(initialDates)

    //   const value = useMemo(() => ({ stats, setStats }), [stats]);
    const value = useMemo(() => ({stats, cardData, statusCount, feasibility, thresholds, filterDates}), [stats, filterDates, cardData])

    return (
        <processingContext.Provider value={value}>
            {children}
        </processingContext.Provider>
    );
}