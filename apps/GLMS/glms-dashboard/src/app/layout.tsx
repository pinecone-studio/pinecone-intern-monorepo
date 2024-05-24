'use client';
import './global.css';
import { AuthProvider, FederationProvider } from '../common';
import Header from '../components/Header';
import { PineconeLogo } from '../../public/assets/PineconeLogo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <FederationProvider>
          <AuthProvider>
            <Header />
            {children}
            <ToastContainer />
            <div className="py-2 pb-6 bg-[#F7F7F8] flex justify-center pb-20">
              <PineconeLogo />
            </div>
          </AuthProvider>
        </FederationProvider>
      </body>
    </html>
  );
};
export default RootLayout;
