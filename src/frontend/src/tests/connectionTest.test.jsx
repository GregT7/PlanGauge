
import { start } from "repl";
import { describe, it, expect, vi, beforeEach } from "vitest";

// 1) Mock sonner first (hoisted)
vi.mock("sonner", () => {
  // toast is both a function and has methods (success/error/etc.)
  const toast = Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    message: vi.fn(),
  });
  return { toast };
});

import { connectionTest, timed_fetch, persistent_fetch } from "@/utils/connectionTest";
import { toast } from "sonner"

beforeEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

const url = "http://localhost:5000/api/health";
const service_str = "Flask";
const duration = 1000;

const mockPass = {
  ok: true,
  message: 'hello world'
};

const resolving_fetch = () => {
  global.fetch = vi.fn(() => 
    new Promise((resolve, reject) => {
      resolve(mockPass)
    })
  )
}

const internal_error_fetch = () => {
  global.fetch = vi.fn((url, init) => {
    const err = new Error("Test Error")
    err.name = "TestError"

    return new Promise((resolve, reject) => {
      reject(err)
    })
  })
}

const lagging_fetch = (lag_duration) => {
  global.fetch = vi.fn((url, init) => 
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve ({
          ok: true,
          json: () => Promise.resolve({message: "Fetch response message"})
        })
      }, lag_duration);

    const onAbort = () => {
      clearTimeout(timer);
      const err = new Error("This operation was aborted");
      err.name = "AbortError";
      reject(err); // IMPORTANT: reject on abort
    };

    if (init?.signal?.aborted) {
      onAbort();
    } else {
      init?.signal?.addEventListener("abort", onAbort, {once: true});
    }
  }))
}

describe("timed_fetch - helper function", () => {

  it("successfully fetches a response when there are no timing issues", async () => {
    resolving_fetch()

    const response = await timed_fetch(url, service_str, duration);
    expect(response).toEqual(mockPass)
  })

  it("times out after attempting to fetch longer than the specified duration threshold", async () => {
    vi.useFakeTimers();

    lagging_fetch(duration + 1000);
    const start_fetch = timed_fetch(url, service_str, duration);
    await vi.advanceTimersByTimeAsync(duration + 1);
    const response = await start_fetch;

    expect(response).toBeInstanceOf(Error);
    expect(response.name).toBe("AbortError");
  })

  it("handles other exceptions thrown besides AbortError errors", async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const expectedOutString = `${service_str}: Fetch Internal Error`

    internal_error_fetch()

    // console.log(`${service_str}: Fetch Internal Error`);
    const response = await timed_fetch(url, service_str, duration);
    expect(response).toBeInstanceOf(Error);
    expect(response.name).toBe("TestError");

    expect(consoleSpy).toBeCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(expectedOutString)
  });

  it("always clears the Timeout function regardless of the fetch attempts outcome", async () => {
    const setTimeoutSpy = vi.spyOn(window, 'setTimeout');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    // successful fetch test
    resolving_fetch()
    const success_response = await timed_fetch(url, service_str, duration);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    // slow fetch that throws error test
    // lagging_fetch calls setTimeout + clearTimeout to ensure fetch takes longer than the passed duration
    // to simulate a timeout caused error
    lagging_fetch(duration + 1000);
    const start_fetch = timed_fetch(url, service_str, duration);
    await vi.advanceTimersByTimeAsync(duration + 1);
    const lagging_response = await start_fetch;
    expect(setTimeoutSpy).toHaveBeenCalledTimes(3);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);

    // internal error causes fetch to fail test
    internal_error_fetch();
    const error_response = await timed_fetch(url, service_str, duration);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(4);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(4);
  })
});

