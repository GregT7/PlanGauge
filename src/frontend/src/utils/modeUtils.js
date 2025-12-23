import connectionTest from "./connectionTest";
import retrieveStats from "./retrieveStats";
import submitPlans from "./submitPlans";
import toLocalMidnight from "./toLocalMidnight";
import { genDaysOfCurrentWeek, parseDate } from "@/utils/genDefaultCardData"
import { toast } from "sonner";

async function launchDummyConnection() {
    const demoPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ message: "Simulated connection tests were successful!" });
    }, 3000);
    });

    await toast.promise(demoPromise, {
        loading: "Simulating system connection tests...",
        success: (resp) => resp.message,
        error: "Demo failed (this should never happen)",
    });
}

async function launchRealConnection(config) {
    try {
        const connectResp = connectionTest(config);
        await toast.promise(connectResp, {
        loading: 'Testing system connections...',
        success: (connectResp) => `${connectResp.message}`,
        error: (connectResp) => `${connectResp.message}`
        })
    } catch (error) {
        console.log("connectTest failed due to an internal error: ", error)
        toast.error("Error: There was an unexpected problem testing system connections!")
    }
}

export async function launchConnectionTest(config, capabilities) {
    if (capabilities?.canTestConnections) {
        await launchRealConnection(config)
    } else {
        await launchDummyConnection()
    }
}

async function retrieveDummyData(demoStats, setStats) {
    const demoPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ message: "Mock statistical data retrieved!",
            data: demoStats
            });
    }, 2000);
    });

    await toast.promise(demoPromise, {
    loading: "Simulating statistical data retrieval...",
    success: (resp) => {
        setStats(resp.data)
        return resp.message
    },
    error: "Demo failed (this should never happen)",
    });
}

async function retrieveRealData(config, setStats, cancelled) {
    try {
        let flaskURL = config.flaskUrl.db.stats
        const regex = /^\d{4}-\d{2}-\d{2}$/
        const start_ok = regex.test(config.filter_start_date)
        const end_ok = regex.test(config.filter_end_date)
        if (!start_ok || !end_ok) {
            throw new Error("Invalid arguments passed to retrieveStats")
        }

        const query_str = `start=${config.filter_start_date}&end=${config.filter_end_date}`
        flaskURL += `?${query_str}`
        
        const promise = retrieveStats(flaskURL); // resolves to { message, details, data }

        // bind toast to the same promise (don’t await the toast)
        toast.promise(promise, {
            loading: 'Retrieving statistical data...',
            success: (r) => r?.message ?? 'Stats loaded',
            error:   (err) => "Error: Stats Retrieval Failure!",
        });

        const res = await promise; // get full object back
        if (!cancelled && res?.data) setStats(res.data);
    } catch (err) {
        console.error('Stats init error:', err);
    }
}

export async function launchStatRetrieval(config, capabilities, demoStats, setStats, cancelled) {
    if (capabilities?.statsSource === "real") {
        await retrieveRealData(config, setStats, cancelled)
    } else {
        await retrieveDummyData(demoStats, setStats)
    }
}

export function reformatTasks(tasks) {
    return tasks.map(task => (
        {
            ...task, 
            "start_date": toLocalMidnight(task["start_date"]),
            "due_date": toLocalMidnight(task["due_date"])
        }
    ))
}

export function parseTaskDates(tasks) {
    const days = genDaysOfCurrentWeek()
    // parse the task date from "Monday" to "2025-10-13"
    return tasks.map(task => {
        const startDate = parseDate(task["start_date"], days)
        const dueDate = parseDate(task["due_date"], days)

        return {
            ...task,
            "start_date": toLocalMidnight(startDate),
            "due_date": toLocalMidnight(dueDate)
        }
    })
}

export const handleClickDemo = async () => {
    if (inFlightRef.current) return;
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 4000)
    );
    inFlightRef.current = promise;
    setIsDisabled(true);
    try {
      await toast.promise(promise, {
        loading: "Mocking plan submission...",
        success: () => "Mock submission successful!",
        error: "Error: Mock submission failed!",
      });
    } finally {
      inFlightRef.current = null;
      setIsDisabled(false);
    }
  };


async function handleRealSubmit(config, capabilities, tasks, setIsDisabled) {
    setIsDisabled(true)
    const filter_start_date = config?.filter_start_date
    const filter_end_date = config?.filter_end_date
    const url = config?.flaskUrl?.plan_submissions

    const submitToast = async (tasks, filter_start_date, filter_end_date, url) => {
        const respPromise = submitPlans(tasks, filter_start_date, filter_end_date, url);
        toast.promise(respPromise, {
            loading: 'Submitting plan data...',
            success: (resp) => `${resp.message}`,
            error: (resp) => `${resp.message}`
        })
        return respPromise
    }

    let resp = {ok: null, message: null, details: null}
    try {
        resp = await submitToast(tasks, filter_start_date, filter_end_date, url);
    } catch (e) {
        console.log(`Submission error: ${e.message}`)
        resp.ok = false
        resp.message = e.message
        resp.details = e;
    } finally {
        setIsDisabled(false)
        return resp
    }
}

async function handleDummySubmit(setIsDisabled) {
    setIsDisabled(true)

    const submitToast = async () => {
        const demoPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve({message: "Simulated plan submission susscessfully!"})
            }, 3000)
        })
        await toast.promise(demoPromise, {
            loading: "Simulating plan submission",
            success: (resp) => resp.message,
            error: "Demo failed (this should never happen)",
        })
    }

    let resp = {ok: true, message: "Dummy plan submission was successful", details: "Submission successful"}
    try {
        await submitToast();
    } catch (e) {
        console.log(`Submission error: ${e.message}`)
        resp.ok = false
        resp.message = e.message
        resp.details = e;
    } finally {
        setIsDisabled(false)
        return resp;
    }
}

export async function handleSubmit(config, capabilities, tasks, setIsDisabled) {
    let resp = {ok: null, message: null, details: null}
    if (capabilities?.canSubmitPlans) {
        resp = await handleRealSubmit(config, capabilities, tasks, setIsDisabled)
    } else {
        resp = await handleDummySubmit(setIsDisabled);
    }
    return resp;
}