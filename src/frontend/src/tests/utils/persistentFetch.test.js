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

const mockPass = { ok: true, message: "hello world" };

function resolvingFetch() {
  global.fetch = vi.fn(() =>
    Promise.resolve(mockPass)
  );
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
  it("resolves normally when the response arrives before timeout", async () => {
    resolvingFetch();
    const response = await timedFetch(url, service_str, duration);
    expect(response).toEqual(mockPass);
  });

  it("aborts when the request exceeds timeout", async () => {
    vi.useFakeTimers();

    laggingFetch(duration + 500);
    const p = timedFetch(url, service_str, duration);

    await vi.advanceTimersByTimeAsync(duration + 1);
    const response = await p;

    expect(response).toBeInstanceOf(Error);
    expect(response.name).toBe("AbortError");
  });

  it("returns other internal errors from fetch", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    internalErrorFetch();

    const response = await timedFetch(url, service_str, duration);
    expect(response).toBeInstanceOf(Error);
    expect(response.name).toBe("TestError");

    expect(consoleSpy).toHaveBeenCalledWith(`${service_str}: Fetch Internal Error`);
  });

  it("always clears its timeout", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

    // success path
    resolvingFetch();
    await timedFetch(url, service_str, duration);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    // timeout path
    vi.useFakeTimers();
    laggingFetch(duration + 500);
    const p = timedFetch(url, service_str, duration);
    await vi.advanceTimersByTimeAsync(duration + 1);
    await p;

    // +1 setTimeout and +1 clearTimeout from this run
    // laggingFetch = 1, timedFetch = 2
    expect(setTimeoutSpy).toHaveBeenCalledTimes(3);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);

    // internal error path
    vi.useRealTimers();
    internalErrorFetch();
    await timedFetch(url, service_str, duration);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(3);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);
  });
});

// ------- persistentFetch -------
describe("persistentFetch", () => {
  const errResponse = { ok: false, message: "Mock error response" };

  it("stops retrying after a successful attempt", async () => {
    const fetchSpy = vi.spyOn(global, "fetch")
      .mockResolvedValueOnce(mockPass); // success on first try

    const r1 = await persistentFetch(url, service_str, duration);
    expect(r1).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // success on second attempt
    fetchSpy.mockResolvedValueOnce(errResponse);
    fetchSpy.mockResolvedValueOnce(mockPass);
    const r2 = await persistentFetch(url, service_str, duration);
    expect(r2).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(3);

    // success on third attempt
    fetchSpy.mockResolvedValueOnce(errResponse);
    fetchSpy.mockResolvedValueOnce(errResponse);
    fetchSpy.mockResolvedValueOnce(mockPass);
    const r3 = await persistentFetch(url, service_str, duration);
    expect(r3).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(6);
  });

  it("gives up after 3 tries and returns the last error", async () => {
    internalErrorFetch();
    const fetchSpy = vi.spyOn(global, "fetch");

    const r = await persistentFetch(url, service_str, duration);
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
    const promise = persistentFetch(url, service_str, base);

    // attempt 1: 250ms -> abort
    await vi.advanceTimersByTimeAsync(250);
    // attempt 2: 500ms -> abort
    await vi.advanceTimersByTimeAsync(500);
    // attempt 3: 625ms -> resolves before 750ms timeout
    await vi.advanceTimersByTimeAsync(625);

    const res = await promise;
    expect(fetchSpy).toHaveBeenCalledTimes(3);
    expect(res.ok).toBe(true);
  });
});