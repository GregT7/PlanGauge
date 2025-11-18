// src/tests/utils/persistentFetch.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { timedFetch, persistentFetch } from "@/utils/persistentFetch";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

// ------- helpers -------
const url = "http://localhost:5000/api/health";
const service_str = "Flask";
const duration = 1000;
const headers = { "Content-Type": "application/json" };
const mockPass = { ok: true, message: "hello world" };

function resolvingFetch() {
  global.fetch = vi.fn(() => Promise.resolve(mockPass));
}

function internalErrorFetch() {
  global.fetch = vi.fn((_url, _init) => {
    const err = new Error("Test Error");
    err.name = "TestError";
    return Promise.reject(err);
  });
}

function laggingFetch(lagMs) {
  global.fetch = vi.fn((_url, init) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve({ message: "Fetch response message" }),
        });
      }, lagMs);

      const onAbort = () => {
        clearTimeout(timer);
        const err = new Error("This operation was aborted");
        err.name = "AbortError";
        reject(err);
      };

      if (init?.signal?.aborted) {
        onAbort();
      } else {
        init?.signal?.addEventListener("abort", onAbort, { once: true });
      }
    })
  );
}

// ------- timedFetch -------
describe("timedFetch", () => {
  it("resolves normally when response arrives before timeout", async () => {
    resolvingFetch();
    const response = await timedFetch(url, headers, service_str, duration);
    expect(response).toEqual(mockPass);
  });

  it("aborts when request exceeds timeout", async () => {
    vi.useFakeTimers();
    laggingFetch(duration + 500);

    const p = timedFetch(url, headers, service_str, duration);
    await vi.advanceTimersByTimeAsync(duration + 1);
    const response = await p;

    expect(response).toBeInstanceOf(Error);
    expect(response.name).toBe("AbortError");
  });

  it("returns internal errors from fetch", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    internalErrorFetch();

    const response = await timedFetch(url, headers, service_str, duration);
    expect(response).toBeInstanceOf(Error);
    expect(response.name).toBe("TestError");
    expect(consoleSpy).toHaveBeenCalledWith(`${service_str}: Fetch Internal Error`);
  });

  it("always clears its timeout", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

    // success
    resolvingFetch();
    await timedFetch(url, headers, service_str, duration);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    // timeout
    vi.useFakeTimers();
    laggingFetch(duration + 500);
    const p = timedFetch(url, headers, service_str, duration);
    await vi.advanceTimersByTimeAsync(duration + 1);
    await p;
    expect(setTimeoutSpy).toHaveBeenCalledTimes(3);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });
});

// ------- persistentFetch -------
describe("persistentFetch", () => {
  const errResponse = { ok: false, message: "Mock error response" };

  it("stops retrying after success", async () => {
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(mockPass); // success first try

    const r1 = await persistentFetch(url, headers, service_str, duration);
    expect(r1).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // success second try
    fetchSpy.mockResolvedValueOnce(errResponse);
    fetchSpy.mockResolvedValueOnce(mockPass);
    const r2 = await persistentFetch(url, headers, service_str, duration);
    expect(r2).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(3);

    // success third try
    fetchSpy.mockResolvedValueOnce(errResponse);
    fetchSpy.mockResolvedValueOnce(errResponse);
    fetchSpy.mockResolvedValueOnce(mockPass);
    const r3 = await persistentFetch(url, headers, service_str, duration);
    expect(r3).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(6);
  });

  it("gives up after 3 tries and returns the last error", async () => {
    internalErrorFetch();
    const fetchSpy = vi.spyOn(global, "fetch");

    const r = await persistentFetch(url, headers, service_str, duration);
    expect(fetchSpy).toHaveBeenCalledTimes(3);
    expect(r).toBeInstanceOf(Error);
    expect(r.name).toBe("TestError");
  });

  it("backs off by increasing timeout each attempt", async () => {
    vi.useFakeTimers();

    const base = 250;
    const lag = Math.round(base * 2 + base / 2); // 625ms
    laggingFetch(lag);
    const fetchSpy = vi.spyOn(global, "fetch");

    const promise = persistentFetch(url, headers, service_str, base);

    await vi.advanceTimersByTimeAsync(250); // first abort
    await vi.advanceTimersByTimeAsync(500); // second abort
    await vi.advanceTimersByTimeAsync(625); // resolves

    const res = await promise;
    expect(fetchSpy).toHaveBeenCalledTimes(3);
    expect(res.ok).toBe(true);

    vi.useRealTimers();
  });
});
