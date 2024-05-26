'use client';
import './global.css';
import { FederationProvider } from '../common';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../common/providers/AuthProvider';
import Header from '../components/Header';
import { PineconeLogo } from '../../public/assets/PineconeLogo';
import { ToastContainer } from 'react-toastify';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <FederationProvider>
          <AuthProvider>
            <ToastContainer />
            <Header />
            <ToastContainer />
            {children}
            <PineconeLogo />
          </AuthProvider>
        </FederationProvider>
      </body>
    </html>
  );
};
export default RootLayout;
