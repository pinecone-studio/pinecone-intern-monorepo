'use client';
import './global.css';
import { FederationProvider } from '../common';
import Header from '../components/Header';
import { PineconeLogo } from '../../public/assets/PineconeLogo';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <div className="py-2 pb-6 bg-[#F7F7F8] flex justify-center">
          <PineconeLogo />
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
