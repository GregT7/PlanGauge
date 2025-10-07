// src/tests/StatCardSystem/StatCardSystem.test.jsx
import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("@/components/StatCardSystem/StatCard", () => {
  // Lightweight stub so StatCard's own internals don't explode these tests
  return {
    default: ({ cardData }) => (
      <div data-testid="StatCard">
        <span>{cardData?.name}</span>
        {cardData?.status ? <em>{cardData.status}</em> : null}
      </div>
    ),
  };
});

import StatCardSystem from "@/components/StatCardSystem/StatCardSystem";
import { processingContext } from "@/contexts/ProcessingContext";

function withProcessingProvider(ui, value) {
  return render(
    <processingContext.Provider value={value}>{ui}</processingContext.Provider>
  );
}

const baseCardData = [
  { name: "Monday",    ave: 60, std: 10, sum: 0,   status: "good",    date: new Date() },
  { name: "Tuesday",   ave: 30, std:  5, sum: 0,   status: "moderate",date: new Date() },
  { name: "Wednesday", ave: 50, std: 15, sum: 0,   status: "good",    date: new Date() },
  { name: "Thursday",  ave: 50, std: 15, sum: 0,   status: "moderate",date: new Date() },
  { name: "Friday",    ave: 50, std: 15, sum: 0,   status: "poor",    date: new Date() },
  { name: "Saturday",  ave: 50, std: 15, sum: 0,   status: "good",    date: new Date() },
  { name: "Sunday",    ave: 50, std: 15, sum: 0,   status: "moderate",date: new Date() },
];

const baseStatusCount = { good: 3, moderate: 3, poor: 1, unknown: 0 };

const baseFeasibility = {
  score: 72,
  status: "moderate", // affects border style via determineStatusStyle
  week_eval: { score: 60, status: "moderate" },
  days_eval: { score: 70, status: "moderate" },
};

describe("StatCardSystem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (overrides = {}) => {
    const value = {
      cardData: overrides.cardData ?? baseCardData,
      statusCount: overrides.statusCount ?? baseStatusCount,
      feasibility: overrides.feasibility ?? baseFeasibility,
      thresholds: overrides.thresholds ?? {},
      filterDates: overrides.filterDates ?? { start: new Date(), end: new Date() },
    };
    return withProcessingProvider(<StatCardSystem />, value);
  };

  it("renders the StatCardSystem component", () => {
    setup();
    expect(screen.getByText(/Stat Card System/i)).toBeInTheDocument();
  });

  it("passes a snapshot test", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("renders StatCards for days matching regex (weekday and weekend rows)", () => {
    setup();
    const cards = screen.getAllByTestId("StatCard");
    // Monday..Thursday (4) + Friday..Sunday (3) = 7
    expect(cards.length).toBe(7);
  });

  it("renders the StatusCounter", () => {
    setup();
    expect(screen.getByTestId("StatusCounter")).toBeInTheDocument();
  });

  it("renders correct count bubbles in StatusCounter", () => {
    setup();
    const bubbles = screen.getAllByTestId("circle-div");
    expect(bubbles.length).toBe(3);
    expect(bubbles[0].className).toMatch(/bg-emerald-500/);
    expect(bubbles[1].className).toMatch(/bg-amber-500/);
    expect(bubbles[2].className).toMatch(/bg-rose-500/);
  });

  it('handles "no tasks" gracefully by showing cards and the counter', () => {
    // Simulate unknown statuses everywhere but still a valid shape
    const emptyCards = baseCardData.map((c) => ({ ...c, sum: 0, status: "unknown" }));
    setup({
      cardData: emptyCards,
      statusCount: { good: 0, moderate: 0, poor: 0, unknown: 7 },
      feasibility: { score: -1, status: "unknown", week_eval: null, days_eval: null },
    });

    const cards = screen.getAllByTestId("StatCard");
    expect(cards.length).toBe(7);
    expect(screen.getByTestId("StatusCounter")).toBeInTheDocument();
  });

  it("surface-level z-status is visible via mocked StatCards content", () => {
    // Force a 'poor' somewhere and assert text content has 'poor'
    const cards = baseCardData.map((c) =>
      c.name === "Friday" ? { ...c, status: "poor" } : c
    );
    setup({ cardData: cards });

    const nodes = screen.getAllByTestId("StatCard");
    const hasPoor = nodes.some((n) =>
      n.textContent.toLowerCase().includes("poor")
    );
    expect(hasPoor).toBe(true);
  });
});

