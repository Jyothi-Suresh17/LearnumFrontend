import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import DataShare from './context/DataShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <DataShare>
    <App />
   </DataShare>
  
   </BrowserRouter>
  </StrictMode>,
)
