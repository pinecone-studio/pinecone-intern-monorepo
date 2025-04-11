import { PropsWithChildren } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Custom AI Chat',
  description: 'Your personalized AI agent',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              {children}
            </ThemeProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
