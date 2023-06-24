import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.less'
import App from './App'
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles'
import { useMemo } from 'react'
import { Store } from './store/store.types'

export default function ThemeWrapper() {
  const mode: 'light' | 'dark' = useSelector(
    (state: Store) => state.theme.theme
  )
  console.log(mode)

  const MUITheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === 'light' || mode === 'dark' ? mode : 'light',
          primary: {
            light: '#AFBABE',
            main: '#AFBABE',
            dark: '#3C3532',
            contrastText: '#383339',
          },
          secondary: {
            light: '#D0D1CF',
            main: '#D0D1CF',
            dark: '#77584C',
            contrastText: '#ffffff',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                borderRadius: '30px',
                textTransform: 'none',
                color:
                  theme.palette[
                    theme.palette.mode === 'light' ? 'primary' : 'secondary'
                  ].contrastText,
              }),

              containedPrimary: ({ ownerState, theme }) => ({
                backgroundColor: theme.palette.secondary[theme.palette.mode],

                '&:hover': {
                  backgroundColor: theme.palette.secondary[theme.palette.mode],
                  opacity: 0.87,
                },
              }),
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                marginBottom: '40px',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: ({ ownerState, theme }) => ({
                backgroundColor: theme.palette.primary[theme.palette.mode],
                color:
                  theme.palette[
                    theme.palette.mode === 'light' ? 'primary' : 'secondary'
                  ].contrastText,
              }),
            },
          },
          MuiAvatar: {
            styleOverrides: {
              colorDefault: ({ ownerState, theme }) => ({
                backgroundColor: theme.palette.secondary[theme.palette.mode],
                color: theme.palette.secondary.contrastText,
              }),
            },
          },
          MuiSwitch: {
            styleOverrides: {
              colorPrimary: {
                '&.Mui-checked': {
                  // thumb - checked
                  color: '#f2f595',
                },
              },

              track: ({ ownerState, theme }) => ({
                backgroundColor: '#909dab',
                '.Mui-checked.Mui-checked + &': {
                  // track - checked
                  backgroundColor: '#dbe04f',
                },
              }),
            },
          },
        },
      }),
    [mode]
  )

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={MUITheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
