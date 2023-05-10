import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render, screen } from '@testing-library/react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import theme from './theme'

const appContent = 'Об игре';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})
