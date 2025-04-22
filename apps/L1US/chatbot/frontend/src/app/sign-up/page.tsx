'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { SignupForm } from '@/components/forms/SignUpForm';

const SignUpPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm p-8 space-y-6 rounded-lg bg-[hsl(var(--card)/0.85)] ring-1 ring-[hsl(var(--ring)/0.3)] shadow-xl">
        <h2 className="text-center text-2xl font-semibold text-card-foreground">Sign up</h2>
        <SignupForm /> 
        <div className="flex items-center justify-center space-x-2">
          <span className="text-muted-foreground text-sm">Already have an account?</span>
          <Button variant="outline" className="text-sm border border-border text-foreground bg-transparent hover:text-foreground hover:bg-muted transition" onClick={() => router.push('/sign-in')}>
            Sign in
          </Button>
        </div>
      </div> 
    </div>
  );
};

export default SignUpPage;
