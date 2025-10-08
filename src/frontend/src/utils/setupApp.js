import connectionTest from "./connectionTest";
import retrieveStats from "./retrieveStats";
import { toast } from "sonner";

export default async function setupApp() {    
    try {
        const connectResp = connectionTest();
        await toast.promise(connectResp, {
          loading: 'Testing system connections...',
          success: (connectResp) => `${connectResp.message}`,
          error: (connectResp) => `${connectResp.message}`
        })
    } catch (error) {
        console.log("connectTest failed due to an internal error: ", error)
        toast.error("Error: There was an unexpected problem testing system connections!")
    }
}