import { PropsWithChildren, Suspense } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';

export const metadata = {
  title: 'Instagram',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <Suspense>
        <ApolloWrapper>
          <body className="flex">{children}</body>
        </ApolloWrapper>
      </Suspense>
    </html>
  );
};

export default RootLayout;
