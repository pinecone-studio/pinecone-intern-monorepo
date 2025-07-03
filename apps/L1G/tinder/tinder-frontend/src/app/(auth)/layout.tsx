import { AuthFooter } from '@/components/AuthFooter';
import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        {children}
        <AuthFooter />
      </body>
    </html>
  );
};

export default AuthLayout;
