import { describe, it, expect, vi, beforeEach } from "vitest";
import updateCardStats from "@/utils/updateCardStats";

// 🧩 Mock toLocalMidnight
vi.mock("@/utils/toLocalMidnight", () => ({
  default: vi.fn((date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }),
}));

import toLocalMidnight from "@/utils/toLocalMidnight";

describe("updateCardStats", () => {
  let cardData;

  beforeEach(() => {
    vi.clearAllMocks();
    cardData = [
      { name: "Monday",    date: new Date(2025, 5, 16), ave: -1, std: -1 },
      { name: "Tuesday",   date: new Date(2025, 5, 17), ave: -1, std: -1 },
      { name: "Wednesday", date: new Date(2025, 5, 18), ave: -1, std: -1 },
      { name: "Thursday",  date: new Date(2025, 5, 19), ave: -1, std: -1 },
      { name: "Friday",    date: new Date(2025, 5, 20), ave: -1, std: -1 },
      { name: "Saturday",  date: new Date(2025, 5, 21), ave: -1, std: -1 },
      { name: "Sunday",    date: new Date(2025, 5, 22), ave: -1, std: -1 },
    ];
  });

  it("returns false when cardData is not an array", () => {
    expect(updateCardStats(null, {})).toBe(false);
    expect(updateCardStats({}, {})).toBe(false);
  });

  it("returns false when stats is missing or null", () => {
    expect(updateCardStats(cardData, null)).toBe(false);
    expect(updateCardStats(cardData, undefined)).toBe(false);
  });

  it("updates ave and std values correctly for each weekday", () => {
    const stats = {
      ave: { Mon: 10, Tue: 20, Wed: 30, Thu: 40, Fri: 50, Sat: 60, Sun: 70 },
      std: { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 },
    };

    const result = updateCardStats(cardData, stats);
    expect(result).toBe(true);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    cardData.forEach((card, i) => {
      expect(card.ave).toBe(stats.ave[days[i]]);
      expect(card.std).toBe(stats.std[days[i]]);
    });
  });

  it("skips updating ave/std for missing keys", () => {
    const stats = { ave: { Mon: 10, Wed: 30 }, std: { Mon: 1 } };

    updateCardStats(cardData, stats);
    expect(cardData[0].ave).toBe(10);
    expect(cardData[0].std).toBe(1);
    expect(cardData[1].ave).toBe(-1); // missing key
    expect(cardData[2].ave).toBe(30);
  });

  it("still returns true even if some properties are missing in stats", () => {
    const stats = { ave: { Mon: 99 } };
    expect(updateCardStats(cardData, stats)).toBe(true);
  });

  it("handles invalid date gracefully", () => {
    const badCardData = [{ name: "Bad", date: "invalid" }];
    const stats = { ave: { Mon: 10 }, std: { Mon: 2 } };

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = updateCardStats(badCardData, stats);

    expect(result).toBe(true); // returns true because it catches internally
    expect(toLocalMidnight).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("returns false and logs error when unexpected exception occurs", () => {
    toLocalMidnight.mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const result = updateCardStats(cardData, {
      ave: { Mon: 1 },
      std: { Mon: 2 },
    });

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Updating stat card data failed: "),
      expect.any(String)
    );
    consoleSpy.mockRestore();
  });
});