describe("persistent_fetch", () => {
  const err_response = {
    ok: false,
    'message': 'Mock error response'
  }

  it("successfully connects to the api endpoint and stops making attempts afterwards", async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockPass)

    // succeeds on first attempt
    const response1 = await persistent_fetch(url, service_str, duration);
    expect(response1).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // succeeds on second fetch attempt
    fetchSpy.mockResolvedValueOnce(err_response)
    fetchSpy.mockResolvedValueOnce(mockPass);
    const response2 = await persistent_fetch(url, service_str, duration);
    expect(response2).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(3);

    // succeeds on third fetch attempt
    fetchSpy.mockResolvedValueOnce(err_response);
    fetchSpy.mockResolvedValueOnce(err_response);
    fetchSpy.mockResolvedValueOnce(mockPass);
    const response3 = await persistent_fetch(url, service_str, duration);
    expect(response3).toEqual(mockPass);
    expect(fetchSpy).toHaveBeenCalledTimes(6);
  });


  it("stops attempting after 3 tries", async () => {
    internal_error_fetch()
    const fetchSpy = vi.spyOn(global, 'fetch');
    const response = await persistent_fetch(url, service_str, duration)

    expect(fetchSpy).toHaveBeenCalledTimes(3)
    expect(response).toBeInstanceOf(Error)
    expect(response.name).toBe('TestError')
  });

  it("waits the specified duration each connection attempt with an increase in wait time each try", async () => {
    vi.useFakeTimers();

    const test_duration = 250;
    const lag_offset = Math.round(test_duration * 2 + test_duration / 2)
    lagging_fetch(lag_offset)

    const fetchSpy = vi.spyOn(global, 'fetch')

    const r = persistent_fetch(url, service_str, test_duration);

    // Stepwise with exact deltas from the *current* now:
    await vi.advanceTimersByTimeAsync(250); // abort #1, schedule #2 at t=250
    await vi.advanceTimersByTimeAsync(500); // abort #2 at t=750, schedule #3 at t=750
    await vi.advanceTimersByTimeAsync(625); // resolve #3 at t=1375

    const resolve_obj = {
          ok: true,
          json: () => Promise.resolve({message: "Fetch response message"})
    }
    const response = await r;
    expect(fetchSpy).toBeCalledTimes(3)
    expect(response.ok).toBe(true)
  });
})

describe("connectionTest - ensures systems are online and reachable", async () => {
  // 1 = pass, 0 = fail
  const mockFail = {
    ok: false,
    message: 'Failed mock response'
  }

  it("manages: [flask: 0, supabase: 0, notion: 0]", async() => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);

    const response = await connectionTest();
    console.log(response)
    const expected_response = {
      flask: mockFail,
      supabase: null,
      notion: null
    }

    expect(response).toEqual(expected_response)
    expect(fetchSpy).toHaveBeenCalledTimes(3)

    expect(toast.error).toHaveBeenCalledWith("Flask is currently unavailable...");
  })

  it("manages: [flask: 0, supabase: 1, notion: 0]", async() => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    // flask attempts
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);

    // supabase attempts
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);

    const response = await connectionTest();
    const expected_response = {
      flask: mockFail,
      supabase: null,
      notion: null
    }

    expect(response).toEqual(expected_response)
    expect(fetchSpy).toHaveBeenCalledTimes(3)

    expect(toast.error).toHaveBeenCalledWith("Flask is currently unavailable...");
  })
  it("manages: [flask: 1, supabase: 0, notion: 0]", async() => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    // flask attempts
    fetchSpy.mockResolvedValueOnce(mockPass);

    // supabase attempts
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);

    // notion attempts
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);

    const response = await connectionTest();
    
    const expected_response = {
      flask: mockPass,
      supabase: mockFail,
      notion: mockFail
    }

    expect(response).toEqual(expected_response)
    expect(fetchSpy).toHaveBeenCalledTimes(7)
    expect(toast.error).toHaveBeenCalledWith("Database (Supabase) is currently unavailable...");
    expect(toast.error).toHaveBeenCalledWith("Notion is currently unavailable...");
  })
  it("manages: [flask: 1, supabase: 1, notion: 0]", async() => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    // flask attempts
    fetchSpy.mockResolvedValueOnce(mockPass);

    // supabase attempts
    fetchSpy.mockResolvedValueOnce(mockPass);

    // notion attempts
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);
    fetchSpy.mockResolvedValueOnce(mockFail);

    const response = await connectionTest();
    
    const expected_response = {
      flask: mockPass,
      supabase: mockPass,
      notion: mockFail
    }

    expect(response).toEqual(expected_response)
    expect(fetchSpy).toHaveBeenCalledTimes(5)
    expect(toast.error).toHaveBeenCalledWith("Notion is currently unavailable...");
  })
  it("manages: [flask: 1, supabase: 1, notion: 1]", async() => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    // flask attempts
    fetchSpy.mockResolvedValueOnce(mockPass);

    // supabase attempts
    fetchSpy.mockResolvedValueOnce(mockPass);

    // notion attempts
    fetchSpy.mockResolvedValueOnce(mockPass);

    const response = await connectionTest();
    
    const expected_response = {
      flask: mockPass,
      supabase: mockPass,
      notion: mockPass
    }

    expect(response).toEqual(expected_response)
    expect(fetchSpy).toHaveBeenCalledTimes(3)
    expect(toast.success).toHaveBeenCalledWith("All systems are online!");
  })
});