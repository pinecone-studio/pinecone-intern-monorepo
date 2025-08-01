import './global.css';

import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ApolloWrapper } from '../components/providers/ApolloWrapper';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="mn">
      <body>
        <AppRouterCacheProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
          <CssBaseline />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
