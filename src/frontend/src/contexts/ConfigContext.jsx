import React, { createContext, useContext } from "react";
import config from "@/utils/config";

export const ConfigContext = createContext(config);

export function ConfigContextProvider({children}) {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  )
}