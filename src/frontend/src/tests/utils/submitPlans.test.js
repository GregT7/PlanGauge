// submitPlans.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/utils/verifyPayload", () => ({
  verify_task: vi.fn(),
  verify_payload: vi.fn(),
}));

const reimport = async () => {
  vi.resetModules();
  // Re-mock after reset so our mocks persist
  vi.doMock("@/utils/verifyPayload", () => ({
    verify_task: vi.fn(),
    verify_payload: vi.fn(),
  }));
  const mod = await import("@/utils/submitPlans");
  const vp = await import("@/utils/verifyPayload");
  return { submitPlans: mod.default, verifyPayloadMod: vp };
};

beforeEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  // default fetch stub unless overridden in a test
  global.fetch = vi.fn();
});

const OK_URL = "http://localhost:5000/api/plan-submissions";

const mkFetchResponse = (ok, body = { ok }) => ({
  ok,
  json: () => Promise.resolve(body),
});

describe("submitPlans", () => {
  it("rejects with 'Invalid Plan Data' when verify_payload returns false", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(false);
    verify_task.mockReturnValue(true); // still called for each task due to filtering step

    const tasks = [{ id: 1 }, { id: 2 }];
    await expect(
      submitPlans(tasks, "2025-06-01", "2025-06-30", OK_URL)
    ).rejects.toEqual({
      message: "Error: Invalid Plan Data!",
      details: null,
    });

    // verify_payload called with the constructed payload
    expect(verify_payload).toHaveBeenCalledTimes(1);
    expect(verify_payload).toHaveBeenCalledWith({
      tasks,
      filter_start_date: "2025-06-01",
      filter_end_date: "2025-06-30",
    });

    // verify_task gets called for each task (filter happens regardless)
    expect(verify_task).toHaveBeenCalledTimes(tasks.length);

    // fetch should NOT be called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("resolves with success message and response details when server returns ok=true", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(true);
    // Simulate one invalid task; filtering will drop it, but payload is built BEFORE filter.
    verify_task.mockImplementation((t) => t.keep === true);

    const tasks = [{ id: 1, keep: true }, { id: 2, keep: false }];
    const start = "2025-06-01";
    const end = "2025-06-30";
    const fetchResp = mkFetchResponse(true, { ok: true, note: "hello" });

    global.fetch.mockResolvedValueOnce(fetchResp);

    const result = await submitPlans(tasks, start, end, OK_URL);

    // Returned object
    expect(result).toEqual({
      message: "Submission was successful",
      details: fetchResp,
    });

    // fetch called once with correct URL and options
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(OK_URL);
    expect(opts.method).toBe("POST");
    expect(opts.headers).toEqual({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });

    // Body should be original payload (built before filtering)
    const sent = JSON.parse(opts.body);
    expect(sent).toEqual({
      tasks, // includes both tasks even though one fails verify_task
      filter_start_date: start,
      filter_end_date: end,
    });

    // verify calls
    expect(verify_payload).toHaveBeenCalledTimes(1);
    expect(verify_task).toHaveBeenCalledTimes(tasks.length);
  });

  it("rejects with 'Submission Failed' when server returns ok=false", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(true);
    verify_task.mockReturnValue(true);

    const fetchResp = mkFetchResponse(false, { ok: false, reason: "nope" });
    global.fetch.mockResolvedValueOnce(fetchResp);

    await expect(
      submitPlans([{ a: 1 }], "2025-06-01", "2025-06-30", OK_URL)
    ).rejects.toEqual({
      message: "Submission Failed",
      details: fetchResp,
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("propagates fetch() rejection as a thrown error (not a formatted response)", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(true);
    verify_task.mockReturnValue(true);

    const boom = new Error("boom");
    global.fetch.mockRejectedValueOnce(boom);

    await expect(
      submitPlans([{ z: 1 }], "2025-06-01", "2025-06-30", OK_URL)
    ).rejects.toThrow("boom");
  });

  it("sends correct headers and method", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(true);
    verify_task.mockReturnValue(true);

    const fetchResp = mkFetchResponse(true, {});
    global.fetch.mockResolvedValueOnce(fetchResp);

    await submitPlans([], "2025-06-01", "2025-06-30", OK_URL);

    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(OK_URL);
    expect(opts.method).toBe("POST");
    expect(opts.headers["Content-Type"]).toBe("application/json");
    expect(opts.headers["Accept"]).toBe("application/json");
  });

  it("includes the requested date range and tasks in the POST body", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(true);
    verify_task.mockReturnValue(true);

    const tasks = [{ n: 1 }, { n: 2 }];
    global.fetch.mockResolvedValueOnce(mkFetchResponse(true, {}));

    await submitPlans(tasks, "2024-01-01", "2024-01-31", OK_URL);

    const [, opts] = global.fetch.mock.calls[0];
    const body = JSON.parse(opts.body);

    expect(body.tasks).toEqual(tasks);
    expect(body.filter_start_date).toBe("2024-01-01");
    expect(body.filter_end_date).toBe("2024-01-31");
  });

  it("calls verify_task once per task regardless of payload validity", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(false);
    verify_task.mockReturnValue(true);

    const tasks = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }));
    await expect(
      submitPlans(tasks, "2025-06-01", "2025-06-30", OK_URL)
    ).rejects.toBeTruthy();

    expect(verify_task).toHaveBeenCalledTimes(tasks.length);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("works with an empty task list (still posts when payload is valid)", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(true);
    verify_task.mockReturnValue(true);

    global.fetch.mockResolvedValueOnce(mkFetchResponse(true, {}));

    const tasks = [];
    const res = await submitPlans(tasks, "2025-07-01", "2025-07-31", OK_URL);
    expect(res.message).toBe("Submission was successful");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [, opts] = global.fetch.mock.calls[0];
    const body = JSON.parse(opts.body);
    expect(body.tasks).toEqual([]);
  });

  it("URL must be the expected plan-submissions endpoint", async () => {
    const { submitPlans, verifyPayloadMod } = await reimport();
    const { verify_payload, verify_task } = verifyPayloadMod;

    verify_payload.mockReturnValue(true);
    verify_task.mockReturnValue(true);

    global.fetch.mockResolvedValueOnce(mkFetchResponse(true, {}));

    await submitPlans([{ t: 1 }], "2025-06-01", "2025-06-30", OK_URL);
    const [url] = global.fetch.mock.calls[0];
    expect(url).toBe("http://localhost:5000/api/plan-submissions");
  });
});