import { PropsWithChildren } from 'react';
import './admin.css';
import { ApolloWrapper } from '@/components/providers';

export const metadata = {
  title: 'Welcome to example-frontend',
  description: 'Generated by create-nx-workspace',
};

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
};

export default AdminLayout;
