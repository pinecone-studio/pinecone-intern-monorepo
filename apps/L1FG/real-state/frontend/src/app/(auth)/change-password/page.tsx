'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from 'src/components/providers';
import { useSearchParams } from 'next/navigation';

const FormSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Нууц үг 8 оронтой байна жүү',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Баталгаажуулах нууц үг 8 оронтой байна жүү',
    }),
    otp: z.string().length(6, {
      message: 'Нэг удаагийн нууц үг 6 оронтой байна жүү',
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: 'Баталгаажуулах нууц үг таарахгүй байна жүү', path: ['confirmPassword'] }
  );

const Page = () => {
  const searchParams = useSearchParams();

  const { changePassword } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      otp: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    await changePassword({
      password: values.password,
      otp: values.otp,
      email: searchParams.get('email') as string,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[360px] m-auto flex flex-col gap-10">
        <h1 data-cy="Change-Password-Page" className="text-2xl font-semibold text-center">
          Нэвтрэх
        </h1>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Шинэ нууц үг</FormLabel>
                <FormControl>
                  <Input data-cy="Change-Password-Page-Password-Input" data-testid="Change-Password-Page-Password-Input" className="p-2 rounded-sm" placeholder="Шинэ нууц үг" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Шинэ нууц үгээ давтаж оруулна уу</FormLabel>
                <FormControl>
                  <Input
                    data-cy="Change-Password-Page-Confirm-Password-Input"
                    data-testid="Change-Password-Page-Confirm-Password-Input"
                    className="p-2 rounded-sm"
                    placeholder="Шинэ нууц үгээ давтаж оруулна уу"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">OTP</FormLabel>
                <FormControl>
                  <Input data-cy="Change-Password-Page-OTP-Input" data-testid="Change-Password-Page-OTP-Input" className="p-2 rounded-sm" placeholder="OTP" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <Button data-cy="Change-Password-Page-Button" data-testid="Change-Password-Page-Button-Input" className="p-2 text-white bg-black rounded-sm" type="submit">
            Нууц үг солих
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Page;
