import { describe, it, expect } from 'vitest';
// import userEvent from '@testing-lbrary/user-event';

import { screen, render } from '@testing-library/react';
import { useState } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import { vi } from 'vitest'
import default_tasks from '@/utils/default_tasks';
import App from "../App";

const AppWithContextWrapper = ({children}) => {
  const [tasks, setTasks] = useState(default_tasks);

  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
      {children}
    </TaskContext.Provider>
  )
}

describe("App unit tests", () => {
  it("passes snapshot test", () => {
    const { container } = render(
      <AppWithContextWrapper>
        <App/>
      </AppWithContextWrapper>
    );
    expect(container).toMatchSnapshot();
  })
})

// describe("App integration tests", () => {

// })