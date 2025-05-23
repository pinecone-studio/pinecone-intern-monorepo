import { PropsWithChildren } from 'react';
import { ApolloWrapper } from '@/components/providers';
import { AuthProvider } from '@/components/providers/AuthProvider';
import Header from '../_components/Header';

export const metadata = {
  title: 'Restaurant | Pinecone',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <AuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
