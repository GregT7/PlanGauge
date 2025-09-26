import { describe, it, expect } from "vitest";
import verifyStatsData from "@/utils/verifyStatsData";

describe("verifyStatsData", () => {
  it("accepts valid structure", () => {
    const good = {
      week: { ave: 60, std: 12.3 },
      day: {
        ave: { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 },
        std: { Mon: 1, Tue: 1, Wed: 1, Thu: 1, Fri: 1, Sat: 1, Sun: 1 }
      }
    };
    expect(verifyStatsData(good)).toBe(true);
  });

  it("rejects strings/NaN/missing keys", () => {
    const bad = {
      week: { ave: "60", std: NaN },
      day: { ave: { Mon: 1 }, std: { Mon: 1, Tue: 1, Wed: 1, Thu: 1, Fri: 1, Sat: 1, Sun: 1 } }
    };
    expect(verifyStatsData(bad)).toBe(false);
  });
});
