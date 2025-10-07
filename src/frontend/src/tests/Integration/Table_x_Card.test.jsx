// src/tests/Integration/Table_x_Card.test.jsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import TaskTable from "@/components/TaskTable/TaskTable";
import StatCardSystem from "@/components/StatCardSystem/StatCardSystem";
import TaskContextProvider from "@/contexts/TaskContext";
import { ProcessingContextProvider } from "@/contexts/ProcessingContext";

/**
 * NOTE: TaskTable pulls its data from TaskContext.
 * We wrap both TaskTable and StatCardSystem in the providers to simulate the real wiring.
 */

const Wrapper = ({ children }) => (
  <TaskContextProvider>
    <ProcessingContextProvider>{children}</ProcessingContextProvider>
  </TaskContextProvider>
);

// Helper: first actual data row (has an input text box for task name)
const getFirstDataRow = () => {
  const rows = screen.getAllByRole("row");
  return rows.find((r) => within(r).queryAllByRole("textbox").length > 0);
};

const readFooterSum = () => {
  const el = screen.getByTestId("time-display");
  const n = Number(el.textContent?.trim() || "0");
  return Number.isNaN(n) ? 0 : n;
};

describe("Integration: TaskTable x StatCardSystem (context-driven)", () => {
  it("smoke: renders TaskTable and StatCardSystem with providers", () => {
    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    // TaskTable present — find a real data row with a textbox
    const row = getFirstDataRow();
    expect(row).toBeTruthy();
    expect(within(row).getAllByRole("textbox").length).toBeGreaterThan(0);

    // StatCardSystem present — header text
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });

  it("adding a task and entering time updates the SUM in the footer (via context)", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    const before = readFooterSum();

    // Click the "+ New Page" button in CustomFooter (no testid, use role/name)
    const addBtn = screen.getByRole("button", { name: /new page/i });
    await user.click(addBtn);

    // Set time for the newly added row (last number input)
    const nums = screen.getAllByRole("spinbutton");
    const last = nums[nums.length - 1];
    await user.clear(last);
    await user.type(last, "90");

    const after = readFooterSum();
    expect(after - before).toBe(90);

    // StatCardSystem remains intact
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });

  it("editing a task name updates the table without affecting StatCardSystem", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    const row = getFirstDataRow();
    expect(row).toBeTruthy();

    const [nameInput] = within(row).getAllByRole("textbox");
    await user.clear(nameInput);
    await user.type(nameInput, "Updated Task");
    expect(nameInput).toHaveValue("Updated Task");

    // StatCardSystem still visible
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });

  it("deleting a selected task via Backspace removes a row and keeps StatCardSystem stable", async () => {
    const user = userEvent.setup();

    render(
      <Wrapper>
        <div className="grid grid-cols-2 gap-8">
          <TaskTable />
          <StatCardSystem />
        </div>
      </Wrapper>
    );

    // Count rows before (includes header/footer). We'll compare relative change.
    const rowsBefore = screen.getAllByRole("row").length;

    // Select the first row’s checkbox (shadcn checkbox has role="checkbox")
    const checkboxes = await screen.findAllByRole("checkbox");
    await user.click(checkboxes[0]);

    // Trigger deletion via Backspace (TaskTable listens on window)
    await user.keyboard("{Backspace}");

    const rowsAfter = screen.getAllByRole("row").length;
    expect(rowsAfter).toBeLessThan(rowsBefore);

    // StatCardSystem still present
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });
});
