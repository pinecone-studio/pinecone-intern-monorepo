'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminHeader from '../admin/_components/AdminHeader';
import Header from './Header';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const body = document.body;

    if (isAdmin) {
      body.classList.remove('dark');
    } else {
      body.classList.add('dark');
    }
  }, [isAdmin]);

  return (
    <body>
      {!isAdmin ? <Header /> : <AdminHeader />}
      <div className="min-h-screen">{children}</div>
    </body>
  );
};

export default ThemeWrapper;
