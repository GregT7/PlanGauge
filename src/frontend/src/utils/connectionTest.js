import { toast } from 'sonner'

export async function timed_fetch(url, service_str, timeoutDuration) {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeout_reference = setTimeout(() => controller.abort(), timeoutDuration);

    const fetch_response = await fetch(url, { signal }).then((response) => {
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

export async function persistent_fetch(url, service_str, timeoutDuration = 2500) {
    let fetch_response;

    for (let i = 1; i < 4; ++i) {
        fetch_response = await timed_fetch(url, service_str, timeoutDuration * i)

        if (fetch_response?.ok) {
            break;
        }
    }

    return fetch_response;
}

export async function connectionTest() {
    const flask_url = "http://localhost:5000/api/health";
    const supabase_url = "http://localhost:5000/api/db/health";
    const notion_url = "http://localhost:5000/api/notion/health";
    try {
        const flask_response = await persistent_fetch(flask_url, "Flask")
        
        if (flask_response?.ok) {
            const supabase_response = await persistent_fetch(supabase_url, "Supabase");
            if (!supabase_response?.ok) {
                toast.error("Database (Supabase) is currently unavailable...");
            }
            
            const notion_response = await persistent_fetch(notion_url, "Notion");
            if (!notion_response?.ok) {
                toast.error("Notion is currently unavailable...");
            }

            if (notion_response?.ok && supabase_response?.ok) {
                toast.success("All systems are online!");
            }
        }
        else {
            toast.error("Flask is currently inaccessible...")
        }

    } catch (error) {
        console.log("Health check failed! Internal error occured...", error);
        toast.error("Internal error! App may not be fully functional...")
    }

}