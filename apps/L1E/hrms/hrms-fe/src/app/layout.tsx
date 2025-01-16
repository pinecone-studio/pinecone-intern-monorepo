'use client';
import { PropsWithChildren } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import { Header } from '@/components/Header';

import { usePathname } from 'next/navigation';
import { UserProvider } from '@/provider/UserProvider';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <UserProvider>
            {pathname === '/login' ? (
              <> {children}</>
            ) : (
              <div>
                <Header />
                {children}
              </div>
            )}
          </UserProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
