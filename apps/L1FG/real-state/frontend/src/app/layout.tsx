import { PropsWithChildren, Suspense } from 'react';
import './global.css';
import { ApolloWrapper, AuthProvider, Container } from '@/components/providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Flip, ToastContainer } from 'react-toastify';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Real Estate',
  description: 'Platform by Real Estate Company',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="bg-[#F4F4F5]">
        <Suspense>
          <ApolloWrapper>
            <AuthProvider>
              <Container>
                <NuqsAdapter>
                  <Header />
                  {children}
                  <Footer />
                  <ToastContainer
                    position="top-right"
                    autoClose={process.env.NODE_ENV === 'test' ? false : 2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Flip}
                  />
                </NuqsAdapter>
              </Container>
            </AuthProvider>
          </ApolloWrapper>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
