import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { store } from './store/store'
import { Provider } from 'react-redux'

const appContent = 'Загрузка...';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})
