import { Theme, createTheme } from '@mui/material/styles'

const basicTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          color: 'rgba(34, 58, 71, 1)'
        },

        containedPrimary: {
          backgroundColor: 'rgba(175, 186, 190, 1)',

          '&:hover': {
            backgroundColor: 'rgba(157, 167, 173, 1)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '40px'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'rgba(175, 186, 190, 1)',
          color: 'rgba(34, 58, 71, 1)'
        }
      }
    }
  }
})

const theme: Theme = createTheme(basicTheme)

export default theme
