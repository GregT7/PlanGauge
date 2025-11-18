// src/tests/utils/retrieveStats.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import retrieveStats from "@/utils/retrieveStats";

// ✅ Mock BOTH paths so it works whether the SUT imports via alias or relative
vi.mock("@/utils/verifyStatsData", () => ({ default: vi.fn() }));
vi.mock("./verifyStatsData", () => ({ default: vi.fn() }));

// Pull the mock from the alias path for assertions
const verifyStatsData = (await import("@/utils/verifyStatsData")).default;

describe("retrieveStats (URL-based version)", () => {
  const url =
    "http://localhost:5000/api/db/stats?start=2025-06-01&end=2025-06-30";

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn(); // reset fetch each test
  });

  it("rejects if fetch returns null", async () => {
    global.fetch.mockResolvedValueOnce(null);

    await expect(retrieveStats(url)).rejects.toEqual(
      expect.objectContaining({
        message: "Error: Received no response from database!",
        data: null,
      })
    );

    // ensure it was called with URL + options
    expect(global.fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("rejects if response body is null", async () => {
    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(null),
    });

    await expect(retrieveStats(url)).rejects.toEqual(
      expect.objectContaining({
        message: "Error: Received no response from database!",
        data: null,
      })
    );
  });

  it("rejects if dbRespBody.ok is false (bubbles error message)", async () => {
    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({
        ok: false,
        error: { message: "Database failed" },
      }),
    });

    await expect(retrieveStats(url)).rejects.toEqual(
      expect.objectContaining({ message: "Database failed" })
    );
  });

  it("rejects if verifyStatsData returns false", async () => {
    verifyStatsData.mockReturnValueOnce(false);
    global.fetch.mockResolvedValueOnce({
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

    expect(verifyStatsData).toHaveBeenCalledWith({ invalid: true });
  });

  it("resolves successfully when all checks pass", async () => {
    const fakeData = { week1: { ave: 50, std: 10 } };
    verifyStatsData.mockReturnValueOnce(true);
    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ ok: true, data: fakeData }),
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

  it("calls fetch with URL and correct options (GET + JSON header)", async () => {
    verifyStatsData.mockReturnValueOnce(true);
    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ ok: true, data: {} }),
    });

    await retrieveStats(url);

    expect(global.fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
  });
});
