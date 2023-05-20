import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import theme from './theme'
import './assets/styles.less'
import { ThemeWrapper } from './ThemeWrapper'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <ThemeWrapper>
                <App />
              </ThemeWrapper>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  </StrictMode>
)
