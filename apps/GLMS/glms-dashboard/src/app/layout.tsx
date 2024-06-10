'use client';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import { cn } from '../lib/util';
import { AuthProvider, ThemeProvider, FederationProvider } from '../common';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
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
