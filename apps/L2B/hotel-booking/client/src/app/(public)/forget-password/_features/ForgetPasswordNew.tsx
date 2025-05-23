'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useResetPasswordMutation } from '@/generated';
import { useState } from 'react';

const passwordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters').regex(/[a-z]/, 'Must contain lowercase letter').regex(/[0-9]/, 'Must contain number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const ForgetPasswordNew = ({ email }: { email: string }) => {
  const [resetPassword, { loading }] = useResetPasswordMutation({
    onError: () => {
      setServerError('Failed to reset password');
    },
  });
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setServerError(null);
    const response = await resetPassword({
      variables: {
        email,
        password: data.password,
      },
    });
    if (response.data?.resetPassword.success) {
      router.push('/signin');
    } else {
      setServerError('Failed to reset password');
    }
  };

  return (
    <div data-cy="new-password-page" className="h-screen flex flex-col items-center relative justify-center px-4">
      <div className="flex flex-col items-center font-medium">
        <div className="flex items-center gap-2 mb-[24px]">
          <div className="w-5 h-5 rounded-full bg-[#2563eb]"></div>
          <h2 className="text-[#09090b] text-[20px]">Pedia</h2>
        </div>
        <h3 className="text-[24px] leading-8 mb-[4px] font-medium font-inter">Set new password</h3>
        <p className="font-light text-[#71717a] max-w-xs text-center">Use a minimum of 10 characters with uppercase, lowercase, and numbers</p>
      </div>

      <form data-cy="new-password-form" onSubmit={handleSubmit(onSubmit)} className="w-[350px] max-w-md space-y-4 mt-6">
        <div>
          <label data-cy="password-label" htmlFor="password" className="text-[14px] font-medium mb-2">
            Password
          </label>
          <Input
            data-cy="password-input"
            id="password"
            type="password"
            {...register('password')}
            className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-visible:ring-0 font-extralight"
            placeholder="••••••••"
          />
          {errors.password && (
            <p data-cy="error-message" className="text-sm text-red-500 mt-2 font-thin">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label data-cy="confirm-password-label" htmlFor="confirmPassword" className="text-[14px] font-medium mb-2">
            Confirm Password
          </label>
          <Input
            data-cy="confirm-password-input"
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-visible:ring-0 font-extralight"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p data-cy="error-message" className="text-sm text-red-500 mt-2 font-thin">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {serverError && (
          <p data-cy="error-message" className="text-sm text-red-500 mt-2 font-thin">
            {serverError}
          </p>
        )}
        <Button data-cy="submit-btn" type="submit" disabled={loading} className="w-full bg-[#2563eb] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
          {loading ? 'Resetting...' : 'Continue'}
        </Button>
      </form>
      <div className="absolute bottom-8 text-sm text-[#09090B] font-light">©2024 Pedia is an Pedia Group company.</div>
    </div>
  );
};
