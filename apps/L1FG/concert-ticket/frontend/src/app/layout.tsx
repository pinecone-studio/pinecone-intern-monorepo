'use client';
/*eslint-disable*/ import { PropsWithChildren, Suspense } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import { usePathname } from 'next/navigation';
import { HeaderPart } from '@/components/header/Header';
import { Footerr } from '../components/footer/Footer';
import { AlertProvider } from '@/components/providers/AlertProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();
  const signUp = pathName.startsWith('/signup');
  const login = pathName.startsWith('/signin');
  const admin = pathName.startsWith('/admin');
  return (
    <html lang="en">
      <body className="bg-black">
        <Suspense>
          <ApolloWrapper>
            <AlertProvider>
              <AuthProvider>
                {!signUp && !login && !admin && <HeaderPart />}
                {children}
                {!signUp && !login && !admin && <Footerr />}
              </AuthProvider>
            </AlertProvider>
          </ApolloWrapper>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
