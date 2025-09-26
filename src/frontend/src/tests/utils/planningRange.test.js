// planningRange.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const importModule = async () => {
  // re-import the module so it re-reads import.meta.env each time
  vi.resetModules();
  return await import("@/utils/planningRange"); // <-- adjust if needed
};

beforeEach(() => {
  // ensure a clean slate for env stubs between tests
  vi.unstubAllEnvs?.();
});

afterEach(() => {
  vi.unstubAllEnvs?.();
});

describe("planningRange exports", () => {
  it("uses env variables when provided", async () => {
    vi.stubEnv("VITE_DEFAULT_PLAN_START", "2024-01-02");
    vi.stubEnv("VITE_DEFAULT_PLAN_END", "2024-02-03");

    const { DEFAULT_PLAN_START, DEFAULT_PLAN_END } = await importModule();

    expect(DEFAULT_PLAN_START).toBe("2024-01-02");
    expect(DEFAULT_PLAN_END).toBe("2024-02-03");
  });

  it("falls back to defaults when env variables are undefined", async () => {
    // Make sure they are not defined
    vi.unstubAllEnvs();

    const { DEFAULT_PLAN_START, DEFAULT_PLAN_END } = await importModule();

    expect(DEFAULT_PLAN_START).toBe("2025-06-01");
    expect(DEFAULT_PLAN_END).toBe("2025-06-30");
  });

  it("does NOT fall back when env variables are empty strings (nullish coalescing)", async () => {
    // empty string is not null/undefined, so it should be used as-is
    vi.stubEnv("VITE_DEFAULT_PLAN_START", "");
    vi.stubEnv("VITE_DEFAULT_PLAN_END", "");

    const { DEFAULT_PLAN_START, DEFAULT_PLAN_END } = await importModule();

    expect(DEFAULT_PLAN_START).toBe("");
    expect(DEFAULT_PLAN_END).toBe("");
  });
});
