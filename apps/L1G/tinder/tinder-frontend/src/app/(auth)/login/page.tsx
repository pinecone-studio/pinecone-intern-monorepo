import { LoginForm } from '@/components/Login';
import { MainHeader } from '@/components/MainHeader';

const SignInPage = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-fit flex flex-col gap-6">
        <MainHeader />

        <div className="flex flex-col gap-[4px] py-2 justify-center items-center">
          <p className="inter text-[24px] font-[600]">Sign in</p>
          <p className="inter text-[14px] font-[400]">Enter your email below to sign in</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default SignInPage;
