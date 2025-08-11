'use client';
import { LoginForm } from '@/components/Login';
import { MainHeader } from '@/components/MainHeader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[350px] h-fit flex flex-col gap-6 items-center">
        <MainHeader />

        <div className="flex flex-col gap-[4px] py-2 justify-center items-center">
          <p className=" text-[24px] font-[600] text-[#09090B]">Sign in</p>
          <p className=" text-[14px] font-[400] text-[#71717A]">Enter your email below to sign in</p>
        </div>

        <div className="w-full h-fit flex flex-col gap-4">
          <LoginForm />

          <div className="w-full flex justify-between items-center gap-[10px] py-4">
            <Separator className="w-[156px]" />
            <p className=" font-[400] text-[12px] text-[#71717A]">OR</p>
            <Separator className="w-[156px]" />
          </div>

          <Button onClick={() => router.push('/signup')} className="rounded-full border-[1px] border-[#E4E4E7] bg-white text-[#18181B]  text-[14px] font-[500] shadow-sm hover:bg-[#E4E4E7]">
            Create an account
          </Button>
        </div>

        <p className="text-center  text-wrap w-[249px] text-[14px] text-[#71717A] font-[400]">
          By clicking continue, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
