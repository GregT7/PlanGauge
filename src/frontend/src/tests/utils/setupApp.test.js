// src/tests/utils/setupApp.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import setupApp from "@/utils/setupApp";

// 🔧 Mocks
vi.mock("@/utils/connectionTest", () => ({
  default: vi.fn(),
}));
vi.mock("sonner", () => ({
  toast: {
    promise: vi.fn(),
    error: vi.fn(),
  },
}));

const connectionTest = (await import("@/utils/connectionTest")).default;
const { toast } = await import("sonner");

const nonDemoCfg = { isDemo: false };
const demoCfg = { isDemo: true };

describe("setupApp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("non-demo: calls connectionTest(config) and wraps it with toast.promise", async () => {
    const mockResp = { message: "All Systems Online!" };
    const connectPromise = Promise.resolve(mockResp);

    connectionTest.mockReturnValueOnce(connectPromise);
    toast.promise.mockResolvedValueOnce({}); // resolve toast wrapper

    await setupApp(nonDemoCfg);

    expect(connectionTest).toHaveBeenCalledTimes(1);
    expect(connectionTest).toHaveBeenCalledWith(nonDemoCfg);

    expect(toast.promise).toHaveBeenCalledWith(
      connectPromise,
      expect.objectContaining({
        loading: "Testing system connections...",
        success: expect.any(Function),
        error: expect.any(Function),
      })
    );
  });

  it("non-demo: success/error formatters return the backend message", async () => {
    const connectResp = { message: "Connection OK" };
    connectionTest.mockReturnValueOnce(Promise.resolve(connectResp));
    toast.promise.mockResolvedValueOnce({});

    await setupApp(nonDemoCfg);

    const args = toast.promise.mock.calls[0][1];
    expect(args.success(connectResp)).toBe("Connection OK");
    expect(args.error(connectResp)).toBe("Connection OK");
  });

  it("non-demo: synchronous throw from connectionTest triggers toast.error", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    connectionTest.mockImplementationOnce(() => {
      throw new Error("boom");
    });

    await setupApp(nonDemoCfg);

    expect(spy).toHaveBeenCalledWith(
      expect.stringMatching(/internal error/i),
      expect.any(Error)
    );
    expect(toast.error).toHaveBeenCalledWith(
      "Error: There was an unexpected problem testing system connections!"
    );
    spy.mockRestore();
  });

  it("non-demo: rejection from toast.promise triggers toast.error", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    // connectionTest returns a (rejected) promise
    connectionTest.mockReturnValueOnce(Promise.reject(new Error("reject")));
    // toast.promise also rejects
    toast.promise.mockRejectedValueOnce(new Error("reject"));

    await setupApp(nonDemoCfg);

    expect(toast.error).toHaveBeenCalledWith(
      "Error: There was an unexpected problem testing system connections!"
    );
    spy.mockRestore();
  });

  it("demo: uses simulated promise, correct loading text, and does NOT call connectionTest", async () => {
    toast.promise.mockResolvedValueOnce({});

    await setupApp(demoCfg);

    expect(connectionTest).not.toHaveBeenCalled();
    expect(toast.promise).toHaveBeenCalledTimes(1);

    const [demoPromiseArg, opts] = toast.promise.mock.calls[0];
    // quick sanity: it's a thenable
    expect(typeof demoPromiseArg.then).toBe("function");

    expect(opts.loading).toBe("Simulating system connection tests...");
    expect(opts.success({ message: "Simulated!" })).toBe("Simulated!");
    expect(opts.error).toBe("Demo failed (this should never happen)");
  });
});
