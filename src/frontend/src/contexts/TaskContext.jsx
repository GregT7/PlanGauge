import { createContext, useState, useMemo } from 'react';
import default_tasks from "@/utils/default_tasks";
import stat_tasks from "@/utils/stat_tasks";
import toLocalMidnight from '@/utils/toLocalMidnight';

export const TaskContext = createContext(undefined);

export default function TaskContextProvider({children, starting_tasks=stat_tasks}) {
    const reformattedTasks = starting_tasks.map(task => (
        {
            ...task, 
            "start_date": toLocalMidnight(task["start_date"]),
            "due_date": toLocalMidnight(task["due_date"])
        }
    ))
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