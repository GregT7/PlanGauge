// connectionTest.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the persistentFetch module used by connectionTest
vi.mock("@/utils/persistentFetch", () => {
  return { persistentFetch: vi.fn() };
});
// (In case your resolver uses the relative path inside the compiled module)
vi.mock("./persistentFetch", () => {
  return { persistentFetch: vi.fn() };
});

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

describe("connectionTest (new structure)", () => {
  it("resolves with pass message + details when Flask, Supabase, and Notion are all OK", async () => {
    // Flask OK, Supabase OK, Notion OK
    persistentFetch
      .mockResolvedValueOnce(OK)   // Flask
      .mockResolvedValueOnce(OK)   // Supabase
      .mockResolvedValueOnce(OK);  // Notion

    await expect(connectionTest()).resolves.toEqual({
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

  it("rejects early when Flask is NOT ok (no Supabase/Notion calls)", async () => {
    // Flask FAIL → should NOT call the others
    persistentFetch.mockResolvedValueOnce(FAIL);

    await expect(connectionTest()).rejects.toEqual({
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

  it("rejects when Flask OK but Supabase NOT ok (Notion NOT attempted)", async () => {
    // Flask OK, Supabase FAIL, Notion OK/FAIL → still reject
    persistentFetch
      .mockResolvedValueOnce(OK)    // Flask
      .mockResolvedValueOnce(FAIL)  // Supabase
      .mockResolvedValueOnce(null);   // Notion (value doesn't matter; accept=false)

    await expect(connectionTest()).rejects.toEqual({
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: OK,
        supabase_response: FAIL,
        notion_response: null,
      },
    });

    expect(persistentFetch).toHaveBeenNthCalledWith(1, FLASK,  "Flask");
    expect(persistentFetch).toHaveBeenNthCalledWith(2, SUPA,   "Supabase");
    expect(persistentFetch).toHaveBeenCalledTimes(2);
  });

  it("rejects when Flask OK, Supabase OK, but Notion NOT ok", async () => {
    persistentFetch
      .mockResolvedValueOnce(OK)    // Flask
      .mockResolvedValueOnce(OK)    // Supabase
      .mockResolvedValueOnce(FAIL); // Notion

    await expect(connectionTest()).rejects.toEqual({
      message: "Error: Connectivity Issues!",
      details: {
        flask_response: OK,
        supabase_response: OK,
        notion_response: FAIL,
      },
    });

    expect(persistentFetch).toHaveBeenCalledTimes(3);
  });

  it("handles unexpected exceptions by rejecting with the catch-path shape", async () => {
    const boom = new Error("boom");
    persistentFetch.mockRejectedValueOnce(boom); // throws on Flask

    await expect(connectionTest()).rejects.toEqual({
      message: "An unexpected error occured!",
      details: boom,
    });

    expect(persistentFetch).toHaveBeenCalledTimes(1);
  });
});
