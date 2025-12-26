import React from "react";
import { ConfigContextProvider } from "./ConfigContext";
import { TaskContextProvider } from "./TaskContext";
import { ProcessingContextProvider } from "./ProcessingContext";
import { AuthContextProvider } from "./AuthContext"; // new

export function AppProviders({ children }) {
  return (
    <ConfigContextProvider>
      <AuthContextProvider>
        <TaskContextProvider>
          <ProcessingContextProvider>
            {children}
          </ProcessingContextProvider>
        </TaskContextProvider>
      </AuthContextProvider>
    </ConfigContextProvider>
  );
}
