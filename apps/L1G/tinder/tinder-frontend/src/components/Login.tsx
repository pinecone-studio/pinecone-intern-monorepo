'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    console.log('working');
  }

  return (
    <div data-cy="Login-Form" className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage data-cy="Form-Email-Input-Error-Message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      Password{' '}
                      <button className="text-[#2563EB] font-sans text-[14px] font-[500]" onClick={() => router.push('/login/forgot-password')}>
                        Forgot Password?
                      </button>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter your password" {...field} />
                    </FormControl>
                    <FormMessage data-cy="Form-Password-Input-Error-Message" />
                  </FormItem>
                )}
              />
            </div>
            <Button data-cy="Sign-Up-Submit-Button" type="submit" className="rounded-full bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
