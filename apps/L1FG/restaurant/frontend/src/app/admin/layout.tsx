'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return <div>{children}</div>;
};

export default Layout;
