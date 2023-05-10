import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles.less'
import { ThemeWrapper } from './ThemeWrapper'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </StrictMode>
)
