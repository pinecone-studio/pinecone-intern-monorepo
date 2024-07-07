'use client';
import { Header } from '@/components/ProjectHeader';
import { ThemeProvider } from '@/components/ThemeProvider';
import { FederationProvider } from '../common';
import { AuthProvider } from '@/common/providers/AuthProvider';
import './global.css';
import { usePathname } from 'next/navigation';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSignInPage = pathname === '/login';
  return (
    <html lang="en">
      <body className="relative">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <FederationProvider>
          <AuthProvider>
            {!isSignInPage && <Header />}
            {children}
            </AuthProvider>
        </FederationProvider>
      </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
