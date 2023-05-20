import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import theme from './theme'
import { ThemeWrapper } from './ThemeWrapper'
import { store } from './store/store'
import App from './App'
import './assets/styles.less'

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
