// import { createContext, useState, useMemo } from 'react';
// import default_tasks from "@/utils/default_tasks";
// import stat_tasks from "@/utils/stat_tasks";
// import toLocalMidnight from '@/utils/toLocalMidnight';

// export const TaskContext = createContext(undefined);

// export default function TaskContextProvider({children, starting_tasks=default_tasks}) {
//     const reformattedTasks = starting_tasks.map(task => (
//         {
//             ...task, 
//             "start_date": toLocalMidnight(task["start_date"]),
//             "due_date": toLocalMidnight(task["due_date"])
//         }
//     ))
//     const [tasks, setTasks] = useState(reformattedTasks);

//     const timeSum = useMemo(() =>
//         tasks.reduce((sum, task) => sum + task.time_estimation , 0), 
//         [tasks]
//     );

//     return (
//         <TaskContext.Provider value={{tasks, setTasks, timeSum}}>
//             {children}
//         </TaskContext.Provider>
//     );
// }

import { createContext, useState, useMemo, useCallback } from 'react';
import default_tasks from "@/utils/default_tasks";
import toLocalMidnight from '@/utils/toLocalMidnight';

export const TaskContext = createContext(undefined);

export default function TaskContextProvider({ children, starting_tasks = default_tasks }) {
  // ---- normalize incoming tasks once (lazy initializer) ----
  const initialTasks = useMemo(() => {
    const src = Array.isArray(starting_tasks) ? starting_tasks : [];
    return src.map(task => ({
      ...task,
      start_date: task?.start_date ? toLocalMidnight(task.start_date) : null,
      due_date: task?.due_date ? toLocalMidnight(task.due_date) : null,
      // ensure number type for time_estimation
      time_estimation: Number.isFinite(task?.time_estimation) ? task.time_estimation : 0,
      selected: Boolean(task?.selected) && task.selected, // normalize to true/false if you use tri-state
    }));
  }, [starting_tasks]);

  const [tasks, setTasks] = useState(() => initialTasks);

  // ---- derived values ----
  const timeSum = useMemo(
    () => tasks.reduce((sum, t) => sum + (Number(t.time_estimation) || 0), 0),
    [tasks]
  );

  // ---- optional convenience actions (keeps components simple) ----
  const addTask = useCallback((partial = {}) => {
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        category: '',
        due_date: null,
        start_date: null,
        time_estimation: 0,
        selected: false,
        ...partial,
      }
    ]);
  }, []);

  const updateTask = useCallback((id, patch) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const removeSelected = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.selected));
  }, []);

  // ---- stable context value to prevent unnecessary re-renders ----
  const value = useMemo(
    () => ({ tasks, setTasks, timeSum, addTask, updateTask, removeSelected }),
    [tasks, timeSum, addTask, updateTask, removeSelected]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
