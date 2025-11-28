export async function timedFetch(url, fetchHeaders, service_str, timeoutDuration) {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeout_reference = setTimeout(() => controller.abort(), timeoutDuration);

    const fetch_response = await fetch(url, {
      method: "GET",
      signal,
      headers: fetchHeaders,
      credentials: "include"
    }).then((response) => {
        console.log(`${service_str}: fetch response received...`, response);
        return response;
    }).catch((error) => {
        if (error.name === "AbortError") {
            console.log(`${service_str}: Fetch request was aborted after ${timeoutDuration} ms`);
        } else {
            console.log(`${service_str}: Fetch Internal Error`);
        }
        return error;
    }).finally(() => {
        clearTimeout(timeout_reference);
    })

    return fetch_response
}

export async function persistentFetch(url, headers, service_str, timeoutDuration = 2500) {
    let fetch_response;

    for (let i = 1; i < 4; ++i) {
        fetch_response = await timedFetch(url, headers, service_str, timeoutDuration * i)

        if (fetch_response?.ok) {
            break;
        }
    }

    return fetch_response;
}