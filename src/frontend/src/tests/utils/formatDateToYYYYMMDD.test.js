// formatDateToYYYYMMDD.test.js
import { describe, it, expect } from "vitest";
import formatDateToYYYYMMDD from "@/utils/formatDateToYYYYMMDD";

describe("formatDateToYYYYMMDD", () => {
  it("returns empty string for null or undefined", () => {
    expect(formatDateToYYYYMMDD(null)).toBe("");
    expect(formatDateToYYYYMMDD(undefined)).toBe("");
  });

  it("returns string unchanged if already in YYYY-MM-DD format", () => {
    expect(formatDateToYYYYMMDD("2025-09-24")).toBe("2025-09-24");
  });

  it("parses valid date string and formats correctly", () => {
    expect(formatDateToYYYYMMDD("2025-09-24T12:34:56Z")).toBe("2025-09-24");
    expect(formatDateToYYYYMMDD("September 24, 2025")).toBe("2025-09-24");
  });

  it("returns empty string for unparseable string", () => {
    expect(formatDateToYYYYMMDD("not-a-date")).toBe("");
    expect(formatDateToYYYYMMDD("20250924")).toBe("");
  });

  it("formats a Date object", () => {
    const d = new Date("2025-09-24T00:00:00Z");
    console.log(d)
    expect(formatDateToYYYYMMDD(d)).toBe("2025-09-24");
  });

  it("returns empty string for non-date objects", () => {
    expect(formatDateToYYYYMMDD(12345)).toBe("");
    expect(formatDateToYYYYMMDD({})).toBe("");
    expect(formatDateToYYYYMMDD([])).toBe("");
  });

  it("pads month and day with leading zeroes", () => {
    const d = new Date("2025-01-05T00:00:00Z");
    expect(formatDateToYYYYMMDD(d)).toBe("2025-01-05");
  });
});