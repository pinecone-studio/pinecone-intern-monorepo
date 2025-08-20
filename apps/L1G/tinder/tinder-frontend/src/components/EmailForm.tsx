'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { OtpType, useRequestSignupMutation } from '@/generated';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
});

type EmailFormProps = {
  onSuccess: (_email: string) => void;
};

export const EmailForm = ({ onSuccess }: EmailFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const [requestSignup, { loading, error }] = useRequestSignupMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await requestSignup({
        variables: { email: values.email, otpType: OtpType.Forgot },
      });

      if (response.data?.requestSignup.output) {
        onSuccess(values.email);
      }
    } catch (err) {
      console.error('Signup request failed:', err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-fit flex flex-col justify-center items-center px-4 gap-2">
        <div className="flex flex-col items-center gap-6 max-w-[350px] w-full">
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl font-semibold font-sans">Forget password</p>
            <p className="text-sm text-[#71717A] font-sans">Enter your email account to reset password</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="font-sans w-full rounded-full bg-[#E11D48E5]" disabled={loading}>
          {loading ? 'Sending...' : 'Continue'}
        </Button>
        {error && <p className="text-[14px] text-red-500 mt-2">{error.message}</p>}
      </form>
    </Form>
  );
};
