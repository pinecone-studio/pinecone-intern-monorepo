'use client';

import { LogIn } from '@/app/login/_features/Login';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <UserButton></UserButton>
        {children}
      </SignedIn>
      <SignedOut>
        <LogIn />
      </SignedOut>
    </ClerkProvider>
  );
};
