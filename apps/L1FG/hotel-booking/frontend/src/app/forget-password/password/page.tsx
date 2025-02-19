'use client';

import { BlackLogoIcon } from '@/components/user/ui/svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useForgetPasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loading } from '@/components/user/main/Loading';

const ForgetPasswordPassword = () => {
  const [passwordOneValue, setPasswordOneValue] = useState<string>('');
  const [passwordTwoValue, setPasswordTwoValue] = useState<string>('');
  const [viewEmail, setViewEmail] = useState<string>('');
  const [forgetPassword, { loading, data }] = useForgetPasswordMutation();
  const router = useRouter();

  const handleChangePasswordOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordOneValue(e.target.value);
  };

  const handleChangePasswordTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordTwoValue(e.target.value);
  };

  const onClickCreatePassword = () => {
    if (passwordOneValue === passwordTwoValue) {
      forgetPassword({ variables: { input: { password: passwordOneValue, email: viewEmail } } });
    } else {
      toast.error('Your password does not match', {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    setViewEmail(localStorage.getItem('forgetPasswordEmail')!);
  }, []);

  if (loading) return <Loading />;

  if (data?.forgetPassword.success) {
    router.push('/');
    localStorage.removeItem('forgetPasswordEmail');
    toast.success('The password has been successfully changed.', {
      autoClose: 2000,
    });
  }

  return (
    <main>
      <div className="container mx-auto h-screen">
        <div className="w-full h-full pt-[140px] pb-8 flex flex-col items-center justify-between">
          <div className="w-[350px] flex flex-col gap-6">
            <div className="flex items-center justify-center gap-[8.33px]">
              <div className="w-5 h-5 rounded-full bg-[#2563EB]"></div>
              <BlackLogoIcon />
            </div>
            <div className="py-2 flex flex-col items-center gap-1 ">
              <p className="font-Inter font-semibold text-2xl not-italic tracking-[-0.6px]">Set new password</p>
              <p className="font-Inter font-normal text-sm text-[#71717A] text-center">Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-Inter font-normal text-sm leading-[14px] not-italic">Password</p>
                    <Input type="password" placeholder="Password" className="focus-visible:ring-0" onChange={handleChangePasswordOne} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="font-Inter font-normal text-sm leading-[14px] not-italic">Confirm Password</p>
                    </div>
                    <Input type="password" placeholder="Confirm password" className="focus-visible:ring-0" onChange={handleChangePasswordTwo} />
                  </div>
                </div>
                <Button onClick={onClickCreatePassword} className="w-full bg-[#2563EB] hover:bg-[#2563D2]">
                  <p className="font-Inter font-medium text-sm not-italic text-white">Continue</p>
                </Button>
              </div>
            </div>
          </div>
          <p className="font-Inter font-normal text-sm not-italic">©2024 Pedia is an Pedia Group company.</p>
        </div>
      </div>
    </main>
  );
};

export default ForgetPasswordPassword;
