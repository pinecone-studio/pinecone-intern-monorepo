'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SigninForm } from '@/components/pages/signin-form';

const SignInPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm p-8 space-y-6 rounded-lg bg-[hsl(var(--card)/0.85)] ring-1 ring-[hsl(var(--ring)/0.3)] shadow-xl">
        <h2 className="text-center text-2xl font-semibold text-card-foreground">Sign in</h2>
        <SigninForm />
        <div className="flex items-center justify-center space-x-2">
          <span className="text-muted-foreground text-sm">Don&apos;t have an account?</span>
          <Button variant="outline" className="text-sm border border-border text-foreground bg-transparent hover:text-foreground hover:bg-muted transition" onClick={() => router.push('/sign-up')}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
