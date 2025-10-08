import { describe, it, expect, vi, afterEach } from "vitest";
import { genDefaultCardData, genDefaultCardsData, genDaysOfCurrentWeek } from "@/utils/genDefaultCardData";



// helper: Y-M-D tuple so we don't care about time-of-day
const ymd = (d) => [d.getFullYear(), d.getMonth(), d.getDate()];
const makeLocalDate = (y, m, d) => new Date(y, m - 1, d);

afterEach(() => {
  vi.useRealTimers();
});

describe("genDefaultCardData", () => {
  it("returns an object with expected default structure", () => {
    const date = makeLocalDate(2025, 6, 16);
    const result = genDefaultCardData(date);

    expect(result).toHaveProperty("name", "Monday");
    expect(result).toHaveProperty("ave", -1);
    expect(result).toHaveProperty("std", -1);
    expect(result).toHaveProperty("sum", -1);
    expect(result).toHaveProperty("status", "neutral");
    expect(result.date).toBeInstanceOf(Date);
  });

  it("computes correct day names for known dates (local time safe)", () => {
    expect(genDefaultCardData(makeLocalDate(2025, 6, 18)).name).toBe("Wednesday");
    expect(genDefaultCardData(makeLocalDate(2025, 6, 22)).name).toBe("Sunday");
  });

  it("defaults to current date when no argument is passed", () => {
    const result = genDefaultCardData();
    expect(result).toHaveProperty("name");
    expect(typeof result.name).toBe("string");
    expect(result.date).toBeInstanceOf(Date);
  });
});

describe("genDefaultCardsData", () => {
  it("returns an array of 7 card objects", () => {
    const result = genDefaultCardsData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(7);
  });

  it("each object has the correct default keys", () => {
    const result = genDefaultCardsData();
    result.forEach((card) => {
      expect(card).toHaveProperty("name");
      expect(card).toHaveProperty("ave", -1);
      expect(card).toHaveProperty("std", -1);
      expect(card).toHaveProperty("sum", -1);
      expect(card).toHaveProperty("status", "neutral");
      expect(card.date).toBeInstanceOf(Date);
    });
  });

  it("day names are ordered Monday through Sunday", () => {
    const result = genDefaultCardsData();
    const names = result.map((c) => c.name);
    expect(names).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);
  });

  it("dates are sequential and increasing", () => {
    const result = genDefaultCardsData();
    for (let i = 1; i < result.length; i++) {
      expect(result[i].date.getTime()).toBeGreaterThan(result[i - 1].date.getTime());
    }
  });
});

describe("genDaysOfCurrentWeek", () => {
  it("returns 7 dates ordered Monday → Sunday for a Wednesday reference", () => {
    // Wed, June 18, 2025
    vi.useFakeTimers();
    vi.setSystemTime(makeLocalDate(2025, 6, 18));

    const days = genDaysOfCurrentWeek();
    expect(Array.isArray(days)).toBe(true);
    expect(days).toHaveLength(7);

    // Monday 16 → Sunday 22 (June 2025)
    const expected = [
      makeLocalDate(2025, 6, 16),
      makeLocalDate(2025, 6, 17),
      makeLocalDate(2025, 6, 18),
      makeLocalDate(2025, 6, 19),
      makeLocalDate(2025, 6, 20),
      makeLocalDate(2025, 6, 21),
      makeLocalDate(2025, 6, 22),
    ];
    expect(days.map(ymd)).toEqual(expected.map(ymd));

    // also verify strictly increasing
    for (let i = 1; i < days.length; i++) {
      expect(days[i].getTime()).toBeGreaterThan(days[i - 1].getTime());
    }

    // and Monday (1) to Sunday (0)
    expect(days[0].getDay()).toBe(1);
    expect(days[6].getDay()).toBe(0);
  });

  it("handles Sunday correctly (still starts on Monday of that week)", () => {
    // Sun, June 22, 2025
    vi.useFakeTimers();
    vi.setSystemTime(makeLocalDate(2025, 6, 22));

    const days = genDaysOfCurrentWeek();
    const expected = [
      makeLocalDate(2025, 6, 16),
      makeLocalDate(2025, 6, 17),
      makeLocalDate(2025, 6, 18),
      makeLocalDate(2025, 6, 19),
      makeLocalDate(2025, 6, 20),
      makeLocalDate(2025, 6, 21),
      makeLocalDate(2025, 6, 22),
    ];
    expect(days.map(ymd)).toEqual(expected.map(ymd));
    expect(days[0].getDay()).toBe(1);
    expect(days[6].getDay()).toBe(0);
  });

  it("handles Monday correctly (week still begins that same day)", () => {
    // Mon, June 16, 2025
    vi.useFakeTimers();
    vi.setSystemTime(makeLocalDate(2025, 6, 16));

    const days = genDaysOfCurrentWeek();
    const expected = [
      makeLocalDate(2025, 6, 16),
      makeLocalDate(2025, 6, 17),
      makeLocalDate(2025, 6, 18),
      makeLocalDate(2025, 6, 19),
      makeLocalDate(2025, 6, 20),
      makeLocalDate(2025, 6, 21),
      makeLocalDate(2025, 6, 22),
    ];
    expect(days.map(ymd)).toEqual(expected.map(ymd));
    expect(days[0].getDay()).toBe(1);
  });

  it("works across year boundaries (e.g., last week of December)", () => {
    // Wed, Dec 31, 2025
    vi.useFakeTimers();
    vi.setSystemTime(makeLocalDate(2025, 12, 31));

    const days = genDaysOfCurrentWeek();
    const expected = [
      makeLocalDate(2025, 12, 29), // Mon
      makeLocalDate(2025, 12, 30), // Tue
      makeLocalDate(2025, 12, 31), // Wed
      makeLocalDate(2026,  1,  1), // Thu (next year)
      makeLocalDate(2026,  1,  2), // Fri
      makeLocalDate(2026,  1,  3), // Sat
      makeLocalDate(2026,  1,  4), // Sun
    ];
    expect(days.map(ymd)).toEqual(expected.map(ymd));
    expect(days[0].getDay()).toBe(1);
    expect(days[6].getDay()).toBe(0);
  });

  it("returns unique Date instances (no shared object references)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(makeLocalDate(2025, 6, 18));

    const days = genDaysOfCurrentWeek();
    const times = new Set(days.map((d) => d.getTime()));
    expect(times.size).toBe(7);
  });
});