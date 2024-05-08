'use client';
import './global.css';
import { ThemeProvider } from '@mui/material';
import { FederationProvider } from '../common';
import { theme } from '../common/theme';
import Header from '../components/Header';
import { PineconeLogo } from '../../public/assets/PineconeLogo';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <FederationProvider>
          <body>
            <Header />
            {children}
            <div className="py-2 pb-6 bg-[#F7F7F8] flex justify-center">
              <PineconeLogo />
            </div>
          </body>
        </FederationProvider>
      </ThemeProvider>
    </html>
  );
};
export default RootLayout;
