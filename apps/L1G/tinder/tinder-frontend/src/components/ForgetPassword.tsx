'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-fit flex flex-col justify-center items-center px-4 gap-2">
        <div className="flex flex-col items-center gap-6 max-w-[350px] w-full">
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl font-semibold font-sans">Forget password </p>
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
        <Button type="submit" className="font-sans w-full rounded-full bg-[#E11D48E5]">
          Continue
        </Button>
      </form>
    </Form>
  );
};
