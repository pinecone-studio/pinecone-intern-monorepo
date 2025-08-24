import { PropsWithChildren, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { ApolloWrapper } from '../../components/providers';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>
      <ApolloWrapper>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
          </div>
          <ToastContainer />
      </ApolloWrapper>
    </Suspense>
  );
};

export default MainLayout;
