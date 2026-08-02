import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EnginePage from './EnginePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EnginePage />
  </StrictMode>,
)
