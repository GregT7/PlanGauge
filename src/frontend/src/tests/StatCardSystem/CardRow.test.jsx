import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

// Mock the child component exactly as imported in CardRow
vi.mock("@/components/StatCardSystem/StatCard", () => {
  return {
    default: ({ cardData, status }) => (
      <div
        data-testid="statcard"
        data-name={cardData?.name ?? ""}
        data-status={status ?? ""}
      >
        MockStatCard
      </div>
    ),
  };
});

// Import after mocks so the mock is applied
import CardRow from "@/components/StatCardSystem/CardRow";

describe("CardRow", () => {
  it("returns null when cardData is not an array", () => {
    const { container: c1 } = render(
      <CardRow daysRegex={/.*/} gridClassName="grid grid-cols-7" cardData={null} />
    );
    expect(c1.firstChild).toBeNull();

    const { container: c2 } = render(
      <CardRow daysRegex={/.*/} gridClassName="grid grid-cols-7" cardData={undefined} />
    );
    expect(c2.firstChild).toBeNull();
  });

  it("applies gridClassName and includes gap-4 on the outer wrapper", () => {
    const sample = [{ name: "Monday", date: "2025-06-16", status: "good" }];
    const { container } = render(
      <CardRow
        daysRegex={/Mon/}
        gridClassName="grid grid-cols-7 place-items-center"
        cardData={sample}
      />
    );

    const outer = container.firstChild;
    expect(outer).toBeTruthy();
    expect(outer.className).toContain("grid");
    expect(outer.className).toContain("grid-cols-7");
    expect(outer.className).toContain("place-items-center");
    expect(outer.className).toContain("gap-4"); // appended by component
  });

  it("filters cards by daysRegex and renders one StatCard per match", () => {
    const data = [
      { name: "Monday",    date: "2025-06-16", status: "good" },
      { name: "Tuesday",   date: "2025-06-17", status: "poor" },
      { name: "Wednesday", date: "2025-06-18", status: "moderate" },
      { name: "Friday",    date: "2025-06-20", status: "good" },
    ];

    // Matches only Monday and Wednesday
    render(
      <CardRow
        daysRegex={/(Mon|Wed)/i}
        gridClassName="grid grid-cols-4"
        cardData={data}
      />
    );

    const cards = screen.getAllByTestId("statcard");
    expect(cards).toHaveLength(2);

    // Ensure the correct items were rendered
    const names = cards.map((n) => n.getAttribute("data-name"));
    expect(names).toEqual(expect.arrayContaining(["Monday", "Wednesday"]));
    expect(names).not.toEqual(expect.arrayContaining(["Tuesday", "Friday"]));
  });

  it("passes status and full cardData to StatCard", () => {
    const data = [
      { name: "Monday", date: "2025-06-16", status: "good", extra: 123 },
      { name: "Wednesday", date: "2025-06-18", status: "moderate", extra: 456 },
    ];

    render(
      <CardRow
        daysRegex={/(Mon|Wed)/}
        gridClassName="grid grid-cols-2"
        cardData={data}
      />
    );

    const cards = screen.getAllByTestId("statcard");
    expect(cards).toHaveLength(2);

    // Status is forwarded explicitly
    const statuses = cards.map((n) => n.getAttribute("data-status"));
    expect(statuses).toEqual(expect.arrayContaining(["good", "moderate"]));

    // Name came from cardData prop (sanity check that cardData was passed through)
    const names = cards.map((n) => n.getAttribute("data-name"));
    expect(names).toEqual(expect.arrayContaining(["Monday", "Wednesday"]));
  });

  it("wraps each StatCard with the sizing and centering containers", () => {
    const data = [{ name: "Monday", date: "2025-06-16", status: "good" }];
    render(
      <CardRow daysRegex={/Mon/} gridClassName="grid grid-cols-1" cardData={data} />
    );

    const sc = screen.getByTestId("statcard");

    // Immediate parent should have size classes
    const sizeWrapper = sc.parentElement;
    expect(sizeWrapper).toBeTruthy();
    expect(sizeWrapper.className).toContain("w-44");
    expect(sizeWrapper.className).toContain("h-44");
    expect(sizeWrapper.className).toContain("shrink-0");

    // Grandparent should center the card
    const centerWrapper = sizeWrapper?.parentElement;
    expect(centerWrapper).toBeTruthy();
    expect(centerWrapper.className).toContain("flex");
    expect(centerWrapper.className).toContain("justify-center");
    expect(centerWrapper.className).toContain("items-center");
  });
});
