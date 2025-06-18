import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskTable from '../components/TaskTable';
import { TaskContext } from '../contexts/TaskContext';
import { vi } from 'vitest';

const renderWithContext = (tasks, setTasks = vi.fn()) => {
  return render(
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <TaskTable />
    </TaskContext.Provider>
  );
};

describe('TaskTable Integration Tests', () => {
  const sampleTasks = [
    {
      id: 1,
      name: 'Test Task',
      category: 'Career',
      date: '6/17/2025',
      time_estimation: 60,
      selected: false
    }
  ];

  it('renders all subcomponents for a task row', () => {
    renderWithContext(sampleTasks);

    expect(screen.getByRole('textbox')).toHaveValue('Test Task');
    expect(screen.getByRole('button', { name: /career/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('60')).toBeInTheDocument();
  });

  it('allows editing a task name and updates state', async () => {
    const user = userEvent.setup();
    const mockSetTasks = vi.fn();
    renderWithContext(sampleTasks, mockSetTasks);

    const textbox = screen.getByRole('textbox');
    await user.clear(textbox);
    await user.type(textbox, 'Updated Name');

    expect(mockSetTasks).toHaveBeenCalled();
  });

  it('calculates and displays the correct sum of time estimations', () => {
    renderWithContext([
      { id: 1, name: 'A', time_estimation: 30 },
      { id: 2, name: 'B', time_estimation: 70 }
    ]);

    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('deletes selected tasks when pressing Backspace or Delete', async () => {
    const user = userEvent.setup();
    const mockSetTasks = vi.fn();
    const selectedTask = { id: 1, name: 'To Delete', selected: true, time_estimation: 10 };

    renderWithContext([selectedTask], mockSetTasks);
    await user.keyboard('{Backspace}');

    expect(mockSetTasks).toHaveBeenCalledTimes(1);
    const updateFn = mockSetTasks.mock.calls[0][0];
    expect(typeof updateFn).toBe('function');

    const result = updateFn([selectedTask]);
    expect(result).toEqual([]);
  });

  it('does not delete if no tasks are selected', async () => {
    const user = userEvent.setup();
    const mockSetTasks = vi.fn();

    renderWithContext([{ id: 1, name: 'Task', selected: false }], mockSetTasks);
    await user.keyboard('{Backspace}');

    expect(mockSetTasks).not.toHaveBeenCalled();
  });
});
