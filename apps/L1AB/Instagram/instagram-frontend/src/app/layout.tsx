import { PropsWithChildren, Suspense } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import PageLoading from '@/components/PageLoading';

export const metadata = {
  title: 'Instagram',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="flex ">
        <Suspense fallback={<PageLoading />}>
          <ApolloWrapper>{children} </ApolloWrapper>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
