'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { PropsWithChildren } from 'react';
/* istanbul ignore next */
const AdminLayout = ({ children }: PropsWithChildren) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsChecking(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      setIsAdmin(decoded?.isAdmin === true || decoded?.isAdmin === 'true');
    } catch (error) {
      console.log('❌ Error decoding token:', error);
      setIsAdmin(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        Админ эрхгүй байна
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminLayout;