// --- append below your existing tests in StatCardSystem.test.jsx ---

vi.mock("@/utils/determineStatusStyle", () => {
  return {
    default: vi.fn((status, kind) => `mock-${kind}-${status ?? "unknown"}`),
  };
});

// IMPORTANT: this import must come *after* the vi.mock above
import determineStatusStyle from "@/utils/determineStatusStyle";

describe("StatCardSystem – outer border reflects feasibility status", () => {
  const baseCardData = [
    { name: "Mon", ave: 60, std: 10, sum: 0, status: "good", date: new Date() },
  ];
  const baseStatusCount = { good: 1, moderate: 0, poor: 0, unknown: 0 };
  const mkFeas = (status) => ({
    score: status === "unknown" ? -1 : 75,
    status,
    week_eval: { score: 70, status },
    days_eval: { score: 70, status },
  });

  const getRoot = () => {
    const heading = screen.getByRole("heading", { name: /stat card system/i });
    return heading.closest("div");
  };

  it("applies the border class returned by determineStatusStyle for 'good'", () => {
    const { unmount } = withProcessingProvider(
      <StatCardSystem />,
      {
        cardData: baseCardData,
        statusCount: baseStatusCount,
        feasibility: mkFeas("good"),
        thresholds: {},
        filterDates: { start: new Date(), end: new Date() },
      }
    );

    // Called with (status, "border")
    expect(determineStatusStyle).toHaveBeenCalledWith("good", "border");

    const root = getRoot();
    expect(root?.className).toContain("mock-border-good");
    unmount();
  });

  it("applies the border class for 'moderate'", () => {
    const { unmount } = withProcessingProvider(
      <StatCardSystem />,
      {
        cardData: baseCardData,
        statusCount: baseStatusCount,
        feasibility: mkFeas("moderate"),
        thresholds: {},
        filterDates: { start: new Date(), end: new Date() },
      }
    );

    expect(determineStatusStyle).toHaveBeenCalledWith("moderate", "border");
    const root = getRoot();
    expect(root?.className).toContain("mock-border-moderate");
    unmount();
  });

  it("applies the border class for 'poor'", () => {
    const { unmount } = withProcessingProvider(
      <StatCardSystem />,
      {
        cardData: baseCardData,
        statusCount: { good: 0, moderate: 0, poor: 1, unknown: 0 },
        feasibility: mkFeas("poor"),
        thresholds: {},
        filterDates: { start: new Date(), end: new Date() },
      }
    );

    expect(determineStatusStyle).toHaveBeenCalledWith("poor", "border");
    const root = getRoot();
    expect(root?.className).toContain("mock-border-poor");
    unmount();
  });

  it("handles missing/unknown feasibility.status", () => {
    const { unmount } = withProcessingProvider(
      <StatCardSystem />,
      {
        cardData: baseCardData,
        statusCount: { good: 0, moderate: 0, poor: 0, unknown: 1 },
        feasibility: { score: -1, status: undefined, week_eval: null, days_eval: null },
        thresholds: {},
        filterDates: { start: new Date(), end: new Date() },
      }
    );

    expect(determineStatusStyle).toHaveBeenCalledWith(undefined, "border");
    const root = getRoot();
    expect(root?.className).toContain("mock-border-unknown");
    unmount();
  });
});
