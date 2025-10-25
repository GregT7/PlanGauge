import { createContext, useState, useMemo } from 'react';
import toLocalMidnight from '@/utils/toLocalMidnight';
import emptyTasks from "@/utils/emptyTasks.json" with { type: 'json' }
import demoTasks from "@/utils/demoTasks.json" with { type: 'json' }
import { genDaysOfCurrentWeek, parseDate } from "@/utils/genDefaultCardData"
export const TaskContext = createContext(undefined);

function reformat(tasks) {
    return tasks.map(task => (
        {
            ...task, 
            "start_date": toLocalMidnight(task["start_date"]),
            "due_date": toLocalMidnight(task["due_date"])
        }
    ))
}


function parseTaskDates(tasks) {
    const days = genDaysOfCurrentWeek()

    // parse the task date from "Monday" to "2025-10-13"
    return tasks.map(task => {
        const startDate = parseDate(task["start_date"], days)
        const dueDate = parseDate(task["due_date"], days)

        return {
            ...task,
            "start_date": toLocalMidnight(startDate),
            "due_date": toLocalMidnight(dueDate)
        }
    })

}

export default function TaskContextProvider({children, starting_tasks, IS_DEMO}) {
    let reformattedTasks
    if (IS_DEMO) {
        const parsedTasks = parseTaskDates(demoTasks)
        reformattedTasks = reformat(parsedTasks)
    } else {
        if (starting_tasks == null) reformattedTasks = emptyTasks
        else {
            reformattedTasks = reformat(starting_tasks)
        }
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