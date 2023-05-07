import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles.css'

import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
          <App />
  </React.StrictMode>
)
