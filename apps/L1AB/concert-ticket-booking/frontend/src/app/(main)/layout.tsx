import { PropsWithChildren } from 'react';
import { ApolloWrapper } from '@/components/providers';
import { MainFooter } from '@/components/MainFooter';

export const metadata = {
  title: 'Welcome to example-frontend',
  description: 'Generated by create-nx-workspace',
};

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="bg-black">
        <ApolloWrapper>
          <div className="bg-background-main">
            {children}
            <MainFooter />
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default MainLayout;
