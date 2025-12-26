import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import toLocalMidnight from '@/utils/toLocalMidnight';
import emptyTasks from "@/utils/emptyTasks.json" with { type: 'json' }
import demoTasks from "@/utils/demoTasks.json" with { type: 'json' }

import { AuthContext } from './AuthContext';
import { reformatTasks, parseTaskDates } from '@/utils/modeUtils';
import { determineCapabilities } from './modeConfig';

export const TaskContext = createContext(undefined);

export function TaskContextProvider({children}) {
    const { authLoaded, mode } = useContext(AuthContext)
    let reformattedTasks = reformatTasks(emptyTasks)
    const [tasks, setTasks] = useState(reformattedTasks);

    useEffect(() => {
        const capabilities = determineCapabilities(mode);
        if (capabilities?.taskSource === "dummy") {
            const parsedTasks = parseTaskDates(demoTasks)
            reformattedTasks = reformatTasks(parsedTasks)
            setTasks(reformattedTasks)
        } else {
            reformattedTasks = reformatTasks(emptyTasks)
            setTasks(reformattedTasks)
        }
    }, [authLoaded, mode])

    const timeSum = useMemo(() =>
        tasks.reduce((sum, task) => sum + task.time_estimation , 0), 
        [tasks]
    );

    return (
        <TaskContext.Provider value={{tasks, setTasks, timeSum}}>
            {children}
        </TaskContext.Provider>
    );
}