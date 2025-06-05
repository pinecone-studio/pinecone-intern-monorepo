'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/_components/context/AuthContext';
import { useChangeCurrentPasswordMutation } from '@/generated';
import { ChangePasswordSchema } from '../_utils/change-password-schema';

const ForgetPassword = () => {
  const [ChangeCurrentPassword, { loading, error, data }] = useChangeCurrentPasswordMutation();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    try {
      await ChangeCurrentPassword({
        variables: {
          email: user?.email ?? '',
          newPassword: values.newPassword,
          currentPassword: values.current,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#111113] text-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Нууц үг өөрчлөх</h2>
        <div className="bg-[#1c1c1e] p-8 rounded-xl space-y-6 shadow-lg" data-cy="password-form">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="current-password" className="text-sm text-gray-300">
                      Хуучин нууц үг
                    </FormLabel>
                    <FormControl>
                      <Input {...field} id="current-password" type="password" data-testid="current-password" className="bg-white text-black" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">Шинэ нууц үг</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" data-testid="new-password" className="bg-white text-black" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirm-password" className="text-sm text-gray-300">
                      Шинэ нууц үг давтах
                    </FormLabel>
                    <FormControl>
                      <Input {...field} id="confirm-password" type="password" data-testid="confirm-password" className="bg-white text-black" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
              {data?.changeCurrentPassword?.id && <p className="text-green-400 text-sm">Амжилттай солигдлоо!</p>}
              <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" className="w-full bg-sky-500 hover:bg-sky-600" data-testid="save-password">
                {loading ? 'Түр хүлээнэ үү...' : 'Хадгалах'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
