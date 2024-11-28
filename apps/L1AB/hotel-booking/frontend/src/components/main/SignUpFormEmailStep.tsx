'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ApolloError } from '@apollo/client';
import { useSignUpSendOtpMutation } from '@/generated';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

interface SignUpFormEmailStepProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  nextHandler: () => void;
  signUpSendOtpMutation: ReturnType<typeof useSignUpSendOtpMutation>[0];
  otpLoading: boolean;
  otpError: ApolloError | undefined;
}

interface FormValues {
  email: string;
}

const SignUpFormEmailStep: React.FC<SignUpFormEmailStepProps> = ({ setEmail, nextHandler, signUpSendOtpMutation, otpLoading }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ email }) => {
    const response = await signUpSendOtpMutation({ variables: { email } });
    if (response.data?.signUpSendOtp?.success) {
      setEmail(email);
      nextHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold">Create an account</h2>
      <p className="text-sm text-gray-500">Enter your email below to create your account</p>
      <div className="space-y-2">
        <Input id="email" type="email" placeholder="Email" data-testid="email-input" {...register('email')} />
      </div>
      <Button type="submit" disabled={otpLoading} data-testid="send-otp-button" className="w-full bg-blue-600 text-white py-2 rounded-md">
        {otpLoading ? 'Sending...' : 'Send OTP'}
      </Button>
    </form>
  );
};

export default SignUpFormEmailStep;
