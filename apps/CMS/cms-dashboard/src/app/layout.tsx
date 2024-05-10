'use client';
import { FederationProvider } from '../common';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../common/providers/AuthProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ResetPasswordProvider } from '@/common/providers/ResetPasswordProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <FederationProvider>
            <AuthProvider>
              <ResetPasswordProvider>{children}</ResetPasswordProvider>
              <ToastContainer />
            </AuthProvider>
          </FederationProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};
export default RootLayout;
