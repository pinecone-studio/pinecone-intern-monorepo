import { PropsWithChildren } from 'react';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloWrapper } from '@/components/providers';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/components/providers/AuthProvider';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            {children}
            <ToastContainer position="top-right" />
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
