import { Theme, createTheme } from '@material-ui/core/styles';

const basicTheme = createTheme({
    overrides: {
        MuiButton: {
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
        MuiTextField: {
            root: {
                marginBottom: '40px',
            }
        }
    },
});

const theme: Theme = createTheme(basicTheme);

export default theme;
