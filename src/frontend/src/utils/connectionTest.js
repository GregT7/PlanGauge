import { toast } from 'sonner'
import { persistentFetch } from './persistentFetch';

export default async function connectionTest() {
    // const apiBase = import.meta.env.VITE_BASE_ROUTE + import.meta.env.VITE_FLASK_DEFAULT_PORT;
    const apiBase = import.meta.env.VITE_RENDER_URL;
    const flask_url = apiBase + import.meta.env.VITE_FLASK_HEALTH_ROUTE;
    const supabase_url = apiBase + import.meta.env.VITE_SUPABASE_HEALTH_ROUTE;
    const notion_url = apiBase + import.meta.env.VITE_NOTION_HEALTH_ROUTE;    
    try {
        const fetchHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_OWNER_TOKEN}`
        }
        const flask_response = await persistentFetch(flask_url, fetchHeaders, "Flask")
        let supabase_response = null, notion_response = null
        
        const pass_msg = "All Systems Online!"
        const fail_msg = "Error: Connectivity Issues!"

        let accept = false
        let resp = {ok: false, message: null, details: null}

        if (flask_response?.ok) {
            console.log("Flask is connected!")
            supabase_response = await persistentFetch(supabase_url, fetchHeaders, "Supabase");
            notion_response = await persistentFetch(notion_url, fetchHeaders, "Notion");
            accept = notion_response?.ok && supabase_response?.ok
        }
        
        resp.details = {flask_response, supabase_response, notion_response}
        if (accept) {
            resp.ok = true
            resp.message = pass_msg
            console.log(resp);
            return Promise.resolve(resp)
        } else {
            resp.message = fail_msg
            console.log(resp);
            return Promise.reject(resp)
        }
    } catch (error) {
        const msg = "An unexpected error occured!"
        const resp = {ok: false, message: msg, details: error}
        console.log(resp);
        return Promise.reject(resp)
    }

}