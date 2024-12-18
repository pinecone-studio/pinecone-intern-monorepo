'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useSignUpSendOtpMutation } from '@/generated';
import Link from 'next/link';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

interface SignUpFormEmailStepProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  nextHandler: () => void;
}

interface FormValues {
  email: string;
}

const SignUpFormEmailStep: React.FC<SignUpFormEmailStepProps> = ({ setEmail, nextHandler }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const [signUpSendOtpMutation, { loading: otpLoading }] = useSignUpSendOtpMutation();

  const onSubmit: SubmitHandler<FormValues> = async ({ email }) => {
    try {
      const response = await signUpSendOtpMutation({ variables: { email } });
      if (response.data?.signUpSendOtp?.success) {
        setEmail(email);
        toast.success('OTP sent successfully. Please check your email');
        nextHandler();
      } else {
        toast.error(response.data?.signUpSendOtp?.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full h-full ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 " data-testid="NextButton">
        <div>
          <h2 className="text-2xl font-semibold text-center">Create an account</h2>
          <p className="text-sm font-normal text-gray-500 text-center">Enter your email below to create your account</p>
        </div>
        <div className="space-y-2">
          <div>
            <h3 className="text-sm text-[#09090B] pb-2">Email</h3>
            <Input className="h-9" id="email" type="email" placeholder="name@example.com" data-testid="email-input" {...register('email')} />
          </div>
          <Button type="submit" data-testid="send-otp-button" disabled={otpLoading} className="w-full bg-blue-600 text-white py-2 rounded-md">
            {otpLoading ? 'Continue...' : 'Continue'}
          </Button>
          <div className="w-full h-9 flex justify-between items-center">
            <div className="w-5/12 h-[1px] flex items-center bg-[#E4E4E7] "></div>
            <div>
              <h5 className="text-xs text-[#71717A]">OR</h5>
            </div>
            <div className="w-5/12 h-[1px] flex items-center bg-[#E4E4E7] "></div>
          </div>
          <Link href={'./signin'}>
            {' '}
            <Button type="submit" className="w-full bg-white text-sm  text-[#18181B] py-2 rounded-md font-medium border hover:bg-gray-400">
              Log in
            </Button>
          </Link>
          <div className="px-8 pt-4">
            <p className="text-sm text-[#71717A]">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpFormEmailStep;
