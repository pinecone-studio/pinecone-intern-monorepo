'use client';
import './global.css';

import { FederationProvider } from '../common';
import { theme } from '../common/theme';
import Header from '../components/Header';
import { ThemeProvider } from '@emotion/react';

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
