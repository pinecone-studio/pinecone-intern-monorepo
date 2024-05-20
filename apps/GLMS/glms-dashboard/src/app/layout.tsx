'use client';
import './global.css';
import { FederationProvider } from '../common';
import {AuthProvider} from '../common/providers/AuthProvider'
import Header from '../components/Header';
import { PineconeLogo } from '../../public/assets/PineconeLogo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <FederationProvider>
          <Header />
          {children}
          <ToastContainer />
          <div className="py-2 pb-6 bg-[#F7F7F8] flex justify-center">
            <PineconeLogo />
          </div>
        </FederationProvider>
      </body>
    </html>
  );
};
export default RootLayout;
