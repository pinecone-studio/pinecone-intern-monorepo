'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResetPasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';

export const StepThree = () => {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const formSchema = z
    .object({
      password: z
        .string()
        .min(6, {
          message: 'Нууц үг 6 оронтой байх ёстой',
        })
        .max(50, {
          message: 'Нууц үг 50 оронтой байх ёстой',
        }),
      confirmPassword: z
        .string()
        .min(6, {
          message: 'Нууц үг 6 оронтой байх ёстой',
        })
        .max(50, {
          message: 'Нууц үг 50 оронтой байх ёстой',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Нууц үг таарахгүй байна',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userEmail = localStorage.getItem('emailAddress');
    try {
      await resetPassword({
        variables: {
          input: {
            email: userEmail || '',
            newPassword: values.password,
          },
        },
      });
      router.push('/sign-in');
      localStorage.removeItem('emailAddress');
    } catch (error) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Reset password amjiltgui bolloo',
      });
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-[105px] gap-8 ">
      <h1 className="text-[24px] font-semibold text-[#441500]">Нууц үг сэргээх</h1>
      <div className="flex w-[327px] flex-col gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input data-testid="password-input" type="password" placeholder="Шинэ нууц үг" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input data-testid="confirm-password-input" type="password" placeholder="Нууц үг давтах" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button data-testid="reset-password-button" onClick={() => form.handleSubmit(onSubmit)()} className="text-[14px] font-medium text-white bg-[#441500]" type="button">
          Үүсгэх
        </Button>
      </div>
    </div>
  );
};
