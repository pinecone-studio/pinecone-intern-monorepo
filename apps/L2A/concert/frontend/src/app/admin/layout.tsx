import { PropsWithChildren } from 'react';
import { ApolloWrapper } from '@/components/providers';
import { Header } from './_components/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
