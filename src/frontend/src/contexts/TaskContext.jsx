import { createContext, useState, useMemo } from 'react';
import default_tasks from "@/utils/default_tasks";
import toLocalMidnight from '@/utils/toLocalMidnight';

export const TaskContext = createContext(undefined);

export default function TaskContextProvider({children}) {
    const reformattedTasks = default_tasks.map(task => (
        {
            ...task, 
            "start_date": new Date(task["start_date"]),
            "due_date": new Date(task["due_date"])
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