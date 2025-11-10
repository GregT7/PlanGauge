import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigContextProvider } from '@/contexts/ConfigContext'

createRoot(document.getElementById('root')).render(
    <ConfigContextProvider>
        <App/>
    </ConfigContextProvider>
)