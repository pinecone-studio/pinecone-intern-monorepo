'use client';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export const MiddlewareWrapper = ({ children }: PropsWithChildren) => {
  const { user, getMeLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!getMeLoading && (!user || user.role !== 'admin')) {
      router.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }
  }, [getMeLoading, user, router]);

  if (getMeLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
