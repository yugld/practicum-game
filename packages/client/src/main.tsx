import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import theme from './theme'
import { ThemeWrapper } from './ThemeWrapper'
import { store } from './store/store'
import App from './App'
import './assets/styles.less'
import { startServiceWorker } from './startServiceWorker'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <ThemeWrapper>
                <App />
              </ThemeWrapper>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)

startServiceWorker();
