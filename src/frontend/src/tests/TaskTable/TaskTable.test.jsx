// src/tests/TaskTable/TaskTable.test.jsx
import React, { useState, useMemo } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, beforeEach } from "vitest";

import TaskTable from "@/components/TaskTable/TaskTable";
import default_tasks from "@/utils/default_tasks";
import { TaskContext } from "@/contexts/TaskContext";
import { processingContext } from "@/contexts/ProcessingContext";

// --- helpers ---
const TestProviders = ({ initialTasks = [], feasibilityStatus = "neutral", children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const timeSum = useMemo(
    () => tasks.reduce((sum, t) => sum + (Number(t.time_estimation) || 0), 0),
    [tasks]
  );

  return (
    <processingContext.Provider value={{ feasibility: { status: feasibilityStatus } }}>
      <TaskContext.Provider value={{ tasks, setTasks, timeSum }}>
        {children}
      </TaskContext.Provider>
    </processingContext.Provider>
  );
};

const renderWithProviders = (initialTasks, opts = {}) =>
  render(
    <TestProviders initialTasks={initialTasks} feasibilityStatus={opts.feasibilityStatus}>
      <TaskTable />
    </TestProviders>
  );

const renderWithMockSetter = (tasksArg, setTasks = vi.fn(), opts = {}) =>
  render(
    <processingContext.Provider value={{ feasibility: { status: opts.feasibilityStatus ?? "neutral" } }}>
      <TaskContext.Provider value={{ tasks: tasksArg, setTasks, timeSum: 0 }}>
        <TaskTable />
      </TaskContext.Provider>
    </processingContext.Provider>
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe("TaskTable Integration Tests (updated)", () => {
  const sampleTasks = [
    {
      id: 1,
      name: "Test Task",
      category: "Career",
      // component now uses DateSelector; keeping strings is fine for render
      due_date: "",
      start_date: "",
      time_estimation: 60,
      selected: false,
    },
  ];

  it("renders all subcomponents for a task row", () => {
    renderWithProviders(sampleTasks);

    expect(screen.getByRole("textbox")).toHaveValue("Test Task");


    // CategorySelector trigger should be a button inside the first data row
    const rows = screen.getAllByRole("row");
    // Grab the first data row (skip header if present)
    const dataRow = rows.find(r => within(r).queryByRole("textbox"));
    expect(dataRow).toBeTruthy();
    const rowButtons = within(dataRow).getAllByRole("button");
    expect(rowButtons.length).toBeGreaterThan(0);

    // TimeInput should be a number input
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("allows editing a task name and updates state", async () => {
    const user = userEvent.setup();
    const mockSetTasks = vi.fn();

    renderWithMockSetter(sampleTasks, mockSetTasks);

    const textbox = screen.getByRole("textbox");
    await user.clear(textbox);
    await user.type(textbox, "Updated Name");

    expect(mockSetTasks).toHaveBeenCalled();
  });

  it("calculates and displays the correct sum of time estimations", () => {
    renderWithProviders([
      { id: 1, name: "A", time_estimation: 30, selected: false },
      { id: 2, name: "B", time_estimation: 70, selected: false },
    ]);

    // CustomFooter renders the sum somewhere in the table footer
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("deletes selected tasks when pressing Backspace", async () => {
    const user = userEvent.setup();
    const mockSetTasks = vi.fn();
    const selectedTask = { id: 1, name: "To Delete", selected: true, time_estimation: 10 };

    renderWithMockSetter([selectedTask], mockSetTasks);
    await user.keyboard("{Backspace}");

    expect(mockSetTasks).toHaveBeenCalledTimes(1);

    // the component passes a functional updater — exercise it
    const updater = mockSetTasks.mock.calls[0][0];
    expect(typeof updater).toBe("function");
    expect(updater([selectedTask])).toEqual([]); // selected row filtered out
  });

  it("does not delete if no tasks are selected", async () => {
    const user = userEvent.setup();
    const mockSetTasks = vi.fn();

    renderWithMockSetter([{ id: 1, name: "Task", selected: false }], mockSetTasks);
    await user.keyboard("{Backspace}");

    expect(mockSetTasks).not.toHaveBeenCalled();
  });

  it('adds a new row when "+ New Page" is pressed, then updates time and sum display', async () => {
    const user = userEvent.setup();
    renderWithProviders([{ id: 1, name: "A", time_estimation: 50, selected: false }]);

    const rowsBefore = screen.getAllByRole("row");
    const addBtn = screen.getByTestId("add-task-button");

    await user.click(addBtn);
    const rowsAfter = await screen.findAllByRole("row");

    expect(rowsAfter.length - rowsBefore.length).toBe(1);

    // set time on the newly-added row
    const numInputs = screen.getAllByRole("spinbutton");
    const newNumInput = numInputs[numInputs.length - 1];
    await user.clear(newNumInput);
    await user.type(newNumInput, "100");

    expect(newNumInput).toHaveValue(100);
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("deselects all selected rows when clicking outside any RowSelector", async () => {
    const user = userEvent.setup();
    renderWithProviders(default_tasks);

    // shadcn checkbox exposes role="checkbox" with data-state attr
    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);

    expect(checkboxes[0]).toHaveAttribute("data-state", "checked");
    expect(checkboxes[1]).toHaveAttribute("data-state", "checked");

    // Clicking a non-row-selector element (e.g., first number input)
    await user.click(screen.getAllByRole("spinbutton")[0]);

    expect(checkboxes[0]).toHaveAttribute("data-state", "unchecked");
    expect(checkboxes[1]).toHaveAttribute("data-state", "unchecked");
  });

  it("wraps with processingContext and applies feasibility-based border classes (smoke)", () => {
    // We just ensure render doesn't crash with context present and different statuses
    renderWithProviders(sampleTasks, { feasibilityStatus: "good" });
    // No specific assertion on classes — just validates the provider wiring
    expect(screen.getByText(/Task Table/i)).toBeInTheDocument();
  });
});
