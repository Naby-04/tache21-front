import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { ContextProvider } from './Contexts/DashboardUser/UseContext.jsx'
import { FormProvider } from './Contexts/FormContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import "./utils/pdfConfig.js"

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ContextProvider>
        <AuthProvider>
      <FormProvider>
      <App />
      </FormProvider>
      </AuthProvider>
      </ContextProvider>
    </StrictMode>,
  )

