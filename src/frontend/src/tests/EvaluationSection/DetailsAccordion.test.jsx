// src/tests/EvaluationSection/DetailsAccordion.test.jsx
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

// Keep data-only to avoid hoist issues
vi.mock("@/utils/styleData.json", () => ({
  default: {
    good: { base: "bg-green-500", text: "text-green-500" },
    moderate: { base: "bg-yellow-500", text: "text-yellow-500" },
    poor: { base: "bg-red-500", text: "text-red-500" },
    unknown: { base: "bg-gray-500", text: "text-gray-500" },
  },
}), { virtual: true });

// Context mock (async factory prevents hoist explosions)
vi.mock("@/contexts/ProcessingContext", async () => {
  const React = await import("react");
  const processingContext = React.createContext({});
  return { processingContext };
});

// Stub nested accordions so we only validate DetailsAccordion’s shell
vi.mock("@/components/EvaluationSection/WeekAccordion.jsx", () => ({
  default: () => <div data-testid="week-accordion">WeekAccordion</div>,
}));
vi.mock("@/components/EvaluationSection/DailyAccordion.jsx", () => ({
  default: () => <div data-testid="daily-accordion">DailyAccordion</div>,
}));
vi.mock("@/components/EvaluationSection/ZAccordion.jsx", () => ({
  default: () => <div data-testid="z-accordion">ZAccordion</div>,
}));
vi.mock("@/components/EvaluationSection/PointsAccordion.jsx", () => ({
  default: () => <div data-testid="points-accordion">PointsAccordion</div>,
}));
/* ----------------------------------------------------------------------- */

// ⚠️ Use extension to dodge “Element type is invalid” import snafus
import DetailsAccordion from "@/components/EvaluationSection/DetailsAccordion.jsx";
import { processingContext as ProcessingCtx } from "@/contexts/ProcessingContext";

/* ============================== HELPERS ================================= */
// Anchor a section by a reliable text node inside it, then scope to the nearest div.
function getSectionByTextAnchor(anchorRegex) {
  const anchor = screen.getByText(anchorRegex);
  const box = anchor.closest("div");
  expect(box).toBeTruthy();
  return box;
}

