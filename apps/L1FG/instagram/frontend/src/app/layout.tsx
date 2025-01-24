'use client';
import { PropsWithChildren } from 'react';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloWrapper } from '@/components/providers';
import { MenuButtons } from '@/components/Home/leftSideBar/MenuButtonsSideBar';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/components/providers/AuthProvider';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();
  const Signup = pathName.startsWith('/sign-up');
  const Login = pathName.startsWith('/log-in');

  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            {Signup || Login ? (
              <>
                {children}
                <ToastContainer position="top-right" />
              </>
            ) : (
              <div className="flex">
                <MenuButtons />
                {children}
                <ToastContainer position="top-right" />
              </div>
            )}
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
