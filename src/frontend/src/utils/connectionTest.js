import { toast } from 'sonner'
import { persistentFetch } from './persistentFetch';


export async function connectionTest() {
    const flask_url = "http://localhost:5000/api/health";
    const supabase_url = "http://localhost:5000/api/db/health";
    const notion_url = "http://localhost:5000/api/notion/health";
    try {
        const flask_response = await persistentFetch(flask_url, "Flask")
        let supabase_response = null, notion_response = null
        
        const pass_msg = "All systems are online!"
        const fail_msg = "Error: connectivity issues!"

        let accept = false
        let resp = {message: null, details: null}

        if (flask_response?.ok) {
            console.log("Flask is connected!")
            supabase_response = await persistentFetch(supabase_url, "Supabase");
            notion_response = await persistentFetch(notion_url, "Notion");
            accept = notion_response?.ok && supabase_response?.ok
        }
        
        resp.details = {flask_response, supabase_response, notion_response}
        if (accept) {
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
        const resp = {'message': msg, 'details': error}
        console.log(resp);
        return Promise.reject(resp)
    }

}