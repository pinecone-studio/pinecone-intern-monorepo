'use client';
import './global.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ApolloWrapper } from '../components/providers/ApolloWrapper';
import { AuthProvider } from './context/AuthContext';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className="m-0 h-full" lang="mn">
      <body>
        <AppRouterCacheProvider>
          <ApolloWrapper>
            <AuthProvider>{children}</AuthProvider>
          </ApolloWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
