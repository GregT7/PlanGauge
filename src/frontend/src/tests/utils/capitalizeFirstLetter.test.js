import { describe, it, expect } from "vitest";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a lowercase word", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("should capitalize the first letter and leave the rest unchanged", () => {
    expect(capitalizeFirstLetter("hELLO")).toBe("HELLO");
  });

  it("should return the same string if it already starts with an uppercase letter", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });

  it("should handle an empty string", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should return non-string input unchanged", () => {
    expect(capitalizeFirstLetter(null)).toBe(null);
    expect(capitalizeFirstLetter(undefined)).toBe(undefined);
    expect(capitalizeFirstLetter(123)).toBe(123);
    expect(capitalizeFirstLetter({})).toEqual({});
  });

  it("should capitalize only the first character of multi-word strings", () => {
    expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
  });

  it("should handle single-character strings", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
    expect(capitalizeFirstLetter("Z")).toBe("Z");
  });
});
