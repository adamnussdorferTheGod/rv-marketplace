import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Design tokens — import order matters (cascade: primitives -> theme -> globals)
import './styles/tokens.css'
import './styles/theme-rv.css'
import './styles/global.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
