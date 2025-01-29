import { PropsWithChildren } from 'react';
import './global.css';
import { ApolloWrapper } from '@/components/providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Real Estate',
  description: 'Platform by Real Estate Company',
};

interface RootLayoutProps extends PropsWithChildren {
  showHeader?: boolean;
  showFooter?: boolean;
}

const RootLayout = ({ children, showHeader = false, showFooter = false }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        {showHeader && <Header />}
        <ApolloWrapper>{children}</ApolloWrapper>
        {showFooter && <Footer />}
      </body>
    </html>
  );
};

export default RootLayout;
