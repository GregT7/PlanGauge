// src/tests/utils/connectionTest.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * connectionTest now:
 *  - uses timedFetch(FLASK, headers, "Flask", 12000)
 *  - then persistentFetch(SUPABASE, headers, "Supabase") and persistentFetch(NOTION, headers, "Notion")
 *  - requires a config { ownerToken, flaskUrl: { health, db: { health }, notion: { health } } }
 */

// Mock BOTH functions from the module the SUT imports.
vi.mock("@/utils/persistentFetch", () => ({
  persistentFetch: vi.fn(),
  timedFetch: vi.fn(),
}));

// If your build resolves relative path in the built file, mock that too.
vi.mock("./persistentFetch", () => ({
  persistentFetch: vi.fn(),
  timedFetch: vi.fn(),
}));

// Import SUT and the mocked functions (via the alias import)
import connectionTest from "@/utils/connectionTest";
import { persistentFetch, timedFetch } from "@/utils/persistentFetch";

const FLASK  = "http://localhost:5000/api/health";
const SUPA   = "http://localhost:5000/api/db/health";
const NOTION = "http://localhost:5000/api/notion/health";

const OK   = { ok: true,  message: "OK"  };
const FAIL = { ok: false, message: "FAIL" };

const cfg = {
  ownerToken: "test-token",
  flaskUrl: {
    health: FLASK,
    db:     { health: SUPA },
    notion: { health: NOTION },
  },
};

const headersMatcher = expect.objectContaining({
  "Content-Type": "application/json",
  Authorization: "Bearer test-token",
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("connectionTest", () => {
  it("resolves ok:true when Flask, Supabase, and Notion are all OK", async () => {
    timedFetch.mockResolvedValueOnce(OK);       // Flask
    persistentFetch
      .mockResolvedValueOnce(OK)                // Supabase
      .mockResolvedValueOnce(OK);               // Notion

    await expect(connectionTest(cfg)).resolves.toEqual({
      ok: true,
      message: "All Systems Online!",
      details: {
        flask_response: OK,
        supabase_response: OK,
        notion_response: OK,
      },
    });

    expect(timedFetch).toHaveBeenCalledWith(FLASK, headersMatcher, "Flask", 12000);
    expect(persistentFetch).toHaveBeenNthCalledWith(1, SUPA,   headersMatcher, "Supabase");
    expect(persistentFetch).toHaveBeenNthCalledWith(2, NOTION, headersMatcher, "Notion");
    expect(persistentFetch).toHaveBeenCalledTimes(2);
  });

  it("rejects when Flask is NOT ok (skips Supabase/Notion)", async () => {
    timedFetch.mockResolvedValueOnce(FAIL);     // Flask fails first

    await expect(connectionTest(cfg)).rejects.toEqual({
      ok: false,
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: FAIL,
        supabase_response: null,
        notion_response: null,
      },
    });

    expect(timedFetch).toHaveBeenCalledWith(FLASK, headersMatcher, "Flask", 12000);
    expect(persistentFetch).not.toHaveBeenCalled();
  });

  it("rejects when Flask OK but Supabase NOT ok (Notion still attempted)", async () => {
    timedFetch.mockResolvedValueOnce(OK);       // Flask
    persistentFetch
      .mockResolvedValueOnce(FAIL)              // Supabase fails
      .mockResolvedValueOnce(OK);               // Notion result doesn't save the day

    await expect(connectionTest(cfg)).rejects.toEqual({
      ok: false,
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: OK,
        supabase_response: FAIL,
        notion_response: OK,
      },
    });

    expect(timedFetch).toHaveBeenCalledWith(FLASK, headersMatcher, "Flask", 12000);
    expect(persistentFetch).toHaveBeenNthCalledWith(1, SUPA,   headersMatcher, "Supabase");
    expect(persistentFetch).toHaveBeenNthCalledWith(2, NOTION, headersMatcher, "Notion");
  });

  it("rejects when Flask OK, Supabase OK, but Notion NOT ok", async () => {
    timedFetch.mockResolvedValueOnce(OK);
    persistentFetch
      .mockResolvedValueOnce(OK)                // Supabase
      .mockResolvedValueOnce(FAIL);             // Notion fails

    await expect(connectionTest(cfg)).rejects.toEqual({
      ok: false,
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: OK,
        supabase_response: OK,
        notion_response: FAIL,
      },
    });

    expect(persistentFetch).toHaveBeenCalledTimes(2);
  });

  it("handles unexpected exceptions via catch-path", async () => {
    const boom = new Error("boom");
    timedFetch.mockRejectedValueOnce(boom);     // throw during Flask step

    await expect(connectionTest(cfg)).rejects.toEqual({
      ok: false,
      message: "An unexpected error occured!",
      details: boom,
    });

    // Only Flask attempted
    expect(timedFetch).toHaveBeenCalledTimes(1);
    expect(persistentFetch).not.toHaveBeenCalled();
  });
});
