import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import ThemeWrapper from './ThemeWrapper'
import { store } from './store/store'
import './assets/styles.less'
import { startServiceWorker } from './startServiceWorker'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeWrapper />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
)

startServiceWorker()
