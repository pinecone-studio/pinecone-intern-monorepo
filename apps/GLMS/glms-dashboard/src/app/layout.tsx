'use client';
import './global.css';
import { FederationProvider } from '../common';
import Header from '../components/Header';
import { PineconeLogo } from '../../public/assets/PineconeLogo';
import { Challengeprovider } from './challenge-dashboard/context/Challenge';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Challengeprovider>
          <FederationProvider>
            <Header />
            {children}
            <div className="py-2 pb-6 bg-[#F7F7F8] flex justify-center">
              <PineconeLogo />
            </div>
          </FederationProvider>
        </Challengeprovider>
      </body>
    </html>
  );
};
export default RootLayout;
