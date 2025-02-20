import { PropsWithChildren } from 'react';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloWrapper } from '@/components/providers';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { CacheProvider } from '@/components/providers/CacheProvider';
export const metadata = {
  title: 'Instagram',
  description: 'Instagram',
};
const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <CacheProvider>
              {children}
              <ToastContainer position="top-right" />
            </CacheProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
