'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { LoginDocument } from '@/generated';

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

  const [loginMutation, { loading, error }] = useMutation(LoginDocument);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await loginMutation({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const token = response.data.login;
      if (token) {
        localStorage.setItem('token', token);
        router.push('/home');
      }
    } catch (err) {
      console.error('Login error');
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
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
                      <Input className="rounded-md" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      Password
                      <p className="text-[#2563EB] font-sans text-[14px] font-[500] underline" onClick={() => router.push('/forgot-password')}>
                        Forgot Password?
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input className="rounded-md" type="password" {...field} placeholder="Please enter your password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="rounded-full bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100" disabled={loading}>
              {loading ? 'Signing in...' : 'Continue'}
            </Button>
            {error && <p className="text-red-500 text-sm">{'Email or password invalid'}</p>}
          </form>
        </Form>
      </div>
    </div>
  );
};
