import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { MODE_CONFIG, MODES } from "./modeConfig";
import { ConfigContext } from "@/contexts/ConfigContext"
import resolveUser from "@/utils/resolveUser";

export const AuthContext = createContext(null);

async function loadSession(setUser, setMode, setAuthLoaded, config) {
    try {
        const resp = await fetch(config.flaskUrl.auth.me, {
            method: "GET",
            credentials: "include"
        })
        if (resp?.ok) {
            const data = await resp.json();
            setUser(data?.user)
            const mode = resolveUser(data?.user?.role)
            setMode(mode)
        } else {
            setMode(MODES.VISITOR)
        }
    } catch (e) {
        setMode(MODES.VISITOR)
    } finally {
        setAuthLoaded(true);
    }
    
}

export function AuthContextProvider({ children }) {
    const config = useContext(ConfigContext)
    const [user, setUser] = useState(null);        // { id, email } or null
    const [mode, setMode] = useState(MODES.VISITOR);        // "owner" | "guest" | null
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        loadSession(setUser, setMode, setAuthLoaded, config);
    }, [])

    const value = {user, setUser, mode, setMode, authLoaded, setAuthLoaded};
  
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}