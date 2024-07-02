'use client';
import { Header } from '@/components/ProjectHeader';
import { ThemeProvider } from '@/components/ThemeProvider';
import { FederationProvider } from '../common';
import './global.css';
import { usePathname } from 'next/navigation';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSignInPage = pathname === '/sign-in';
  return (
    <html lang="en">
      <body className="relative">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FederationProvider>
            {!isSignInPage && <Header />}
            {children}
          </FederationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
