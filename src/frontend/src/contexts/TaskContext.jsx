import { createContext, useState, useMemo } from 'react';
import toLocalMidnight from '@/utils/toLocalMidnight';
import emptyTasks from "@/utils/emptyTasks.json" with { type: 'json' }

export const TaskContext = createContext(undefined);

export default function TaskContextProvider({children, starting_tasks}) {
    let reformattedTasks
    if (starting_tasks == null) reformattedTasks = emptyTasks
    else {
        reformattedTasks = starting_tasks.map(task => (
            {
                ...task, 
                "start_date": toLocalMidnight(task["start_date"]),
                "due_date": toLocalMidnight(task["due_date"])
            }
        ))
    }
    const [tasks, setTasks] = useState(reformattedTasks);

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