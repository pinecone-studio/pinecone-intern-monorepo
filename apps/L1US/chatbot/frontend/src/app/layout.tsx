import { PropsWithChildren } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { AuthProviderSignIn } from '@/components/providers/AuthProviderSignIn';

export const metadata = {
  title: 'Custom AI Chat',
  description: 'Your personalized AI agent',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProviderSignIn>{children}</AuthProviderSignIn>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
