'use client';
import './global.css';
import { ThemeProvider } from '@mui/material';
import { FederationProvider } from '../common';
import { theme } from '../common/theme';
import Header from '../components/Header';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <FederationProvider>
          <body>
            <Header />
            {children}
          </body>
        </FederationProvider>
      </ThemeProvider>
    </html>
  );
};
export default RootLayout;
