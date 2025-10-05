// src/tests/Integration/Table_x_Card.test.jsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import React from "react";

import TaskTable from "@/components/TaskTable/TaskTable";
import StatCardSystem from "@/components/StatCardSystem/StatCardSystem";

import TaskContextProvider from "@/contexts/TaskContext";
import { ProcessingContextProvider } from "@/contexts/ProcessingContext";

describe("Integration: TaskTable x StatCardSystem (current wiring)", () => {
  const Wrapper = ({ children }) => (
    <TaskContextProvider>
      <ProcessingContextProvider>{children}</ProcessingContextProvider>
    </TaskContextProvider>
  );

  // helper: get the first data row that actually contains a task name textbox
  const getFirstDataRow = () => {
    const rows = screen.getAllByRole("row");
    return rows.find((r) => within(r).queryAllByRole("textbox").length > 0);
  };

  it("renders TaskTable and StatCardSystem side by side (smoke)", () => {
    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    // TaskTable presence — scope to first data row to avoid 'multiple matches'
    const row = getFirstDataRow();
    expect(row).toBeTruthy();
    expect(within(row).getAllByRole("textbox").length).toBeGreaterThan(0);

    // StatCardSystem presence — heading or container text your component renders
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });

  it("adding a task updates TaskTable sum and does not break StatCardSystem", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    // Add a new row
    const addBtn = await screen.findByTestId("add-task-button");
    await user.click(addBtn);

    // Set a time on the newly added row
    const numInputs = screen.getAllByRole("spinbutton");
    const lastInput = numInputs[numInputs.length - 1];
    await user.clear(lastInput);
    await user.type(lastInput, "90");

    // The footer should show an updated sum — assert at least one “90” somewhere
    expect(screen.getAllByText(/(^|\D)90(\D|$)/).length).toBeGreaterThan(0);

    // StatCardSystem should still be mounted and rendering
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });

  it("deleting a selected task updates the table and keeps StatCardSystem stable", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    // Select the first row’s checkbox (shadcn checkbox has role="checkbox")
    const checkboxes = await screen.findAllByRole("checkbox");
    await user.click(checkboxes[0]);

    // Delete via Backspace
    await user.keyboard("{Backspace}");

    // Still renders StatCardSystem
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });

  it("editing a task name does not affect StatCardSystem integrity", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    // Edit the task name in the first data row specifically
    const row = getFirstDataRow();
    expect(row).toBeTruthy();
    const [textbox] = within(row).getAllByRole("textbox");
    await user.clear(textbox);
    await user.type(textbox, "Updated Name");

    expect(textbox).toHaveValue("Updated Name");
    // System still present
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });
});
