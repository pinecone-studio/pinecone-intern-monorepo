'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { FederationProvider } from '../common';
import './global.css';
import { theme } from '../theme';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FederationProvider>{children}</FederationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
