import { expect, it, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import StatCardSystem from '@/components/StatCardSystem/StatCardSystem';
import { useMemo, useState } from 'react';
import { TaskContext } from "@/contexts/TaskContext";
import default_tasks from '@/utils/default_tasks';

const ContextWrapper = ({ initial_tasks, children }) => {
    const [tasks, setTasks] = useState(initial_tasks);

    const timeSum = useMemo(() => 
        tasks.reduce((sum, task) => sum + task.time_estimation, 0),
    [tasks]);

    return (
        <TaskContext.Provider value={{tasks, timeSum}}>
            {children}
        </TaskContext.Provider>
    );
};

describe("StatCardSystem unit testing", () => {
    it("passes a snapshot test", () => {
        const { container } = render(
            <ContextWrapper initial_tasks={default_tasks}>
                <StatCardSystem />
            </ContextWrapper>
        );

        expect(container).toMatchSnapshot(); // <- actual snapshot test
    });

    // it("")
});
