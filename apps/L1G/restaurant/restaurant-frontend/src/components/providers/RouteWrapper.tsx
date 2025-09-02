'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

type ProtectedRouteProps = {
  allowedRoles: ('admin' | 'user')[];
  children: React.ReactNode;
};

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/403');
      return;
    }

    try {
      const payload: any = jwt.decode(token);
      const role: 'admin' | 'user' = payload?.user?.role;

      if (!allowedRoles.includes(role)) {
        router.push('/403');
      } else {
        setIsVerified(true);
      }
    } catch (err) {
      router.push('/login');
    }
  }, [router, allowedRoles]);
  if (!isVerified) return null;
  return <>{children}</>;
};
