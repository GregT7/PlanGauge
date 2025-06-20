import TaskContextProvider from "../src/contexts/TaskContext";
import { ThemeProvider } from './components/ui/ThemeProvider'
import TaskTable from "./components/TaskTable/TaskTable"
import StatCardSystem from "./components/StatCardSystem/StatCardSystem";
import './App.css'

function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
          <h1 className="pb-5 m-0 text-4xl leading-none">PlanGauge</h1>
            <TaskContextProvider>
              <TaskTable/>
              <StatCardSystem/>
            </TaskContextProvider>
        </ThemeProvider>
  );
}

export default App
