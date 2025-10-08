import { describe, it, expect, vi, beforeEach } from "vitest";
import setupApp from "@/utils/setupApp";

// 🧩 Mock dependencies
vi.mock("@/utils/connectionTest", () => ({
  default: vi.fn(),
}));
vi.mock("@/utils/retrieveStats", () => ({
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

describe("setupApp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls connectionTest and wraps it with toast.promise", async () => {
    const mockResponse = Promise.resolve({ message: "Connection OK" });
    connectionTest.mockReturnValueOnce(mockResponse);
    toast.promise.mockResolvedValueOnce({});

    await setupApp();

    expect(connectionTest).toHaveBeenCalledTimes(1);
    expect(toast.promise).toHaveBeenCalledWith(
      mockResponse,
      expect.objectContaining({
        loading: "Testing system connections...",
        success: expect.any(Function),
        error: expect.any(Function),
      })
    );
  });

  it("uses toast.success and toast.error message functions correctly", async () => {
    const connectResp = { message: "Everything works!" };
    connectionTest.mockReturnValueOnce(Promise.resolve(connectResp));

    await setupApp();

    const toastArgs = toast.promise.mock.calls[0][1];
    expect(toastArgs.success(connectResp)).toBe("Everything works!");
    expect(toastArgs.error(connectResp)).toBe("Everything works!");
  });

  it("handles thrown errors gracefully and shows toast.error", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    connectionTest.mockImplementationOnce(() => {
      throw new Error("connection failure");
    });

    await setupApp();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/internal error/i),
      expect.any(Error)
    );
    expect(toast.error).toHaveBeenCalledWith(
      "Error: There was an unexpected problem testing system connections!"
    );

    consoleSpy.mockRestore();
  });

  it("handles rejection from toast.promise gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    connectionTest.mockReturnValueOnce(Promise.reject(new Error("toast failed")));
    toast.promise.mockRejectedValueOnce(new Error("toast failed"));

    await setupApp();

    expect(toast.error).toHaveBeenCalledWith(
      "Error: There was an unexpected problem testing system connections!"
    );
    consoleSpy.mockRestore();
  });
});
