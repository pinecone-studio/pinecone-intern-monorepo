'use client';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider, FederationProvider } from '../common';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <FederationProvider>
          <ThemeProvider>
            {children}
            <ToastContainer />
          </ThemeProvider>
        </FederationProvider>
      </body>
    </html>
  );
};
export default RootLayout;
