'use client';
import { PropsWithChildren, Suspense } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import { usePathname } from 'next/navigation';
import { HeaderPart } from '@/components/header/Header';
import { Footerr } from '../components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/components/providers/AuthProvider';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();
  const signUp = pathName.startsWith('/signup');
  const login = pathName.startsWith('/signin');
  return (
    <html lang="en">
      <body className="bg-black">
        <Suspense>
          <ApolloWrapper>
            <AuthProvider>
              {!signUp && !login && <HeaderPart />}
              {children}
              {!signUp && !login && <Footerr />}
              <ToastContainer />
            </AuthProvider>
          </ApolloWrapper>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
