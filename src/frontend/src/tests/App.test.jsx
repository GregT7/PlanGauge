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

describe("App", () => {
  it("renders all components without problems", () => {

  });

  it("calls connectionTest only once at launch", () => {

  });

  it("displays Toaster component when toast is invoked", () => {

  });

  it("doesn't crash when connectionTest fails", () => {

  })
})

// describe("App integration tests", () => {

// })