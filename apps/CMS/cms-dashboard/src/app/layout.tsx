'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { FederationProvider } from '../common';
import './global.css';
import { theme } from '../theme';

// export const metadata = {
//   title: 'Welcome to glms-dashboard',
//   description: 'Generated by create-nx-workspace',
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FederationProvider>
          <body>{children}</body>
        </FederationProvider>
      </ThemeProvider>
    </html>
  );
};
export default RootLayout;
