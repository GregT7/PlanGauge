import { toast } from 'sonner'

export default async function connectionTest() {
    const flask_url = "http://localhost:5000/api/health";
    const supabase_url = "http://localhost:5000/api/db/health";
    const notion_url = "http://localhost:5000/api/notion/health";
    try {
        const flask_response = await fetch(flask_url);
        const flask_json = await flask_response.json();
        console.log("Flask's Response: ", flask_json);

        if (flask_response.ok) {
            const supabase_response = await fetch(supabase_url);
            const supabase_json = await supabase_response.json();
            console.log("Supabase's Response: ", supabase_json);

            if (!supabase_response.ok) {
                toast.error("Database (Supabase) is currently unavailable...");
            }
            
            const notion_response = await fetch(notion_url);
            const notion_json = await notion_response.json();
            console.log("Notion's Response: ", notion_json);

            if (!notion_response.ok) {
                toast.error("Notion is currently unavailable...")
            }

            if (notion_response.ok && supabase_response.ok) {
                toast.success("All systems are online!")
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