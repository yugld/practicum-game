import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles.css'

import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
