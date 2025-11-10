import connectionTest from "./connectionTest";
import { toast } from "sonner";

export default async function setupApp(config) {
    if (config.isDemo) {
        const demoPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Demo mode active — system connections simulated successfully!" });
        }, 3000);
        });

        await toast.promise(demoPromise, {
        loading: "Simulating system connections...",
        success: (resp) => resp.message,
        error: "Demo failed (this should never happen)",
        });
    }
    else {
        try {
            const connectResp = connectionTest(config);
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
}