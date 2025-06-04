import { createContext, useState } from 'react';
import default_tasks from "./default_tasks";

export const TaskContext = createContext(undefined);


export default function TaskContextProvider({children}) {
    const [tasks, setTasks] = useState(default_tasks);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    );
}