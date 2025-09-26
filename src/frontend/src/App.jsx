import TaskContextProvider from "../src/contexts/TaskContext";
import { ThemeProvider } from './components/ui/ThemeProvider'
import TaskTable from "./components/TaskTable/TaskTable"
import StatCardSystem from "./components/StatCardSystem/StatCardSystem";
import testCardData from "@/utils/testCardData";
import SubmissionButton from "./components/SubmissionButton";
import connectionTest from "./utils/connectionTest";
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner'
import './App.css'


function App() {
  useEffect(() => {
    const launchConnectionTest = async () => {
      try {
        const resp = connectionTest();
        await toast.promise(resp, {
          loading: 'Testing system connections...',
          success: (resp) => `${resp.message}`,
          error: (resp) => `${resp.message}`
        })
      } catch (error) {
        console.log("connectTest failed due to an internal error: ", error)
        toast.error("Submission failed due to an internal error...")
      }
    }

    launchConnectionTest();
  }, []);

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        <Toaster expand={true} richColors data-testid="toaster"/>
          <h1 className="m-0 text-4xl leading-none">PlanGauge</h1>
            <TaskContextProvider>
              <div className="space-y-10 pt-5">
                <TaskTable/>
                <StatCardSystem cardData={testCardData}/>
                <SubmissionButton status="neutral"/>
              </div>
            </TaskContextProvider>   
        </ThemeProvider>
  );
}

export default App