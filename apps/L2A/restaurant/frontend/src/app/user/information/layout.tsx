import { PropsWithChildren } from 'react';

import { ApolloWrapper } from '@/components/providers';
import Header from '@/app/_components/Header';

export const metadata = {
  title: 'Restaurant | Pinecone',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
