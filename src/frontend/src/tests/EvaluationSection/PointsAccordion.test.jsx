import React from "react";
import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

// --- UI stubs (shadcn) ---
vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }) => <div data-testid="accordion">{children}</div>,
  AccordionItem: ({ children }) => <div>{children}</div>,
  AccordionTrigger: ({ children, ...p }) => <button {...p}>{children}</button>,
  AccordionContent: ({ children }) => <div>{children}</div>,
}));

// --- style data (badge/text classes) ---
vi.mock("@/utils/styleData.json", () => ({
  default: {
    good: { text: "text-green-500", base: "bg-green-200" },
    moderate: { text: "text-yellow-500", base: "bg-yellow-200" },
    poor: { text: "text-red-500", base: "bg-red-200" },
    unknown: { text: "text-gray-400", base: "bg-gray-200" },
  },
}), { virtual: true });

// --- default thresholds (if the component falls back to them) ---
vi.mock("@/utils/defaultThresholds.json", () => ({
  default: {
    points: { good: 100, moderate: 60, poor: 0 },
    overall: {
      good: { lower: 75, upper: 100 },
      moderate: { lower: 50, upper: 75 },
      poor: { lower: 0, upper: 50 },
    },
  },
}), { virtual: true });

// --- ProcessingContext (define thresholds INSIDE factory to avoid hoist issues) ---
vi.mock("@/contexts/ProcessingContext", () => {
  const React = require("react");
  const thresholds = {
    points: { good: 100, moderate: 60, poor: 0 },
    overall: {
      good: { lower: 75, upper: 100 },
      moderate: { lower: 50, upper: 75 },
      poor: { lower: 0, upper: 50 },
    },
  };
  return {
    processingContext: React.createContext({ thresholds }),
  };
});

// --- SUT ---
import PointsAccordion from "@/components/EvaluationSection/PointsAccordion";

describe("PointsAccordion", () => {
  it("shows point mappings and overall ranges with correct ordering and text", () => {
    render(<PointsAccordion />);

    // Header
    expect(screen.getByText(/Point Thresholds/i)).toBeInTheDocument();

    // Expect two lists: first for Category→Points, second for Overall score ranges
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThanOrEqual(2);

    const mappingList = lists[0];
    const rangesList = lists[1];

    // --- Mapping: Good → 100 pts, Moderate → 60 pts, Poor → 0 pts (this order)
    const mapItems = within(mappingList).getAllByRole("listitem");
    expect(mapItems).toHaveLength(3);

    // Allow a repeated label from the badge (e.g., "GoodGood→100 pts")
    expect(mapItems[0]).toHaveTextContent(/Good.*→\s*100\s+pts/i);
    expect(mapItems[1]).toHaveTextContent(/Moderate.*→\s*60\s+pts/i);
    expect(mapItems[2]).toHaveTextContent(/Poor.*→\s*0\s+pts/i);


    // --- Ranges: Good (75 ≤ score ≤ 100), Moderate (50 ≤ score < 75), Poor (0 ≤ score < 50)
    const rangeItems = within(rangesList).getAllByRole("listitem");
    expect(rangeItems).toHaveLength(3);
    expect(rangeItems[0]).toHaveTextContent(/^(?:Good\s*)+→\s*75\s+≤\s+score\s+≤\s+100$/i);
    expect(rangeItems[1]).toHaveTextContent(/^(?:Moderate\s*)+→\s*50\s+≤\s+score\s+<\s+75$/i);
    expect(rangeItems[2]).toHaveTextContent(/^(?:Poor\s*)+→\s*0\s+≤\s+score\s+<\s+50$/i);
  });
});
