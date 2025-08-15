'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResetPasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

export const StepThree = () => {
  const [resetPassword, { loading, data }] = useResetPasswordMutation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
    } catch (error) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Reset password amjiltgui bolloo',
      });
    }
  }

  useEffect(() => {
    if (data?.resetPassword?.message === 'Password reset successfully') {
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        localStorage.removeItem('emailAddress');
        router.push('/sign-in');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [data, router]);

  if (showSuccessMessage) {
    return (
      <div className="w-screen h-screen flex flex-col items-center pt-[200px] gap-4">
        <div className="w-[100px] h-[100px] bg-[#F4F4F5E5] rounded-full flex items-center justify-center">
          <Check className="w-[41px] h-[41px] text-[#441500]" />
        </div>
        <h1 className="text-[18px] font-semibold text-[#441500]">Амжилттай үүсгэлээ.</h1>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
          <p className="text-center">Уншиж байна</p>
        </div>
      ) : (
        <div data-cy="Update-Password-Page" className="w-screen h-screen flex flex-col items-center pt-[105px] gap-8 ">
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
                        <Input data-cy="password-input" type="password" placeholder="Шинэ нууц үг" {...field} />
                      </FormControl>

                      <FormMessage data-cy="Error-Message-Password" />
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
                        <Input data-cy="confirm-password-input" type="password" placeholder="Нууц үг давтах" {...field} />
                      </FormControl>

                      <FormMessage data-cy="Error-Message-Confirm" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <Button data-cy="Update-Password-Button" onClick={() => form.handleSubmit(onSubmit)()} className="text-[14px] font-medium text-white bg-[#441500]" type="button">
              Үүсгэх
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
