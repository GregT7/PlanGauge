import { persistentFetch } from './persistentFetch';

export default async function connectionTest() {
    const flask_url = "http://localhost:5000/api/health";
    const supabase_url = "http://localhost:5000/api/db/health";
    const notion_url = "http://localhost:5000/api/notion/health";
    try {
        const flask_response = await persistent_fetch(flask_url, "Flask")
        let supabase_response = null, notion_response = null
        
        if (flask_response?.ok) {
            console.log("Flask is connected!")
            supabase_response = await persistentFetch(supabase_url, "Supabase");
            if (supabase_response?.ok) {
                notion_response = await persistentFetch(notion_url, "Notion");
                accept = notion_response?.ok
            }
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
        toast.error("Internal error! App may not be fully functional...");
        console.log("Health check failed! Internal error occured...", error);
        return {
            'error': error,
            'message': toString(error)
        }
    }

}