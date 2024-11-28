'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const otpSchema = z.object({
  otp: z
    .string()
    .length(4, 'OTP must be 4 digits')
    .regex(/^\d{4}$/, 'OTP must be numeric'),
});

interface SignUpFormOtpStepProps {
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  nextHandler: () => void;
}

interface FormValues {
  otp: string;
}

const SignUpFormOtpStep: React.FC<SignUpFormOtpStepProps> = ({ setOtp, nextHandler }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ otp }) => {
    setOtp(otp);
    nextHandler();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold">Verify OTP</h2>
      <p className="text-sm text-gray-500">Enter the OTP sent to your email</p>
      <div className="space-y-2">
        <Input id="otp" type="text" maxLength={4} placeholder="OTP" data-testid="otp-input" {...register('otp')} />
      </div>
      <Button type="submit" data-testid="verify-otp-button" className="w-full bg-blue-600 text-white py-2 rounded-md">
        Verify OTP
      </Button>
    </form>
  );
};

export default SignUpFormOtpStep;
