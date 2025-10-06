import { describe, it, expect, vi, beforeEach } from "vitest";
import validateCardData from "@/utils/validateCardData";

// 🧩 Mock toLocalMidnight
vi.mock("@/utils/toLocalMidnight", () => ({
  default: vi.fn((date) => {
    if (date === "invalid-date") return new Date("invalid");
    return new Date(date);
  }),
}));

import toLocalMidnight from "@/utils/toLocalMidnight";

describe("validateCardData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const baseValidCard = {
    name: "Monday",
    ave: 90,
    std: 35,
    sum: 100,
    date: "2025-06-16T00:00:00Z",
    status: "neutral",
  };

  it("returns true for fully valid card data", () => {
    const result = validateCardData(baseValidCard);
    expect(result).toBe(true);
  });

  it("returns false if cardData is not an object", () => {
    expect(validateCardData(null)).toBe(false);
    expect(validateCardData(undefined)).toBe(false);
    expect(validateCardData("string")).toBe(false);
    expect(validateCardData(123)).toBe(false);
  });

  it("validates day names case-insensitively", () => {
    const card = { ...baseValidCard, name: "tuesday" };
    expect(validateCardData(card)).toBe(true);
  });

  it("returns false for invalid day names", () => {
    const card = { ...baseValidCard, name: "Funday" };
    expect(validateCardData(card)).toBe(false);
  });

  it("returns false when ave is not a number", () => {
    const card = { ...baseValidCard, ave: "90" };
    expect(validateCardData(card)).toBe(false);
  });

  it("returns false when std is not a number", () => {
    const card = { ...baseValidCard, std: "NaN" };
    expect(validateCardData(card)).toBe(false);
  });

  it("returns false when sum is not a number", () => {
    const card = { ...baseValidCard, sum: "total" };
    expect(validateCardData(card)).toBe(false);
  });

  it("returns false for invalid date strings", () => {
    const card = { ...baseValidCard, date: "invalid-date" };
    expect(validateCardData(card)).toBe(false);
  });

  it("returns true for valid status (case-insensitive)", () => {
    for (const s of ["neutral", "good", "moderate", "poor", "unknown"]) {
      expect(validateCardData({ ...baseValidCard, status: s.toUpperCase() })).toBe(true);
    }
  });

  it("returns false for invalid status values", () => {
    const card = { ...baseValidCard, status: "amazing" };
    expect(validateCardData(card)).toBe(false);
  });

  it("returns false when multiple fields are invalid", () => {
    const card = { name: "BadDay", ave: "oops", std: null, sum: "NaN", date: "invalid-date", status: "none" };
    expect(validateCardData(card)).toBe(false);
  });

  it("calls toLocalMidnight exactly once per validation", () => {
    validateCardData(baseValidCard);
    expect(toLocalMidnight).toHaveBeenCalledTimes(1);
    expect(toLocalMidnight).toHaveBeenCalledWith(baseValidCard.date);
  });
});
