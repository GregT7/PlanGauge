import { describe, it, expect, vi } from "vitest";
import isSameDay from "@/utils/isSameDay";

// mock the dependency
vi.mock("@/utils/toLocalMidnight", () => ({
  default: (date) => {
    // simulate normalizing to local midnight
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  },
}));

describe("isSameDay", () => {
  it("returns true for two identical date objects", () => {
    const date = new Date("2025-06-16T15:45:00");
    expect(isSameDay(date, new Date(date))).toBe(true);
  });

  it("returns true for different times on the same calendar day", () => {
    const morning = new Date("2025-06-16T08:00:00");
    const night = new Date("2025-06-16T23:59:59");
    expect(isSameDay(morning, night)).toBe(true);
  });

  it("returns false for different calendar days", () => {
    const d1 = new Date("2025-06-16T23:59:59");
    const d2 = new Date("2025-06-17T00:00:00");
    expect(isSameDay(d1, d2)).toBe(false);
  });

  it("returns false when month differs", () => {
    const d1 = new Date("2025-06-30T12:00:00");
    const d2 = new Date("2025-07-01T00:00:00");
    expect(isSameDay(d1, d2)).toBe(false);
  });

  it("returns false when year differs", () => {
    const d1 = new Date("2025-12-31T23:59:59");
    const d2 = new Date("2026-01-01T00:00:00");
    expect(isSameDay(d1, d2)).toBe(false);
  });

  it("handles string input correctly", () => {
    const d1 = "2025-06-16T12:00:00";
    const d2 = "2025-06-16T00:01:00";
    expect(isSameDay(d1, d2)).toBe(true);
  });

  it("handles edge cases gracefully", () => {
    expect(isSameDay(null, new Date())).toBe(false)
    expect(isSameDay(new Date(), undefined)).toBe(false)
  });
});
