'use client';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import { AuthProvider, ThemeProvider, FederationProvider } from '../common';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <FederationProvider>
          <AuthProvider>
            <ThemeProvider>
              <ToastContainer />
              <Header />
              <ToastContainer />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </FederationProvider>
      </body>
    </html>
  );
};
export default RootLayout;
