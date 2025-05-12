'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Нууц үг ижил байх ёстой.',
    path: ['confirm'],
  });

const ThirdStep = ({ email }: { email: string }) => {
  const form = useForm<z.infer<typeof passwordForm>>({
    resolver: zodResolver(passwordForm),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });

  function onSubmit(values: z.infer<typeof passwordForm>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 w-[350px]">
      <div className="flex flex-col items-center">
        <h3 className="font-semibold text-[24px]">Create password</h3>
        <p className="text-[#71717A] text-center">Use a minimum of 10 characters, including uppercase letters, lowercase letters and numbers</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[#E11D48] rounded-full">
            Continue
          </Button>
        </form>
      </Form>
      <p>{email}</p>
    </div>
  );
};

export default ThirdStep;
