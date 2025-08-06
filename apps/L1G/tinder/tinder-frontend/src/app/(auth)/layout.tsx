'use client';
import { AuthFooter } from '@/components/AuthFooter';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <ApolloWrapper>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
            {children}
            <AuthFooter />
          </div>
        </div>
      </AuthProvider>
    </ApolloWrapper>
  );
};

export default AuthLayout;
