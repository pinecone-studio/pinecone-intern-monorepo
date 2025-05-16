'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChangePasswordSchema } from '../../_utils/change-password-schema';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/_components/context/AuthContext';
import { useChangeCurrentPasswordMutation } from '@/generated';

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
        variables: { email: user?.email ?? '', newPassword: values.newPassword, currentPassword: values.current },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-[#111113] text-white p-8">
      <h1 className="text-3xl font-bold mb-8" data-cy="profile-header">
        Захиалагчийн мэдээлэл
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Нууц үг сэргээх</h2>
      <div className="bg-[#1c1c1e] p-8 rounded-xl max-w-2xl space-y-6" data-cy="password-form">
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-2">
              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="current-password">Хуучин нууц үг:</FormLabel>
                    <FormControl>
                      <Input {...field} id="current-password" data-testid="current-password" type="password" />
                    </FormControl>
                    <FormMessage className=" text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Шинэ нууц үг:</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="new-password" type="password" />
                    </FormControl>
                    <FormMessage className=" text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="current-password">Шинэ нууц үг давтах:</FormLabel>
                    <FormControl>
                      <Input {...field} id="current-password" data-testid="confirm-password" type="password" />
                    </FormControl>
                    <FormMessage className=" text-white" />
                  </FormItem>
                )}
              />
            </div>
            {error && <div>{error.message}</div>}
            {data?.changeCurrentPassword?.id && <div className=" text-green-500">Амжилттай солигдлоо!</div>}
            <Button disabled={!form.formState.isValid || form.formState.isSubmitting} className=" w-full" data-testid="save-password">
              {loading ? 'Түр хүлээнэ үү!' : 'Хадгалах'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
