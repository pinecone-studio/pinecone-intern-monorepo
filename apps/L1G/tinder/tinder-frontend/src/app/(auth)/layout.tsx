import { AuthFooter } from '@/components/AuthFooter';
import { ApolloWrapper } from '@/components/providers/ApolloWrapper';
import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <html>
      <body>
        <ApolloWrapper>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              {children}
              <AuthFooter />
            </div>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default AuthLayout;
