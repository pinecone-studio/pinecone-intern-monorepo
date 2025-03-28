'use client';
import { BlackLogoIcon } from '@/components/user/ui/svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { toast } from 'sonner';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const Router = useRouter();
  const { signin } = useAuth();

  const onSubmit = async () => {
    try {
      await signin({ email: email, password: password });
      Router.push('/');
      toast.success('Successfully logged in', {
        style: { backgroundColor: 'green', color: 'white' },
      });
    } catch (error) {
      console.error(error);
      toast.error(`${error}`, {
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="w-full h-full pt-[140px] pb-8 flex flex-col items-center justify-between">
        <div className="w-[350px] flex flex-col gap-6">
          <div className="flex items-center justify-center gap-[8.33px]">
            <div className="w-5 h-5 rounded-full bg-[#2563EB]"></div>
            <BlackLogoIcon />
          </div>
          <div className="py-2 flex flex-col items-center gap-1 ">
            <p className="font-Inter font-semibold text-2xl not-italic tracking-[-0.6px]">Sign in</p>
            <p className="font-Inter font-normal text-sm text-[#71717A]">Enter your email below to sign in</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-Inter font-normal text-sm leading-[14px] not-italic">Email</p>
                  <Input onChange={(event) => setEmail(event.target.value)} value={email} type="email" placeholder="name@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="font-Inter font-normal text-sm leading-[14px] not-italic">Password</p>
                    <Link href="/forget-password">
                      <p className="font-Inter font-normal text-sm leading-[14px] text-[#2563EB] hover:text-[#2563D2] not-italic cursor-pointer">Forget password?</p>
                    </Link>
                  </div>
                  <Input onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="Password" />
                </div>
              </div>
              <Button onClick={onSubmit} className="w-full bg-[#2563EB] hover:bg-[#2563D2]">
                <p className="font-Inter font-medium text-sm not-italic text-white">Continue</p>
              </Button>
            </div>
            <div className="flex">
              <div className="w-full py-4 flex items-center">
                <div className="w-full border-[1px] border-[#E4E4E7]"></div>
              </div>
              <div className="p-[10px]">
                <p className="font-Inter font-normal not-italic text-xs text-center text-[#71717A]">OR</p>
              </div>
              <div className="w-full py-4 flex items-center">
                <div className="w-full border-[1px] border-[#E4E4E7] "></div>
              </div>
            </div>
            <Button className="bg-white hover:bg-white border border-[#E4E4E7] shadow-[#0000000d] shadow-sm">
              <Link href={'/create-account'}>
                <p className="font-Inter font-medium text-sm text-[#18181B] not-italic">Create an account</p>
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <p className="max-w-[250px] font-Inter font-normal text-sm text-[#71717A] not-italic">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
        <p className="font-Inter font-normal text-sm not-italic">©2024 Pedia is an Pedia Group company.</p>
      </div>
    </div>
  );
};

export default SignUpPage;
