'use client';
import { ThemeProvider } from '@mui/material';
import { FederationProvider } from '../common';
import './global.css';
import { theme } from '../theme';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <FederationProvider>
        <body>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </body>
      </FederationProvider>
    </html>
  );
};
export default RootLayout;
