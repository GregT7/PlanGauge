import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useState, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import TaskTable from '@/components/TaskTable/TaskTable';
import StatCardSystem from '@/components/StatCardSystem/StatCardSystem';
import testCardData from "@/utils/testCardData";

const Wrapper = ({ initialTasks, initialCardData }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const timeSum = useMemo(() => {
    return tasks.reduce((acc, task) => acc + task.time_estimation, 0);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, timeSum }}>
      <div className="grid grid-cols-2 gap-8">
        <TaskTable />
        <StatCardSystem cardData={initialCardData} />
      </div>
    </TaskContext.Provider>
  );
};

describe('Integration: TaskTable and StatCardSystem', () => {
//   beforeEach(() => vi.useFakeTimers());

  const sharedDate = new Date('2025-06-17');
  const initialTasks = [
    {
      id: 1,
      name: 'Initial Task',
      start_date: sharedDate,
      due_date: sharedDate,
      time_estimation: 600,
      selected: false,
    },
  ];

  it('renders TaskTable and StatCardSystem side by side', () => {
    render(<Wrapper initialTasks={initialTasks} initialCardData={testCardData}/>);

    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Initial Task');
  });

  it('updates StatCard status when a new task is added', async () => {
    render(<Wrapper initialTasks={initialTasks} initialCardData={testCardData}/>);
    const user = userEvent.setup();

    const footerButton = screen.getByTestId('add-task-button');
    await user.click(footerButton);

    const inputs = screen.getAllByRole('spinbutton');
    const lastInput = inputs[inputs.length - 1];
    await user.clear(lastInput);
    await user.type(lastInput, '90');

    // Confirm that total time sum is now 150
    expect(screen.getByText('690')).toBeInTheDocument();

    // Check if any StatCard now shows poor status
    const statCards = screen.getAllByTestId('StatCard');
    const foundPoor = statCards.some(card =>
      card.textContent.toLowerCase().includes('poor')
    );
    expect(foundPoor).toBe(true);
  });

  it('removes time contribution from StatCard when task is deleted', async () => {
    const user = userEvent.setup();
    render(<Wrapper initialTasks={[...initialTasks, { ...initialTasks[0], id: 2, time_estimation: 90 }]} initialCardData={testCardData}  />);

    // Confirm initial time sum
    expect(screen.getByText('690')).toBeInTheDocument();

    // Select second task row
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    // Delete via keyboard
    await user.keyboard('{Backspace}');

    // Should drop sum to 60 now
    expect(screen.getByText('600')).toBeInTheDocument();
  });

  it('task name edits do not affect StatCard rendering or stability', async () => {
    const user = userEvent.setup();
    render(<Wrapper initialTasks={initialTasks} initialCardData={testCardData} />);

    const textbox = screen.getByRole('textbox');
    await user.clear(textbox);
    await user.type(textbox, 'Updated Name');

    expect(textbox).toHaveValue('Updated Name');

    // StatCardSystem should still be intact (not crash/react incorrectly)
    const statCards = screen.getAllByTestId('StatCard');
    expect(statCards).toHaveLength(7);
  });
});
