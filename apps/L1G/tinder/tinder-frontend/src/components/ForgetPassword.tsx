'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TinderLogo } from './TinderLogo';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
});

export const ForgetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (_values: z.infer<typeof formSchema>) => {
    console.log('working');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center min-h-screen px-4">
        <div className="flex flex-col items-center gap-6 max-w-[350px] w-full">
          <TinderLogo />
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl font-semibold">Forget password </p>
            <p className="text-sm text-[#71717A]">Enter your email account to reset password</p>
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
          <Button type="submit" className="w-full rounded-full bg-[#E11D48E5]">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