/* ============================== TESTS ================================== */
describe("DetailsAccordion", () => {
  it("renders Details header, Inputs, Equation, Stats Filter, Weekly Stats, and nested accordions", () => {
    const value = {
      thresholds: { weight: 0.6 },
      stats: { week: { ave: 100, std: 20 } },
      filterDates: { start: "2025-09-28", end: "2025-10-04" },
      feasibility: {
        status: "good",
        score: 88,
        week_eval: { status: "good", score: 92 },
        days_eval: { status: "moderate", score: 70 },
      },
    };

    render(
      <ProcessingCtx.Provider value={value}>
        <DetailsAccordion />
      </ProcessingCtx.Provider>
    );

    // Top label
    expect(screen.getByText(/Details/i)).toBeInTheDocument();

    // ---------------- Inputs (anchor by "Weight (w):") ----------------
    const inputsBox = getSectionByTextAnchor(/Weight \(w\):/i);

    const weeklyRow = within(inputsBox).getByText(/Weekly Points:/i).parentElement;
    expect(weeklyRow).toHaveTextContent(/92\s*pts/i);

    const dailyRow = within(inputsBox).getByText(/Daily Points:/i).parentElement;
    expect(dailyRow).toHaveTextContent(/70\s*pts/i);

    const weightRow = within(inputsBox).getByText(/Weight \(w\):/i).parentElement;
    // Your UI prints "Weight (w): 0.60" (not "w = 0.60")
    expect(weightRow).toHaveTextContent(/Weight \(w\):\s*0\.60/i);
    // If complement is rendered, verify it; otherwise don’t fail
    const weightText = weightRow.textContent || "";
    if (/\(1\s*−\s*w\)/i.test(weightText)) {
      expect(weightText).toMatch(/\(1\s*−\s*w\)\s*=\s*0\.40/i);
    }

    // ---------------- Equation (anchor by "Formula:") -------------------
    const eqBox = getSectionByTextAnchor(/Formula:/i);
    expect(eqBox).toHaveTextContent(/What this shows:/i);
    expect(eqBox).toHaveTextContent(/This run:/i);

    // Text is split across spans; assert on container text
    expect(eqBox).toHaveTextContent(/0\.60\s*×\s*92/i);
    expect(eqBox).toHaveTextContent(/0\.40\s*×\s*70/i);
    // UI displays "= 88" for this run
    expect(eqBox).toHaveTextContent(/=\s*88\b/i);

    // ---------------- Stats Filter (by label or dates fallback) ---------
    const statsFilterAnchor =
      screen.queryByText(/Stats Filter:/i) ??
      screen.getByText(/2025-09-28/i);
    const statsFilterBox = statsFilterAnchor.closest("div");
    expect(statsFilterBox).toBeTruthy();
    expect(within(statsFilterBox).getByText(/2025-09-28/i)).toBeInTheDocument();
    expect(within(statsFilterBox).getByText(/2025-10-04/i)).toBeInTheDocument();

    // ---------------- Weekly Stats used ---------------------------------
    const weeklyStatsBox = getSectionByTextAnchor(/Weekly Stats used:/i);
    expect(weeklyStatsBox).toHaveTextContent(/ave\s*=\s*100/i);
    expect(weeklyStatsBox).toHaveTextContent(/std\s*=\s*20/i);

    // ---------------- Nested accordions (stubbed) -----------------------
    expect(screen.getByTestId("week-accordion")).toBeInTheDocument();
    expect(screen.getByTestId("daily-accordion")).toBeInTheDocument();
    expect(screen.getByTestId("z-accordion")).toBeInTheDocument();
    expect(screen.getByTestId("points-accordion")).toBeInTheDocument();
  });

  it("handles missing/unknown values gracefully (blanks/— where appropriate) and still renders nested accordions", () => {
    const value = {
      thresholds: { /* defaults to 0.5 weight in UI if not present */ },
      stats: { week: { ave: NaN, std: 0 } }, // invalid → UI shows ave —, std 0
      filterDates: {}, // no dates → fallback
      feasibility: {
        status: "unknown",
        score: NaN,
        week_eval: { status: "unknown", score: NaN },
        days_eval: { status: "unknown", score: NaN },
      },
    };

    render(
      <ProcessingCtx.Provider value={value}>
        <DetailsAccordion />
      </ProcessingCtx.Provider>
    );

    // Inputs (anchor by "Weight (w):")
    const inputsBox = getSectionByTextAnchor(/Weight \(w\):/i);

    // Weekly/Daily should not show any numbers in this state (blank/—)
    const weeklyRow = within(inputsBox).getByText(/Weekly Points:/i).parentElement;
    expect(weeklyRow).not.toHaveTextContent(/\d/);

    const dailyRow = within(inputsBox).getByText(/Daily Points:/i).parentElement;
    expect(dailyRow).not.toHaveTextContent(/\d/);

    // Weight defaults to 0.50
    const weightRow = within(inputsBox).getByText(/Weight \(w\):/i).parentElement;
    expect(weightRow).toHaveTextContent(/Weight \(w\):\s*0\.50/i);
    const weightText = weightRow.textContent || "";
    if (/\(1\s*−\s*w\)/i.test(weightText)) {
      expect(weightText).toMatch(/\(1\s*−\s*w\)\s*=\s*0\.50/i);
    }

    // Stats Filter: either shows a label with a fallback message, or nothing;
    // if message present, ensure no yyyy-mm-dd appears in that box.
    const statsFilterAnchor =
      screen.queryByText(/Stats Filter:/i) ??
      screen.queryByText(/No filter dates were found\./i) ??
      null;

    if (statsFilterAnchor) {
      const box = statsFilterAnchor.closest("div");
      expect(box).toBeTruthy();
      const text = box.textContent || "";
      expect(text).not.toMatch(/\b20\d{2}-\d{2}-\d{2}\b/);
    } else {
      expect(screen.queryByText(/\b20\d{2}-\d{2}-\d{2}\b/)).toBeNull();
    }

    // Weekly Stats used: ave is an em-dash; std can be 0
    const weeklyStatsBox = getSectionByTextAnchor(/Weekly Stats used:/i);
    expect(weeklyStatsBox).toHaveTextContent(/ave\s*=\s*—\s*mins/i);
    expect(weeklyStatsBox).toHaveTextContent(/std\s*=\s*0\s*mins/i);

    // Nested accordions still render
    expect(screen.getByTestId("week-accordion")).toBeInTheDocument();
    expect(screen.getByTestId("daily-accordion")).toBeInTheDocument();
    expect(screen.getByTestId("z-accordion")).toBeInTheDocument();
    expect(screen.getByTestId("points-accordion")).toBeInTheDocument();
  });
});
