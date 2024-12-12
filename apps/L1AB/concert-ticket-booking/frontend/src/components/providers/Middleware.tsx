'use client';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export const MiddlewareWrapper = ({ children }: PropsWithChildren) => {
  const { user, getMeLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!getMeLoading && (!user || user.role !== 'admin')) {
      router.replace('/404');
    }
  }, [getMeLoading, user, router]);

  if (getMeLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
