import LoginModal from "./LoginModal";
import LogoutButton from "./LogoutButton";
import ModeDisplay from "./ModeDisplay";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { determineCapabilities } from "@/contexts/modeConfig";
export default function AuthenticationSystem() {
    const { mode, authLoaded } = useContext(AuthContext);
    
    const capabilities = determineCapabilities(mode);
    return (
        <div className="flex justify-end-safe gap-4">
            <ModeDisplay/>
            {capabilities?.canLogin ? <LoginModal/> : <LogoutButton/>}
        </div>
    );
}