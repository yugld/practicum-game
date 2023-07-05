import { Theme, createTheme } from '@mui/material/styles'

const basicTheme = createTheme({
  palette: {
    mode: 'light',
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
          color: theme.palette.primary[theme.palette.mode],
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
          color: theme.palette.primary.contrastText,
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
  },
})

const theme: Theme = createTheme(basicTheme)

export default theme
