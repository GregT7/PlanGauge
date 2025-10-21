import verifyStatsData from "./verifyStatsData";

// # curl "http://127.0.0.1:5000/api/db/stats?start=2025-06-01&end=2025-06-30"
export default async function retrieveStats(start, end, url, IS_DEMO) {

    let finalURL;
    if (IS_DEMO) {
        finalURL = import.meta.env.VITE_STATS_TESTING_ROUTE
    } else {
        const regex = /^\d{4}-\d{2}-\d{2}$/
        const start_ok = regex.test(start)
        const end_ok = regex.test(end)
        if (!start_ok || !end_ok) {
            throw new Error("Invalid arguments passed to retrieveStats")
        }

        const query_str = `start=${start}&end=${end}`
        finalURL = `${url}?${query_str}`
    }

    let resp = {
        message: "Error: Received no response from database!",
        details: null,
        data: null
    }
    const dbResp = await fetch(finalURL)
    if (dbResp === null) {
        console.log(resp.message)
        return Promise.reject(resp)
    }

    const dbRespBody = await dbResp.json()
    if (dbRespBody === null) {
        console.log(resp.message)
        return Promise.reject(resp)
    } else if (!dbRespBody?.ok) {
        const default_msg = "db response is NOT ok & no error object in response's body"
        console.log(dbRespBody?.error?.message || default_msg)
        resp.message = dbRespBody?.error?.message || default_msg
        resp.details = dbRespBody
        return Promise.reject(resp)
    } else if (!verifyStatsData(dbRespBody?.data)) {
        console.log("Error: Stats Data Is Invalid!")
        resp.message = "Error: Stats Data Is Invalid!"
        resp.details = dbRespBody
        resp.data = dbRespBody?.data
        return Promise.reject(resp)
    }

    resp.message = "Data Successfully Retrieved And Processed!"
    resp.details = dbRespBody
    resp.data = dbRespBody.data

    console.log("Stats access attempt was successful: ", resp)
    return Promise.resolve(resp)
    
}