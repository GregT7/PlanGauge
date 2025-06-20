import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';

function StatCardSystem() {
    const { tasks, timeSum} = useContext(TaskContext);

    return (
        <div>{timeSum}</div>
    );
}

export default StatCardSystem;