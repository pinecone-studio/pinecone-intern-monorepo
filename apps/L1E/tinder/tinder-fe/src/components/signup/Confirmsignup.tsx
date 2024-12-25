'use client';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRequestOtpMutation } from '@/generated';

export const Confirmsignup = () => {
  const [requestOtp] = useRequestOtpMutation();
  const [value, setValue] = useState('');
  const email = 'uzkhuthef@gmail.com';
  const router = useRouter();

  useEffect(() => {
    const sendOtp = async () => {
      await requestOtp({
        variables: {
          input: {
            email,
            otp: '',
          },
        },
      });
    };

    sendOtp();
  }, []);

  useEffect(() => {
    if (value.length === 4) {
      handleSubmit();
    }
  }, [value]);

  const handleSubmit = async () => {
    await requestOtp({
      variables: {
        input: {
          email,
          otp: value,
        },
      },
    });
    router.push('/');
  };

  return (
    <div className="relative w-full h-full">
      <div className="text-amber-50 flex items-center justify-center h-[48rem] max-sm:px-3">
        <div className="flex rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex flex-col items-center justify-center gap-6 self-stretch w-[327px] max-sm:w-full z-10">
            <InputOTP maxLength={4} data-testid="OTPInput" onChange={(value) => setValue(value)}>
              <InputOTPGroup className="text-black dark:text-white">
                <InputOTPSlot className="h-14 w-14" index={0} />
                <InputOTPSlot className="h-14 w-14" index={1} />
                <InputOTPSlot className="h-14 w-14" index={2} />
                <InputOTPSlot className="h-14 w-14" index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmsignup;
