'use client';
import { FederationProvider } from '@/common/providers';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/common/theme';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <FederationProvider>
          <body>{children}</body>
        </FederationProvider>
      </ThemeProvider>
    </html>
  );
};
export default RootLayout;
