import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import theme from './theme'
import './assets/styles.less'
import { ThemeWrapper } from './ThemeWrapper'
import { startServiceWorker } from './utils/startServiceWorker'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ThemeWrapper>
              <App />
            </ThemeWrapper>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  </StrictMode>
)

startServiceWorker();
