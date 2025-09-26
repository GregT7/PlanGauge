import { describe, it, expect } from 'vitest';
import { toast } from 'sonner'
import userEvent from '@testing-library/user-event'
import { screen, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { useState, act } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import * as connect from '@/utils/connectionTest';
import { vi } from 'vitest'
import default_tasks from '@/utils/default_tasks';
import App from "../../App";

const AppWithContextWrapper = (initialTasks) => {
  const Wrapper = ({children}) => {
    const [tasks, setTasks] = useState(initialTasks);

    return (
      <TaskContext.Provider value={{tasks, setTasks}}>
        {children}
      </TaskContext.Provider>
    )
  }

  return (
    <Wrapper>
      <App/>
    </Wrapper>
  );
}

describe("App", () => {
  it("renders all components without problems", () => {
    const { container } = render(
      <AppWithContextWrapper initialTasks={default_tasks}/> 
    )
    expect(container).toMatchSnapshot();
  });

  it("calls connectionTest only once at launch", async () => {
    const connectSpy = vi.spyOn(connect, 'connectionTest');
    const { container } = render(
      <AppWithContextWrapper initialTasks={default_tasks}/> 
    );
    expect(connectSpy).toHaveBeenCalledTimes(1);

    const user = userEvent.setup();

    // only called once: after deleting a task
    const checkboxes = await screen.findAllByRole('checkbox')
    await user.click(checkboxes[0]);
    await user.keyboard('{Backspace}');
    expect(connectSpy).toHaveBeenCalledTimes(1);

    // only called once: after modifying an existing row
    const inputToModify = await screen.getByDisplayValue("Plan Japan trip p2")
    await user.clear(inputToModify);
    await user.type(inputToModify, "New text!!!!")
    expect(connectSpy).toHaveBeenCalledTimes(1);

    // only called once: after creating a new row
    const addButton = await screen.findByTestId("add-task-button");
    await user.click(addButton);
    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it("displays Toaster component when toast is invoked", async () => {
    vi.useFakeTimers()

    const { container } = render(
      <AppWithContextWrapper initialTasks={default_tasks}/> 
    );

    await act(async () => {
      toast("Hello world!");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    })
    expect(screen.getByText("Hello world!")).toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    })
    expect(screen.queryByText("Hello world!")).not.toBeInTheDocument()

    vi.useRealTimers();
  });


  it("doesn't crash when connectionTest fails", () => {
    const connectSpy = vi.spyOn(connect, 'connectionTest').mockImplementationOnce(() => {
      throw new Error("forced failure");
    });

    const { container } = render(
      <AppWithContextWrapper initialTasks={default_tasks}/> 
    );

    expect(container).toMatchSnapshot();
  })
})