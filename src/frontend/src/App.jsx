import TaskContextProvider from "../src/contexts/TaskContext";
import { ThemeProvider } from './components/ui/ThemeProvider'
import TaskTable from "./components/TaskTable"
import './App.css'
// import TestTable2 from "./components/TestTable2"

function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
          <h1 className="pb-5 m-0 text-4xl leading-none">PlanGauge</h1>
            <TaskContextProvider>
              <TaskTable/>
            </TaskContextProvider>
        </ThemeProvider>
  );
}

export default App
