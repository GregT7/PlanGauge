import TaskContextProvider from "../src/contexts/TaskContext";
import { ThemeProvider } from './components/ui/ThemeProvider'
import TaskTable from "./components/TaskTable/TaskTable"
import StatCardSystem from "./components/StatCardSystem/StatCardSystem";
import SubmissionButton from "./components/SubmissionButton/SubmissionButton";
import LoginButton from "./components/AuthenticationSystem/LoginButton";
import setupApp from "./utils/setupApp";
import { useEffect, useContext } from 'react';
import { Toaster, toast } from 'sonner'
import './App.css'
import EvaluationSection from "./components/EvaluationSection/EvaluationSection";
import { ProcessingContextProvider } from "@/contexts/ProcessingContext"
import { ConfigContext } from "@/contexts/ConfigContext"

function App() {
  const config = useContext(ConfigContext)

  useEffect(() => {
    const launchSetupApp = async () => {
      await setupApp(config)
    }

    launchSetupApp();
  }, []);

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        <Toaster expand={true} richColors data-testid="toaster"/>
          <h1 className="m-0 text-4xl leading-none">PlanGauge</h1>
          <LoginButton/>
            <TaskContextProvider>
              <ProcessingContextProvider>
                  <div className="space-y-10 pt-5">
                    
                    <TaskTable/>
                    <StatCardSystem/>
                    <EvaluationSection/>
                    <SubmissionButton/>
                  </div>
              </ProcessingContextProvider>
            </TaskContextProvider>   
        </ThemeProvider>
  );
}

export default App