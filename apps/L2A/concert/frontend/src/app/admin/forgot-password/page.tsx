'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const EmailOnlySchema = z.object({
  email: z.string().email('Имэйл хаяг буруу байна'),
});

const ForgotPassword = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof EmailOnlySchema>>({
    mode: 'onChange',
    resolver: zodResolver(EmailOnlySchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof EmailOnlySchema>) => {
    console.log('Илгээсэн email:', values.email);

    router.push('/admin/change-password');
  };

  return (
    <div className="flex justify-center h-[100vh] w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[446px] h-[450px] flex flex-col gap-4 items-center justify-center">
          <h1 className="text-2xl font-medium text-black">Нууц үг сэргээх</h1>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="email" autoComplete="email" placeholder="Имэйл хаяг" className="rounded-md border w-[350px] h-[36px] mt-1 pl-2 shadow" />
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

export default ForgotPassword;
