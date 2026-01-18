import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Geist Sans',
            'sans-serif'
        ].join(','),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Geist Sans';
                    font-display: swap;
        }
            `,
        },
    },
    palette: {
    primary: {
      main: '#0070f3', 
      light: '#3291ff',
      dark: '#0025d2',
      contrastText: '#fff', 
    },
    secondary: {
      main: '#ff0080',
    },
    background: {
      default: '#fafafa', 
      paper: '#ffffff',  
    },
    status: {
      error: '#ff1a1a',
      warning: '#ffb700',
      success: '#05ff2f',
    },
    }
});

export default theme;