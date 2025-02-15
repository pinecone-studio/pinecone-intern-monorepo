import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { ApolloWrapper } from '@/components/providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
export const metadata = {
  title: 'Welcome to example-frontend',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <NuqsAdapter>
            {children}
            <ToastContainer position="top-right" />
          </NuqsAdapter>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
