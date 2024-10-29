import { Footer, Header } from '../../components';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { ApolloWrapper, AuthProvider } from '../../components/providers';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <ApolloWrapper>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>

        <ToastContainer />
      </AuthProvider>
    </ApolloWrapper>
  );
};

export default MainLayout;
