// src/tests/EvaluationSection/DailyAccordion.test.jsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

/* ------------------------ HOIST-SAFE MOCKS (TOP) ------------------------ */
vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }) => <div data-testid="accordion">{children}</div>,
  AccordionItem: ({ children }) => <div>{children}</div>,
  AccordionTrigger: ({ children, ...p }) => <button {...p}>{children}</button>,
  AccordionContent: ({ children }) => <div>{children}</div>,
}));

vi.mock("@/utils/styleData.json", () => ({
  default: {
    good: { base: "bg-green-500", text: "text-green-500" },
    moderate: { base: "bg-yellow-500", text: "text-yellow-500" },
    poor: { base: "bg-red-500", text: "text-red-500" },
    unknown: { base: "bg-gray-500", text: "text-gray-500" },
  },
}), { virtual: true });

// IMPORTANT: mock the same module DailyAccordion imports, and export the named context
vi.mock("@/contexts/ProcessingContext", async () => {
  const React = await import("react");
  const processingContext = React.createContext({});
  // (Optionally) export the provider for future tests; SUT only needs the context
  function ProcessingContextProvider({ value, children }) {
    return (
      <processingContext.Provider value={value}>
        {children}
      </processingContext.Provider>
    );
  }
  return { processingContext, ProcessingContextProvider };
});
/* ----------------------------------------------------------------------- */

// ⚠️ Use the exact path + extension to avoid undefined component under alias resolution
import DailyAccordion from "@/components/EvaluationSection/DailyAccordion.jsx";
import { processingContext as ProcessingCtx } from "@/contexts/ProcessingContext";

/* ============================== TESTS ================================== */
describe("DailyAccordion", () => {
  it("renders header, status counts (Good → Moderate → Poor), and equation with computed score/color", () => {
    const value = {
      feasibility: { days_eval: { status: "good", score: 82 } },
      statusCount: { good: 4, moderate: 2, poor: 1 },
      thresholds: { points: { good: 100, moderate: 60, poor: 0 } },
    };

    render(
      <ProcessingCtx.Provider value={value}>
        <DailyAccordion />
      </ProcessingCtx.Provider>
    );

    // Header + colored score
    expect(screen.getByText(/Daily Evaluation/i)).toBeInTheDocument();
    const scoreEl = screen.getByText("(82 pts)");
    expect(scoreEl).toHaveClass("text-green-500");

    // Section headings
    const statusHeading = screen.getByRole("heading", { name: /Status Count/i });
    const equationHeading = screen.getByRole("heading", { name: /Equation/i });
    expect(statusHeading).toBeInTheDocument();
    expect(equationHeading).toBeInTheDocument();

    // Status Count list (scope with within to avoid "GoodGood" badge/label duplication issues)
    const statusBox = statusHeading.closest("div");
    expect(statusBox).toBeTruthy();

    const items = within(statusBox).getAllByRole("listitem");
    expect(items).toHaveLength(3);

    // Fixed order: Good → Moderate → Poor
    expect(items[0]).toHaveTextContent(/Good.*→.*4 days?/i);
    expect(items[1]).toHaveTextContent(/Moderate.*→.*2 days?/i);
    expect(items[2]).toHaveTextContent(/Poor.*→.*1 day/i);

    // Equation details
    const eqBox = equationHeading.closest("div");
    expect(eqBox).toBeTruthy();
    expect(within(eqBox).getByText(/weighted average/i)).toBeInTheDocument();
    expect(within(eqBox).getByText(/Points:/i)).toBeInTheDocument();
    expect(within(eqBox).getByText(/Formula:/i)).toBeInTheDocument();
    expect(within(eqBox).getByText(/This run:/i)).toBeInTheDocument();

    // Live numbers show up in the “This run” snippet
    expect(within(eqBox).getByText(/4×100/i)).toBeInTheDocument();
    expect(within(eqBox).getByText(/2×60/i)).toBeInTheDocument();
    expect(within(eqBox).getByText(/\/\s*7/i)).toBeInTheDocument(); // totalDays = 7
    expect(within(eqBox).getByText(/82\s*pts/i)).toBeInTheDocument();
  });

  it("handles missing inputs by defaulting counts to 0 and showing unknown gracefully", () => {
    const value = {
      feasibility: { days_eval: { status: "unknown", score: NaN } },
      // statusCount omitted → component defaults to zeros
      thresholds: { points: { good: 100, moderate: 60, poor: 0 } },
    };

    render(
      <ProcessingCtx.Provider value={value}>
        <DailyAccordion />
      </ProcessingCtx.Provider>
    );

    const statusHeading = screen.getByRole("heading", { name: /Status Count/i });
    const statusBox = statusHeading.closest("div");
    expect(statusBox).toBeTruthy();

    const items = within(statusBox).getAllByRole("listitem");
    expect(items[0]).toHaveTextContent(/Good.*→.*0 days?/i);
    expect(items[1]).toHaveTextContent(/Moderate.*→.*0 days?/i);
    expect(items[2]).toHaveTextContent(/Poor.*→.*0 days?/i);

    // Equation section still present
    expect(screen.getByRole("heading", { name: /Equation/i })).toBeInTheDocument();
  });
});
