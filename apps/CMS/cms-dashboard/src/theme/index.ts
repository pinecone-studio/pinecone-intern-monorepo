'use client';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#121316',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#121316',
    },
  },
  spacing: 8,
});
