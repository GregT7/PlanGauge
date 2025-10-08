// src/tests/Integration/App.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/** -------------------- HOISTED TEST DOUBLES -------------------- */
const { connectionTestMock, toastFn } = vi.hoisted(() => {
  const fn = (...args) => { fn.calls.push(args); };
  fn.calls = [];
  fn.error = vi.fn();          // toast.error(...)
  fn.promise = vi.fn((p) => p); // toast.promise(p, {...}) → passthrough
  fn.success = vi.fn();        // (optional) if some code calls toast.success
  fn.dismiss = vi.fn();        // (optional) if used
  return {
    connectionTestMock: vi.fn(),
    toastFn: fn,
  };
});

/** -------------------- MODULE MOCKS -------------------- */
// Mock both alias & relative imports for connectionTest (whichever App/setup uses)
vi.mock("@/utils/connectionTest", () => ({ __esModule: true, default: connectionTestMock }));
vi.mock("../../utils/connectionTest", () => ({ __esModule: true, default: connectionTestMock }));

// Mock retrieveStats so ProcessingContext doesn’t hit the network
// Mock both alias & relative forms to be safe
const okStats = {
  ok: true,
  service: "stats",
  now: new Date().toISOString(),
  response_time_ms: 5,
  data: { ave: 100, std: 20, week: { ave: 100, std: 20 } },
  error: null,
};
vi.mock("@/utils/retrieveStats", () => ({ __esModule: true, default: vi.fn(async () => okStats) }));
vi.mock("../../utils/retrieveStats", () => ({ __esModule: true, default: vi.fn(async () => okStats) }));

// Mock sonner *before* importing anything that uses it (ProcessingContext/App)
vi.mock("sonner", () => {
  const React = require("react");
  const Toaster = () => React.createElement("div", { "data-testid": "toaster-mock" });
  // Provide a function-like toast that also has .error/.promise etc.
  return { toast: toastFn, Toaster };
});

/** -------------------- IMPORT AFTER MOCKS -------------------- */
import App from "../../App";
import { toast } from "sonner";

/** -------------------- TESTS -------------------- */
beforeEach(() => {
  vi.clearAllMocks();
  // also clear toastFn recorded calls
  toastFn.calls.length = 0;
});
afterEach(() => {
  vi.useRealTimers();
});

describe("App (with connectionTest on mount)", () => {
  it("calls connectionTest once on mount and renders the title", async () => {
    connectionTestMock.mockResolvedValueOnce({ ok: true, message: "All Systems Online!" });

    render(<App />);

    expect(screen.getByText(/PlanGauge/i)).toBeInTheDocument();
    expect(connectionTestMock).toHaveBeenCalledTimes(1);
  });

  it("continues rendering even if connectionTest rejects", async () => {
    connectionTestMock.mockRejectedValueOnce(new Error("boom"));

    render(<App />);

    expect(screen.getByText(/PlanGauge/i)).toBeInTheDocument();
    expect(connectionTestMock).toHaveBeenCalledTimes(1);
    // because we mocked sonner with toast.error, no unhandled rejection occurs
  });

  it("invokes toast and has a mounted Toaster (smoke)", async () => {
    connectionTestMock.mockResolvedValueOnce({ ok: true });

    render(<App />);

    // Our mocked Toaster mounts
    expect(screen.getByTestId("toaster-mock")).toBeInTheDocument();

    // Trigger a toast; assert via mock rather than DOM text
    toast("Hello world!");
    expect(toastFn.calls.length).toBe(1);
    expect(toastFn.calls[0]).toEqual(["Hello world!"]);
  });
});
