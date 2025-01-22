import { ApolloWrapper, AuthProvider } from '@/components/providers';
import { PropsWithChildren, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>
      <ApolloWrapper>
        <AuthProvider>
          <div>{children}</div>
          <ToastContainer />
        </AuthProvider>
      </ApolloWrapper>
    </Suspense>
  );
};

export default MainLayout;
