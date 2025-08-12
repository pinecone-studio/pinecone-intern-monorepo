'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '@/generated';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one number');

const formSchema = z
  .object({
    password: passwordSchema,
    repeatPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

type ResetPasswordProps = {
  onSuccess: () => void;
  otpId: string;
};

export const ResetPassword = ({ onSuccess, otpId }: ResetPasswordProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });
  const router = useRouter();
  const [forgotPassword, { loading, error }] = useForgotPasswordMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setServerError(null);
    try {
      const response = await forgotPassword({
        variables: {
          newPassword: values.password,
          otpId,
        },
      });

      if (response.data?.forgotPassword?.message) {
        onSuccess();
        router.push('/login');
      } else {
        setServerError(error?.message || 'Something went wrong.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[360px] flex flex-col">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-1 justify-center items-center py-2">
            <p className="font-sans text-[24px] font-semibold text-[#09090B]">Set new password</p>
            <p className="font-sans text-[14px] text-[#71717A] text-center">
              Use a minimum of 8 characters, including uppercase <br /> letters, lowercase letters, and numbers
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-[14px] text-[#09090B] ">Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="p-2 rounded-md w-[360px]" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage className="text-s text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-[14px] text-[#09090B] ">Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" className="p-2 rounded-md w-[360px]" placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage className="text-s text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="bg-[#E11D48] bg-opacity-90 w-[350px] rounded-full" disabled={loading}>
              {loading ? 'Resetting...' : 'Continue'}
            </Button>

            {serverError && <p className="text-red-500 mt-2">{serverError}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};
