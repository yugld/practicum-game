import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render, screen } from '@testing-library/react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { store } from './store/store'
import { Provider } from 'react-redux'

const appContent = 'Загрузка...';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

jest.mock('./constants/env', () => ({
  VITE_LOCAL_SERVER_HOST: 'test',
}));

test('Example test', async () => {
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})
