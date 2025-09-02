import { SignInComponent } from '@/components/auth/SignInComponent';
import { Suspense } from 'react';

const SignIn = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInComponent />
    </Suspense>
  );
};

export default SignIn;
