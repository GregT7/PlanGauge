import React from "react";
import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

// --- Mock UI Components (shadcn stubs) ---
vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }) => <div data-testid="accordion">{children}</div>,
  AccordionItem: ({ children }) => <div>{children}</div>,
  AccordionTrigger: ({ children, ...p }) => <button {...p}>{children}</button>,
  AccordionContent: ({ children }) => <div>{children}</div>,
}));

// --- Mock JSON / Style data ---
vi.mock("@/utils/styleData.json", () => ({
  default: {
    good: { text: "text-green-500", base: "bg-green-200" },
    moderate: { text: "text-yellow-500", base: "bg-yellow-200" },
    poor: { text: "text-red-500", base: "bg-red-200" },
    unknown: { text: "text-gray-400", base: "bg-gray-200" },
  },
}), { virtual: true });

// --- Mock Contexts ---
vi.mock("@/contexts/TaskContext", () => {
  const React = require("react");
  // timeSum = 120 to make numbers deterministic
  return { TaskContext: React.createContext({ timeSum: 120 }) };
});

vi.mock("@/contexts/ProcessingContext", () => {
  const React = require("react");
  return {
    processingContext: React.createContext({
      stats: { week: { ave: 100, std: 20 } },
      feasibility: { week_eval: { status: "good", score: 95 } },
    }),
  };
});

// --- SUT ---
import WeekAccordion from "@/components/EvaluationSection/WeekAccordion";

describe("WeekAccordion", () => {
  it("renders the weekly evaluation header and content correctly", () => {
    render(<WeekAccordion />);

    // Header
    expect(screen.getByText(/Weekly Evaluation/i)).toBeInTheDocument();
    expect(screen.getByText(/Good/i)).toBeInTheDocument();
    expect(screen.getByText(/\(95 pts\)/i)).toBeInTheDocument();

    // Description present
    expect(
      screen.getByText(/Weekly feasibility is derived from your total minutes/i)
    ).toBeInTheDocument();

    // Target the metrics list specifically
    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(4);

    // Assert each line's label and a sane value shape (no generic /mins/ lookups)
    expect(items[0]).toHaveTextContent(/^Time Sum:\s+(?:\d+|—)\s+mins$/i);
    expect(items[1]).toHaveTextContent(/^Average:\s+(?:\d+|—)\s+mins$/i);
    expect(items[2]).toHaveTextContent(/^Standard Deviation:\s+(?:\d+|—)\s+mins$/i);
    expect(items[3]).toHaveTextContent(/^Z-Score:\s+(?:\d+\.\d{2}|—)$/i);

    // Optional: with our mocks, z = |(120-100)/20| = 1.00
    expect(items[3]).toHaveTextContent(/1\.00/);
  });
});
