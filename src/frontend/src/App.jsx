import './App.css'
import { useEffect, useContext } from 'react';
import { Toaster, toast } from 'sonner'
import { ThemeProvider } from './components/ui/ThemeProvider'
import { ConfigContext } from "@/contexts/ConfigContext"
import { AuthContext } from './contexts/AuthContext';
import TaskTable from "./components/TaskTable/TaskTable"
import StatCardSystem from "./components/StatCardSystem/StatCardSystem";
import SubmissionButton from "./components/SubmissionButton/SubmissionButton";

import EvaluationSection from "./components/EvaluationSection/EvaluationSection";
import { launchConnectionTest } from './utils/modeUtils';
import { MODES, MODE_CONFIG } from './contexts/modeConfig';
import LoginModal from './components/AuthenticationSystem/LoginModal';
import ModeDispay from "./components/AuthenticationSystem/ModeDisplay"
import AuthenticationSystem from './components/AuthenticationSystem/AuthenticationSystem';

function App() {
  const config = useContext(ConfigContext)
  const { mode, authLoaded } = useContext(AuthContext);

  useEffect(() => {
    if (!authLoaded) return;

    const launchSetupApp = async () => {
      const capabilities = MODE_CONFIG?.[mode] ?? MODE_CONFIG[MODES.VISITOR];
      await launchConnectionTest(config, capabilities);
    };

    launchSetupApp();
  }, [authLoaded, mode]);

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        <Toaster expand={true} richColors data-testid="toaster"/>
          <h1 className="m-0 text-4xl leading-none">PlanGauge</h1>
          <AuthenticationSystem/>
          <div className="space-y-10 pt-5">
            <TaskTable/>
            <StatCardSystem/>
            <EvaluationSection/>
            <SubmissionButton/>
          </div>
      </ThemeProvider>
  );
}

export default App