'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Logo from '../_components/Logo';
import { SignInButton } from '@clerk/nextjs';

export const LogIn = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <div data-testid="Logo-image" className="flex justify-center mt-[400px] mb-[30px]">
        <Logo />
      </div>
      <div className="flex justify-center">
        <SignInButton mode="modal">
          <Button data-cy="login-btn" className="bg-red-900 w-[200px]">
            Нэвтрэх
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};
