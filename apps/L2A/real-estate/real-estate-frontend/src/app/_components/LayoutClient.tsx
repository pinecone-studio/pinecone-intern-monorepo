'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const LayoutClient = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const hideLayout = pathname === '/signin' || pathname === '/signup' || pathname === '/forget-password';

  return (
    <>
      {!hideLayout && <Header />}
      <main className="flex-1 bg-[#F4F4F5]">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default LayoutClient;
