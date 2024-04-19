import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#121316',
      light: '#3F4145',
      contrastText: '#ffffff',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
