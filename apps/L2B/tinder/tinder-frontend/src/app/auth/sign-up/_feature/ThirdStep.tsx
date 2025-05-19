'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAddUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';

const passwordForm = z
  .object({
    password: z
      .string()
      .min(1, 'Password can not be empty')
      .min(8, 'Password needs to be at least 8 letters.')
      .regex(/[A-Z]/, 'At least one capital letter needs to be included.')
      .regex(/[0-6]/, 'At least one number needs to be included.'),
    confirm: z.string().min(1, 'Password can not be empty.'),
    email: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Password do not match',
    path: ['confirm'],
  });

const ThirdStep = ({ email }: { email: string }) => {
  const router = useRouter();
  const [addUser, { loading }] = useAddUserMutation();

  const form = useForm<z.infer<typeof passwordForm>>({
    resolver: zodResolver(passwordForm),
    defaultValues: {
      password: '',
      confirm: '',
      email,
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordForm>) => {
    await addUser({ variables: { email: email, password: values.password } });
    router.push('/auth/sign-in');
  };

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
                  <Input type="password" placeholder="********" data-testid="password-input" {...field} />
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
                  <Input type="password" placeholder="********" data-testid="confirm-password-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[#E11D48] rounded-full" disabled={loading}>
            {loading ? 'loading...' : 'Continue'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ThirdStep;
