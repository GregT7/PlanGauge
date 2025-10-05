import TaskContextProvider from "../src/contexts/TaskContext";
import { ThemeProvider } from './components/ui/ThemeProvider'
import TaskTable from "./components/TaskTable/TaskTable"
import StatCardSystem from "./components/StatCardSystem/StatCardSystem";
import SubmissionButton from "./components/SubmissionButton/SubmissionButton";
import setupApp from "./utils/setupApp";
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner'
import './App.css'
import EvaluationSection from "./components/EvaluationSection/EvaluationSection";
import { ProcessingContextProvider } from "@/contexts/ProcessingContext"


function App() {
  useEffect(() => {
    const launchSetupApp = async () => {
      await setupApp()
    }

    launchSetupApp();
  }, []);

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        <Toaster expand={true} richColors data-testid="toaster"/>
          <h1 className="m-0 text-4xl leading-none">PlanGauge</h1>
            <TaskContextProvider>
              <ProcessingContextProvider>
                  <div className="space-y-10 pt-5">
                    <TaskTable/>
                    <StatCardSystem/>
                    <EvaluationSection/>
                    <SubmissionButton status="neutral"/>
                  </div>
              </ProcessingContextProvider>
            </TaskContextProvider>   
        </ThemeProvider>
  );
}

export default App