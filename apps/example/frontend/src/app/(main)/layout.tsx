'use client';

import { Footer, Header } from '../../components';
import { PropsWithChildren } from 'react';
import { ApolloWrapper } from '../../components/providers';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <ApolloWrapper>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </ApolloWrapper>
  );
};

export default MainLayout;
