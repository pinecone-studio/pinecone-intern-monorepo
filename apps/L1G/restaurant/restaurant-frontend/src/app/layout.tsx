import './global.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ApolloWrapper } from '../components/providers/ApolloWrapper';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="mn">
      <body>
        <AppRouterCacheProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
<<<<<<< HEAD
          <CssBaseline />
=======
>>>>>>> 36d9ce25dd1f560c953bc50b6acba3874c8b6b94
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
