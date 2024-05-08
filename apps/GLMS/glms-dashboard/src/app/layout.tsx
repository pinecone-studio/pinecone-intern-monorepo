'use client';
import './global.css';
import { FederationProvider } from '../common';
import Header from '../components/Header';
import { Challengeprovider } from './challenge-dashboard/context/Challenge';
import Footer from '../components/Footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Challengeprovider>
          <FederationProvider>
            <Header />
            {children}
            <Footer />
          </FederationProvider>
        </Challengeprovider>
      </body>
    </html>
  );
};
export default RootLayout;
