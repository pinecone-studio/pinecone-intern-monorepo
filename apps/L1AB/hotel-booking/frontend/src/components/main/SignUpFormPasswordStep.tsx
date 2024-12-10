'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ApolloError } from '@apollo/client';
import { useSignUpMutation } from '@/generated';

const passwordSchema = z
  .object({
    password: z.string().min(10, 'Password must be at least 10 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

interface SignUpFormPasswordStepProps {
  email: string;
  otp: string;
  signUpMutation: ReturnType<typeof useSignUpMutation>[0];
  signUpLoading: boolean;
  signUpError: ApolloError | undefined;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

const SignUpFormPasswordStep: React.FC<SignUpFormPasswordStepProps> = ({ email, signUpMutation, signUpLoading }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    const response = await signUpMutation({
      variables: { input: { email, password } },
    });
    if (response.data?.signUp?.success) {
      alert('User created successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold">Create Password</h2>
      <p className="text-sm text-gray-500">Use a strong password</p>
      <div className="space-y-2">
        <Input id="password" type="password" placeholder="Password" data-testid="password-input" {...register('password')} />
      </div>
      <div className="space-y-2">
        <Input id="confirmPassword" type="password" placeholder="Confirm Password" data-testid="confirm-password-input" {...register('confirmPassword')} />
      </div>
      <Button type="submit" disabled={signUpLoading} data-testid="sign-up-button" className="w-full bg-blue-600 text-white py-2 rounded-md">
        {signUpLoading ? 'Signing Up...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignUpFormPasswordStep;
