import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskTable from '@/components/TaskTable/TaskTable';
import default_tasks from '@/utils/default_tasks';
import { TaskContext } from '@/contexts/TaskContext';
import { vi } from 'vitest';
import { useState, useMemo } from 'react';


const renderWithContext = (tasks, setTasks = vi.fn()) => {

  return render(
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <TaskTable />
    </TaskContext.Provider>
  );
};



const renderWithContextWrapper = (initialTasks) => {
  const Wrapper = ({ children }) => {
    const [tasks, setTasks] = useState(initialTasks);

    const timeSum = useMemo(() =>
        tasks.reduce((sum, task) => sum + task.time_estimation , 0), 
        [tasks]
    );

    return (
      <TaskContext.Provider value={{ tasks, setTasks, timeSum }}>
        {children}
      </TaskContext.Provider>
    );
  };

  return render(
    <Wrapper>
      <TaskTable />
    </Wrapper>
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

    // it('adds an extra row and task object when the "+ New Page" button is pressed, then update the time and time-sum display', async () => {
    //     renderWithContextWrapper([{ id: 1, name: 'A', time_estimation: 50 }]);

    //     const user = userEvent.setup();
    //     const footerButton = screen.getByTestId("add-task-button");

    //     const rowsBefore = screen.getAllByRole("row");
    //     await user.click(footerButton); // should now update the task list
    //     const rowsAfter = await screen.findAllByRole("row");

    //     expect(rowsAfter.length - rowsBefore.length).toEqual(1);
        
    //     const numInputs = screen.getAllByRole('spinbutton');
    //     const newNumInput = numInputs[numInputs.length - 1];
    //     await user.type(newNumInput, "100");

    //     expect(newNumInput.value).toEqual('100');
    //     expect(screen.getByText('150')).toBeInTheDocument();
    // });

    it('deselects all selected rows when anything other than another RowSelector checkbox is clicked', async () => {
      renderWithContextWrapper(default_tasks);

      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);

      expect(checkboxes[0]).toHaveAttribute('data-state', 'checked');
      expect(checkboxes[1]).toHaveAttribute('data-state', 'checked');
      expect(checkboxes[2]).toHaveAttribute('data-state', 'unchecked');

      await user.click(screen.getAllByRole('spinbutton')[0]);

      expect(checkboxes[0]).toHaveAttribute('data-state', 'unchecked');
      expect(checkboxes[1]).toHaveAttribute('data-state', 'unchecked');
      expect(checkboxes[2]).toHaveAttribute('data-state', 'unchecked');
    });
});
