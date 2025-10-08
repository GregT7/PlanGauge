import { describe, it, expect, vi, beforeEach } from "vitest";
import retrieveStats from "@/utils/retrieveStats";

// mock dependencies
vi.mock("@/utils/planningRange", () => ({
  DEFAULT_PLAN_START: "2025-06-01",
  DEFAULT_PLAN_END: "2025-06-30",
}));

vi.mock("@/utils/verifyStatsData", () => ({
  default: vi.fn(),
}));

const verifyStatsData = (await import("@/utils/verifyStatsData")).default;

describe("retrieveStats", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws an error if start or end date format is invalid", async () => {
    await expect(retrieveStats("invalid-date", "2025-06-30")).rejects.toThrow(
      "Invalid arguments passed to retrieveStats"
    );
    await expect(retrieveStats("2025-06-01", "not-a-date")).rejects.toThrow(
      "Invalid arguments passed to retrieveStats"
    );
  });

  it("rejects if fetch returns null", async () => {
    mockFetch.mockResolvedValueOnce(null);
    await expect(retrieveStats("2025-06-01", "2025-06-30")).rejects.toEqual(
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
    await expect(retrieveStats("2025-06-01", "2025-06-30")).rejects.toEqual(
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
    await expect(retrieveStats("2025-06-01", "2025-06-30")).rejects.toEqual(
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

    await expect(retrieveStats("2025-06-01", "2025-06-30")).rejects.toEqual(
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

    const result = await retrieveStats("2025-06-01", "2025-06-30");
    expect(result).toEqual(
      expect.objectContaining({
        message: "Data Successfully Retrieved And Processed!",
        data: fakeData,
      })
    );
    expect(verifyStatsData).toHaveBeenCalledWith(fakeData);
  });

  it("constructs the correct final URL", async () => {
    verifyStatsData.mockReturnValueOnce(true);
    mockFetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ ok: true, data: {} }),
    });

    const customUrl = "http://localhost:8080/api/db/stats";
    await retrieveStats("2025-06-01", "2025-06-30", customUrl);

    expect(mockFetch).toHaveBeenCalledWith(
      `${customUrl}?start=2025-06-01&end=2025-06-30`
    );
  });
});
