import { useState } from 'react'
import reactLogo from './assets/react.svg'


import TaskContextProvider from "../src/contexts/TaskContext";
import { ThemeProvider } from './components/ui/ThemeProvider'
// import TestTable2 from "./components/TestTable2"
import TaskTable from "./components/TaskTable"
import './App.css'





function App() {
  

  return (

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        
          <h1 className="pb-5 m-0 text-4xl leading-none">PlanGauge</h1>
            <TaskContextProvider>
              <TaskTable></TaskTable>
            </TaskContextProvider>
          
        </ThemeProvider>

      
  );
}

export default App
