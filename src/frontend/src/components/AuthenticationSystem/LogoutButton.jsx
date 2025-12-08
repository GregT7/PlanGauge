import { Button } from "@/components/ui/button";
import { ConfigContext } from "@/contexts/ConfigContext";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { buttonVariants } from "@/components/ui/button";
import { logout } from "./logout"
import { MODES } from "@/contexts/modeConfig";
import { toast } from "sonner";
import styleData from "@/utils/styleData.json"
export default function LogoutButton() {

    const config = useContext(ConfigContext)
    const { mode, setAuthLoaded, setMode, setUser } = useContext(AuthContext)
    const [isDisabled, setIsDisabled] = useState(false)

    
    const submitLogout = async (url) => {
        const respPromise = logout(url)
        toast.promise(respPromise, {
            loading: 'Attempting logout...',
            success: (resp) => `${resp.message}`,
            error: (resp) => `${resp.message}`
        })
        return respPromise
    }

    const url = config?.flaskUrl?.auth?.logout ?? ""
    const handleOnClick = async () => {
        try {
            setIsDisabled(true)
            const loginResp = await submitLogout(url);
            if (loginResp?.ok) {
                setUser(null)
                setMode(MODES.VISITOR)
            } else {
                const defaultErrorMsg = "Error: There was an error while logging out, please try again..."
                toast.error(loginResp?.message ?? defaultErrorMsg)
            }
        } catch (e) {
            console.log(`Logout error: ${e.message}`)
        } finally {
            setIsDisabled(false)
        }
    }

    let loginStyles = styleData.neutral.base + " " + styleData.neutral.hover

    return (
        <Button className={loginStyles} disabled={isDisabled} onClick={handleOnClick}>Logout</Button>
    );
}