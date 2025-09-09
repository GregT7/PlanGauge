import TaskContextProvider from "../src/contexts/TaskContext";
import { ThemeProvider } from './components/ui/ThemeProvider'
import TaskTable from "./components/TaskTable/TaskTable"
import StatCardSystem from "./components/StatCardSystem/StatCardSystem";
import cardData from "@/utils/cardData";
import { connectionTest } from "./utils/connectionTest";
import { useEffect } from 'react';
import { Toaster } from 'sonner'
import './App.css'


function App() {
  useEffect(() => {
    connectionTest()
  }, []);

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        <Toaster expand={true} richColors data-testid="toaster"/>
          <h1 className="m-0 text-4xl leading-none">PlanGauge</h1>
            <TaskContextProvider>
              <div className="space-y-10 pt-5">
                <TaskTable/>
                <StatCardSystem cardData={cardData}/>
              </div>
            </TaskContextProvider>   
        </ThemeProvider>
  );
}

export default App
