'use client';
import './global.css';
import { FederationProvider } from '../common';
import Header from '../components/Header';
import { PineconeLogo } from '../../public/assets/PineconeLogo';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body>
=======
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
        <FederationProvider>
          <Header />
          {children}
          <div className="py-2 pb-6 bg-[#F7F7F8] flex justify-center">
            <PineconeLogo />
          </div>
        </FederationProvider>
<<<<<<< HEAD
      </body>
=======
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
    </html>
  );
};
export default RootLayout;
