import connectionTest from "./connectionTest";
import retrieveStats from "./retrieveStats";
import { toast } from "sonner";

export default async function setupApp() {
    let resp
    
    try {
        const connectResp = connectionTest();
        await toast.promise(connectResp, {
          loading: 'Testing system connections...',
          success: (connectResp) => `${connectResp.message}`,
          error: (connectResp) => `${connectResp.message}`
        })

        resp = await connectResp;

        if (resp.ok) {
            try {
                let statsResp = retrieveStats();
                await toast.promise(statsResp, {
                    loading: 'Retrieving statistical data...',
                    success: (statsResp) => `${statsResp.message}`,
                    error: (statsResp) => `${statsResp.message}`
                })
            } catch (error) {
                console.log("Stats retrieval failed due to an internal error: ", error)
                toast.error("Error: There was an unexpected problem retrieving statistical data!")
            }
        }
    } catch (error) {
        console.log("connectTest failed due to an internal error: ", error)
        toast.error("Error: There was an unexpected problem testing system connections!")
    }
}