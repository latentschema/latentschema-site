import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FnbPulsePage from './FnbPulsePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FnbPulsePage />
  </StrictMode>,
)
