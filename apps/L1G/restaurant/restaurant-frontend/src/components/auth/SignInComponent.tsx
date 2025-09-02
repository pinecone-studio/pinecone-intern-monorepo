'use client';

import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetTableByNameQuery, useSignInMutation } from '@/generated';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const SignInComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tableName = searchParams.get('table');

  const { data } = useGetTableByNameQuery({
    skip: !tableName,
    variables: {
      tableName: tableName!,
    },
  });

  useEffect(() => {
    if (data?.getTableByName?.tableId) {
      localStorage.setItem('tableId', data.getTableByName.tableId);
    }
  }, [data]);
  const [signIn] = useSignInMutation();

  const formSchema = z.object({
    email: z
      .string()
      .email({
        message: 'Имэйл хаяг буруу байна.',
      })
      .min(2, {
        message: 'Имэйл хаяг хоосон байна.',
      }),
    password: z.string().min(6, {
      message: 'Нууц үг 6 тэмдэгтээс их байх ёстой.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await signIn({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });

      localStorage.setItem('token', data?.signIn.token || '');
      if (data?.signIn.user.role === 'admin') {
        router.push('/order');
      } else if (data?.signIn.user.role === 'user') {
        router.push('/');
      }
    } catch (error) {
      form.setError('password', {
        type: 'manual',
        message: 'Имэйл эсвэл нууц үг буруу байна.',
      });
      form.setError('email', {
        type: 'manual',
        message: ' ',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-[24px]">
      <Image src="/mainLogo.png" alt="Logo" width={108} height={104} />
      <div className="flex flex-col w-[327px] items-center gap-[24px]">
        <h1 className="text-[24px] font-semibold text-[#441500]">Нэвтрэх</h1>
        <div className="flex flex-col gap-2 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[8px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        data-testid="email-input"
                        type="email"
                        placeholder="Имэйл хаяг"
                        {...field}
                        className={`focus-visible:ring-0 focus-visible:ring-offset-0 ${form.formState.errors.email ? 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500' : ''}`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        data-testid="password-input"
                        type="password"
                        placeholder="Нууц үг"
                        {...field}
                        className={`focus-visible:ring-0 focus-visible:ring-offset-0 ${form.formState.errors.password ? 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500' : ''}`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <Button data-testid="sign-in-button" type="submit" className="w-full bg-[#441500] text-white text-[14px] hover:bg-[#441500]/90">
                Нэвтрэх
              </Button>
            </form>
          </Form>
          <Button data-testid="reset-password-button" onClick={() => router.push('/reset-password')} className="text-black text-[14px] bg-transparent hover:bg-gray-100 hover:text-black">
            Нууц үг мартсан?
          </Button>
        </div>
        <div className="flex gap-[10px] w-full items-center">
          <div className="w-full h-[1px] bg-[#E4E4E7]" />
          <h1 className="text-[12px] text-[#71717A] font-normal">Эсвэл</h1>
          <div className="w-full h-[1px] bg-[#E4E4E7]" />
        </div>
        <Button data-testid="sign-up-button" onClick={() => router.push('/sign-up')} className="w-full bg-transparent border border-[#E4E4E7] text-[#441500] hover:bg-gray-100 hover:text-black">
          Бүргүүлэх
        </Button>
      </div>
    </div>
  );
};
