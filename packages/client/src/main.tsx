import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles.less'
import { ThemeWrapper } from './ThemeWrapper'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<StrictMode>
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <BrowserRouter>

        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>
</StrictMode>
)
