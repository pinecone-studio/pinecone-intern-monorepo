'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const ChangePasswordSchema = z
  .object({
    password: z.string().min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Нууц үг таарахгүй байна',
  });

const ChangePassword = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    mode: 'onChange',
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (_values: z.infer<typeof ChangePasswordSchema>) => {
    try {
      alert('Нууц үг амжилттай шинэчлэгдлээ.');
      router.push('/auth/signin');
    } catch (err) {
      console.error('Нууц үг шинэчлэх үед алдаа гарлаа:', err);
    }
  };

  return (
    <div className="flex justify-center h-[100vh] w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[446px] h-[450px] flex flex-col gap-4 items-center justify-center">
          <h1 className="text-2xl font-medium text-black">Шинэ нууц үг</h1>

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" placeholder="Нууц үг" className="rounded-md border w-[350px] h-[36px] mt-1 pl-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" placeholder="Нууц үг давтах" className="rounded-md border w-[350px] h-[36px] mt-1 pl-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting} className="w-[350px] h-[36px] bg-black text-white">
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү...' : 'Үргэлжлүүлэх'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
