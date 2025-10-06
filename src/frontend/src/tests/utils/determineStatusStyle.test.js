import { describe, it, expect } from "vitest";
import determineStatusStyle from "@/utils/determineStatusStyle";
import styleData from "@/utils/styleData.json";

describe("determineStatusStyle (integration with styleData.json)", () => {
  it("returns the exact class from styleData for valid status/type pairs", () => {
    expect(determineStatusStyle("good", "base")).toBe(styleData.good.base);
    expect(determineStatusStyle("good", "text")).toBe(styleData.good.text);

    expect(determineStatusStyle("moderate", "border")).toBe(styleData.moderate.border);
    expect(determineStatusStyle("poor", "hover")).toBe(styleData.poor.hover);

    // Include 'neutral' since it's present in the data file
    expect(determineStatusStyle("neutral", "base")).toBe(styleData.neutral.base);
  });

  it("falls back to styleData.unknown.base for an invalid status", () => {
    expect(determineStatusStyle("not-a-status", "base")).toBe(styleData.unknown.base);
  });

  it("falls back to styleData.unknown.base for an invalid type on a valid status", () => {
    expect(determineStatusStyle("good", "nonexistent")).toBe(styleData.unknown.base);
  });

  it("falls back to styleData.unknown.base for undefined args", () => {
    expect(determineStatusStyle(undefined, "base")).toBe(styleData.unknown.base);
    expect(determineStatusStyle("good", undefined)).toBe(styleData.unknown.base);
  });

  it("stays in sync with styleData.json: every defined type returns the same value as the file", () => {
    // For each status in the file, assert every defined type maps 1:1
    for (const [status, mapping] of Object.entries(styleData)) {
      for (const [type, expected] of Object.entries(mapping)) {
        expect(determineStatusStyle(status, type)).toBe(expected);
      }
    }
  });

  it("unknown handling is consistent with the file contents", () => {
    const fallback = styleData.unknown.base;
    expect(determineStatusStyle("good", "nope")).toBe(fallback);
    expect(determineStatusStyle("nope", "base")).toBe(fallback);
  });
});
