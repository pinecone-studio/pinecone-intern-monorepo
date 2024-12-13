'use client';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export const MiddlewareWrapper = ({ children }: PropsWithChildren) => {
  const { user, getMeLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!getMeLoading && (!user || user.role !== 'admin')) {
      router.replace('https://youtu.be/TUb__jZN_2Q?t=133');
    }
  }, [getMeLoading, user, router]);

  if (getMeLoading || !user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
