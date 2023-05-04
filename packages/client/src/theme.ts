import { Theme, createTheme } from '@mui/material/styles';

const basicTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '30px',
                    textTransform: 'none',
                },
                containedPrimary: {
                    backgroundColor: '#873800',
                    "&:hover": {
                        backgroundColor: '#ba4d00',
                    }
                }
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '20px',
                }
            },
        }
    },
});

const theme: Theme = createTheme(basicTheme);

export default theme;
