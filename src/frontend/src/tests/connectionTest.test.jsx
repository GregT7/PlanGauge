import { connectionTest, timed_fetch, persistent_fetch } from "@/utils/connectionTest";
import { start } from "repl";
import { describe, it, expect, vi, beforeEach } from "vitest";

beforeEach(() => {
  vi.restoreAllMocks();
});


describe("timed_fetch, a helper function used in connectionTest()", () => {
  const url = "http://localhost:5000/api/health";
  const service_str = "Flask";
  const duration = 1000;

    const mockResponse = {
      ok: true,
      message: 'hello world'
    }

  it("successfully fetches a response when there are no timing issues", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce(mockResponse)

    const response = await timed_fetch(url, service_str, duration);
    expect(response).toEqual(mockResponse)
  })

  it("times out after attempting to fetch longer than the specified duration threshold", async () => {
    // vi.useFakeTimers();

    global.fetch = vi.fn((url, init) => 
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("inside fetch function!!!!!")
          resolve ({
            ok: true,
            json: () => Promise.resolve({message: "Fetch response message"})
          })
        }, duration + 2000)
    }))


    const start_fetch = timed_fetch(url, service_str, duration);
    await vi.advanceTimersByTimeAsync(duration + 1);
    const response = await start_fetch;

    console.log(response)
  })

  // it("handles other exceptions thrown besides time handling or AbortError errors", () => {

  // });

  // it("always clears the Timeout function regardless of the fetch attempts outcome", () => {

  // })


})
