// src/tests/utils/connectionTest.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the persistentFetch module used by connectionTest
vi.mock("@/utils/persistentFetch", () => ({ persistentFetch: vi.fn() }));
// In case the built file or resolver uses a relative import:
vi.mock("./persistentFetch", () => ({ persistentFetch: vi.fn() }));

import connectionTest from "@/utils/connectionTest";
import { persistentFetch } from "@/utils/persistentFetch";

const FLASK  = "http://localhost:5000/api/health";
const SUPA   = "http://localhost:5000/api/db/health";
const NOTION = "http://localhost:5000/api/notion/health";

const OK   = { ok: true,  message: "OK" };
const FAIL = { ok: false, message: "FAIL" };

beforeEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("connectionTest (matches current implementation)", () => {
  it("resolves with ok:true, pass message, and details when all services are OK", async () => {
    persistentFetch
      .mockResolvedValueOnce(OK)   // Flask
      .mockResolvedValueOnce(OK)   // Supabase
      .mockResolvedValueOnce(OK);  // Notion

    await expect(connectionTest()).resolves.toEqual({
      ok: true,
      message: "All Systems Online!",
      details: {
        flask_response: OK,
        supabase_response: OK,
        notion_response: OK,
      },
    });

    expect(persistentFetch).toHaveBeenNthCalledWith(1, FLASK,  "Flask");
    expect(persistentFetch).toHaveBeenNthCalledWith(2, SUPA,   "Supabase");
    expect(persistentFetch).toHaveBeenNthCalledWith(3, NOTION, "Notion");
    expect(persistentFetch).toHaveBeenCalledTimes(3);
  });

  it("rejects early with ok:false when Flask is NOT ok (skips Supabase/Notion)", async () => {
    persistentFetch.mockResolvedValueOnce(FAIL); // Flask

    await expect(connectionTest()).rejects.toEqual({
      ok: false,
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: FAIL,
        supabase_response: null,
        notion_response: null,
      },
    });

    expect(persistentFetch).toHaveBeenCalledTimes(1);
    expect(persistentFetch).toHaveBeenNthCalledWith(1, FLASK, "Flask");
  });

  it("rejects with ok:false when Flask OK but Supabase NOT ok (Notion still attempted)", async () => {
    persistentFetch
      .mockResolvedValueOnce(OK)    // Flask
      .mockResolvedValueOnce(FAIL)  // Supabase
      .mockResolvedValueOnce(OK);   // Notion (value doesn't affect accept flag)

    await expect(connectionTest()).rejects.toEqual({
      ok: false,
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: OK,
        supabase_response: FAIL,
        notion_response: OK,
      },
    });

    expect(persistentFetch).toHaveBeenNthCalledWith(1, FLASK,  "Flask");
    expect(persistentFetch).toHaveBeenNthCalledWith(2, SUPA,   "Supabase");
    expect(persistentFetch).toHaveBeenNthCalledWith(3, NOTION, "Notion");
    expect(persistentFetch).toHaveBeenCalledTimes(3);
  });

  it("rejects with ok:false when Flask OK, Supabase OK, but Notion NOT ok", async () => {
    persistentFetch
      .mockResolvedValueOnce(OK)    // Flask
      .mockResolvedValueOnce(OK)    // Supabase
      .mockResolvedValueOnce(FAIL); // Notion

    await expect(connectionTest()).rejects.toEqual({
      ok: false,
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: OK,
        supabase_response: OK,
        notion_response: FAIL,
      },
    });

    expect(persistentFetch).toHaveBeenCalledTimes(3);
  });

  it("handles unexpected exceptions by rejecting with ok:false + catch-path shape", async () => {
    const boom = new Error("boom");
    persistentFetch.mockRejectedValueOnce(boom); // throw on Flask

    await expect(connectionTest()).rejects.toEqual({
      ok: false,
      message: "An unexpected error occured!",
      details: boom,
    });

    expect(persistentFetch).toHaveBeenCalledTimes(1);
  });
});
