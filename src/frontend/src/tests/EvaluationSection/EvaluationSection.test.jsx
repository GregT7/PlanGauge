// src/tests/EvaluationSection/EvaluationSection.test.jsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

/* ===================== HOIST-SAFE MOCKS (TOP) ===================== */
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...p }) => (
    <section aria-label="evaluation-card" {...p}>
      <article role="article">{children}</article>
    </section>
  ),
  CardContent: ({ children, ...p }) => <div {...p}>{children}</div>,
}));

vi.mock("@/utils/styleData.json", () => ({
  default: {
    neutral:  { text: "text-zinc-500",   border: "border-zinc-500" },
    good:     { text: "text-emerald-600", border: "border-emerald-600" },
    moderate: { text: "text-amber-600",   border: "border-amber-600" },
    poor:     { text: "text-rose-600",    border: "border-rose-600" },
    unknown:  { text: "text-red-600",     border: "border-red-600" },
  },
}), { virtual: true });

vi.mock("@/utils/determineStatusStyle", () => ({
  __esModule: true,
  default: (status, kind) => `${kind}-style-for-${status ?? "unknown"}`,
}));

vi.mock("@/contexts/ProcessingContext", () => {
  const React = require("react");
  return { processingContext: React.createContext({}) };
});

vi.mock("@/components/EvaluationSection/DetailsAccordion.jsx", () => ({
  default: () => <div data-testid="details-accordion">DetailsAccordion</div>,
}));
/* ================================================================== */

import EvaluationSection from "@/components/EvaluationSection/EvaluationSection.jsx";
import { processingContext as ProcessingCtx } from "@/contexts/ProcessingContext";

describe("EvaluationSection", () => {
  it("renders title, overall points (colored), and weekly/daily rows with colored numeric points", () => {
    const processing = {
      feasibility: {
        status: "good",
        score: 90,
        week_eval: { status: "good",     score: 95 },
        days_eval: { status: "moderate", score: 70 },
      },
    };

    render(
      <ProcessingCtx.Provider value={processing}>
        <EvaluationSection />
      </ProcessingCtx.Provider>
    );

    expect(document.querySelector(".border-style-for-good")).toBeTruthy();
    expect(screen.getByText(/Evaluation/i)).toBeInTheDocument();

    const overallPts = screen.getByText(/\(\s*90\s*pts\s*\)/i);
    expect(overallPts).toHaveClass("text-emerald-600");

    const weeklyLabel = screen.getByText(/Weekly:/i);
    const weeklyRow   = weeklyLabel.closest("*")?.parentElement || weeklyLabel.closest("*");
    expect(weeklyRow).toBeTruthy();
    const weeklyPts = within(weeklyRow).getByText(/\b95\s*pts\b/i);
    expect(weeklyPts).toHaveClass("text-emerald-600");

    const dailyLabel = screen.getByText(/Daily:/i);
    const dailyRow   = dailyLabel.closest("*")?.parentElement || dailyLabel.closest("*");
    expect(dailyRow).toBeTruthy();
    const dailyPts = within(dailyRow).getByText(/\b70\s*pts\b/i);
    expect(dailyPts).toHaveClass("text-amber-600");

    expect(screen.getByText(/blends weekly and daily points/i)).toBeInTheDocument();
    expect(screen.getByTestId("details-accordion")).toBeInTheDocument();
  });

  it("when values are unknown: hides overall numeric points and renders weekly/daily rows without any numeric points", () => {
    const processing = {
      feasibility: {
        status: "unknown",
        score: NaN,
        week_eval: { status: "unknown", score: NaN },
        days_eval: { status: "unknown", score: NaN },
      },
    };

    render(
      <ProcessingCtx.Provider value={processing}>
        <EvaluationSection />
      </ProcessingCtx.Provider>
    );

    expect(document.querySelector(".border-style-for-unknown")).toBeTruthy();
    expect(screen.getByText(/Evaluation/i)).toBeInTheDocument();
    expect(screen.queryByText(/\(\s*\d+\s*pts\s*\)/i)).toBeNull();

    const weeklyLabel = screen.getByText(/Weekly:/i);
    const weeklyRow   = weeklyLabel.closest("*")?.parentElement || weeklyLabel.closest("*");
    expect(weeklyRow).toBeTruthy();
    expect(within(weeklyRow).queryByText(/\b\d+\s*pts\b/i)).toBeNull();

    const dailyLabel = screen.getByText(/Daily:/i);
    const dailyRow   = dailyLabel.closest("*")?.parentElement || dailyLabel.closest("*");
    expect(dailyRow).toBeTruthy();
    expect(within(dailyRow).queryByText(/\b\d+\s*pts\b/i)).toBeNull();

    expect(screen.getByTestId("details-accordion")).toBeInTheDocument();
  });
});
