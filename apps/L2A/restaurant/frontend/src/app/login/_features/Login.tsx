import { Button } from '@/components/ui/button';
import Logo from '../_components/Logo';
import { SignInButton } from '@clerk/nextjs';

export const LogIn = () => {
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
