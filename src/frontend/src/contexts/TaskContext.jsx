import { createContext, useState, useMemo } from 'react';
import default_tasks from "@/utils/default_tasks";

export const TaskContext = createContext(undefined);

export default function TaskContextProvider({children}) {
    const [tasks, setTasks] = useState(default_tasks);

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