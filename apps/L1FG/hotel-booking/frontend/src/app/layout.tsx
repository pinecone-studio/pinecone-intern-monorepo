import './global.css';
import { PropsWithChildren } from 'react';
import { ApolloWrapper, AuthProvider } from '@/components/providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from '@/components/ui/sonner';
export const metadata = {
  title: 'Welcome to example-frontend',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <NuqsAdapter>
              {children}
              <ToastContainer position="top-right" />
              <Toaster position="top-right" />
            </NuqsAdapter>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
