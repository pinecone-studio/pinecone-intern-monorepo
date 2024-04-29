'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { FederationProvider } from '../common';
import './global.css';
import { theme } from '../theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../common/providers/AuthProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <FederationProvider>
              <AuthProvider>
                {children}
                <ToastContainer />
              </AuthProvider>
            </FederationProvider>
          </ThemeProvider>
          <CssBaseline />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};
export default RootLayout;
