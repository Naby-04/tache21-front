import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { ContextProvider } from './Contexts/DashboardUser/UseContext.jsx'
import { FormProvider } from './Contexts/FormContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'

import { pdfjs } from 'react-pdf';

// 📌 Pour charger le worker depuis le CDN (évite les erreurs de chemin/mime)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;


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
