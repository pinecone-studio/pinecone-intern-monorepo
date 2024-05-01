'use client';
import { CssBaseline } from '@mui/material';
import { FederationProvider } from '../common';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../common/providers/AuthProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <FederationProvider>
            <AuthProvider>
              {children}
              <ToastContainer />
            </AuthProvider>
          </FederationProvider>

          <CssBaseline />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};
export default RootLayout;
