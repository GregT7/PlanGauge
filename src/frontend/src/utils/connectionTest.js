import { toast } from 'sonner'
import { persistentFetch } from './persistentFetch';
import { timedFetch } from './persistentFetch';

// timedFetch(url, fetchHeaders, service_str, timeoutDuration)
export default async function connectionTest(config) {
    try {
        const fetchHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.ownerToken}`
        }

        const flask_response = await timedFetch(config.flaskUrl.health, fetchHeaders, "Flask", 12000)
        let supabase_response = null, notion_response = null
        
        const pass_msg = "All Systems Online!"
        const fail_msg = "Error: Connectivity Issues!"

        let accept = false
        let resp = {ok: false, message: null, details: null}

        if (flask_response?.ok) {
            console.log("Flask is connected!")
            supabase_response = await persistentFetch(config.flaskUrl.db.health, fetchHeaders, "Supabase");
            notion_response = await persistentFetch(config.flaskUrl.notion.health, fetchHeaders, "Notion");
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