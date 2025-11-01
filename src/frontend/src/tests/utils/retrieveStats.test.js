// retrieveStats.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import retrieveStats from "@/utils/retrieveStats";

// Only mock verifyStatsData now — planningRange is no longer used
vi.mock("@/utils/verifyStatsData", () => ({
  default: vi.fn(),
}));

const verifyStatsData = (await import("@/utils/verifyStatsData")).default;

describe("retrieveStats (URL-based version)", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  const url =
    "http://localhost:5000/api/db/stats?start=2025-06-01&end=2025-06-30";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects if fetch returns null", async () => {
    mockFetch.mockResolvedValueOnce(null);
    await expect(retrieveStats(url)).rejects.toEqual(
      expect.objectContaining({
        message: "Error: Received no response from database!",
        data: null,
      })
    );
  });

  it("rejects if response body is null", async () => {
    mockFetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(null),
    });
    await expect(retrieveStats(url)).rejects.toEqual(
      expect.objectContaining({
        message: "Error: Received no response from database!",
        data: null,
      })
    );
  });

  it("rejects if dbRespBody.ok is false", async () => {
    mockFetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({
        ok: false,
        error: { message: "Database failed" },
      }),
    });
    await expect(retrieveStats(url)).rejects.toEqual(
      expect.objectContaining({
        message: "Database failed",
      })
    );
  });

  it("rejects if verifyStatsData returns false", async () => {
    verifyStatsData.mockReturnValueOnce(false);
    mockFetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({
        ok: true,
        data: { invalid: true },
      }),
    });

    await expect(retrieveStats(url)).rejects.toEqual(
      expect.objectContaining({
        message: "Error: Stats Data Is Invalid!",
      })
    );
  });

  it("resolves successfully when all checks pass", async () => {
    verifyStatsData.mockReturnValueOnce(true);
    const fakeData = { week1: { ave: 50, std: 10 } };

    mockFetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({
        ok: true,
        data: fakeData,
      }),
    });

    const result = await retrieveStats(url);
    expect(result).toEqual(
      expect.objectContaining({
        message: "Data Successfully Retrieved And Processed!",
        data: fakeData,
      })
    );
    expect(verifyStatsData).toHaveBeenCalledWith(fakeData);
  });

  it("calls fetch with the provided URL (no internal construction)", async () => {
    verifyStatsData.mockReturnValueOnce(true);
    mockFetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ ok: true, data: {} }),
    });

    await retrieveStats(url);

    expect(mockFetch).toHaveBeenCalledWith(url);
  });
});
