'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { FederationProvider } from '../common';
import './global.css';
import { ProjectHeader } from '@/components/ProjectHeader';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSignInPage = pathname === '/sign-in';
  return (
    <html lang="en">
      <body className="relative bg-[#F7F7F8]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FederationProvider>
            {!isSignInPage && <ProjectHeader />}
            {children}
          </FederationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
