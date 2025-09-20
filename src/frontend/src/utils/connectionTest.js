import { toast } from 'sonner'
import { persistentFetch } from './persistentFetch';

export async function connectionTest() {
    const flask_url = "http://localhost:5000/api/health";
    const supabase_url = "http://localhost:5000/api/db/health";
    const notion_url = "http://localhost:5000/api/notion/health";
    try {
        const flask_response = await persistentFetch(flask_url, "Flask")
        let supabase_response = null, notion_response = null
        
        if (flask_response?.ok) {
            console.log("Flask is connected!")
            supabase_response = await persistentFetch(supabase_url, "Supabase");
            if (!supabase_response?.ok) {
                toast.error("Database (Supabase) is currently unavailable...");
                console.log("Database (Supabase) is currently unavailable...");
            }
            
            notion_response = await persistentFetch(notion_url, "Notion");
            if (!notion_response?.ok) {
                toast.error("Notion is currently unavailable...");
                console.log("Notion is currently unavailable...");
            }

            if (notion_response?.ok && supabase_response?.ok) {
                toast.success("All systems are online!");
                console.log("All systems are online!");
            }
        }
        
        else {
            toast.error("Flask is currently unavailable...")
            console.log("Flask is currently unavailable...")
        }

        return {
            'flask': flask_response,
            'supabase': supabase_response,
            'notion': notion_response
        };
    } catch (error) {
        toast.error("Internal error! App may not be fully functional...");
        console.log("Health check failed! Internal error occured...", error);
        return {
            'error': error,
            'message': toString(error)
        }
    }

}