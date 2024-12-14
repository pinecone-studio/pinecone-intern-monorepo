'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ApolloError } from '@apollo/client';
import { useSignUpMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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
  signUpMutation: ReturnType<typeof useSignUpMutation>[0];
  signUpLoading: boolean;
  signUpError: ApolloError | undefined;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

const SignUpFormPasswordStep: React.FC<SignUpFormPasswordStepProps> = ({ email, signUpMutation, signUpLoading, signUpError }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    try {
      const response = await signUpMutation({
        variables: { input: { email, password } },
      });

      if (response.data?.signUp?.success) {
        toast.success('User created successfully!');
        router.push('/signin'); // Redirect to login or another page
      } else {
        toast.error(response.data?.signUp?.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="">
        <h2 className="text-xl font-semibold text-center">Create Password</h2>
        <p className="text-sm text-gray-500 text-center">Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers</p>
      </div>
      <div className="space-y-2">
        <h5 className="text-sm text-[#09090B] font-medium pl-1">Password</h5>
        <Input className="h-9" id="password" type="password" placeholder="Password" data-testid="password-input" {...register('password')} />
        {errors.password && (
          <p className="text-sm text-red-500" data-testid="password-error">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h5 className="text-sm text-[#09090B] font-medium pl-1">Confirm Password</h5>
        <Input className="h-9" id="confirmPassword" type="password" placeholder="Confirm Password" data-testid="confirm-password-input" {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500" data-testid="confirm-password-error">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {signUpError && (
        <p className="text-sm text-red-500" data-testid="signup-error">
          {signUpError.message}
        </p>
      )}

      <Button type="submit" disabled={signUpLoading} data-testid="sign-up-button" className="w-full bg-blue-600 text-white py-2 rounded-md">
        {signUpLoading ? 'Continue...' : 'Continue'}
      </Button>
    </form>
  );
};

export default SignUpFormPasswordStep;
