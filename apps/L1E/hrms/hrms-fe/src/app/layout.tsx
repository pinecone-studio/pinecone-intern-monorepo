'use client';
import { PropsWithChildren } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import { Header } from '@/components/Header';

import { usePathname } from 'next/navigation';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        {pathname === '/login' ? (
          <ApolloWrapper>{children}</ApolloWrapper>
        ) : (
          <div>
            <Header />
            <ApolloWrapper>{children}</ApolloWrapper>
          </div>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
