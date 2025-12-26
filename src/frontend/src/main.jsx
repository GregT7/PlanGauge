import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import { AppProviders } from '@/contexts/AppProviders'

createRoot(document.getElementById('root')).render(
    <AppProviders>
        <App/>
    </AppProviders>
)