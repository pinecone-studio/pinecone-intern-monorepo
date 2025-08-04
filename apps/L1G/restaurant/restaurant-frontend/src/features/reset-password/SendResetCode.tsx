'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSendResetCodeMutation } from '@/generated';
import { useRouter } from 'next/navigation';

export const StepOne = () => {
  const [sendResetCode] = useSendResetCodeMutation();
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: 'Имэйл хаяг оруулна уу',
      })
      .max(50)
      .email({ message: 'Имэйл хаяг буруу байна' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await sendResetCode({
        variables: {
          input: {
            email: values.email,
          },
        },
      });
      localStorage.setItem('emailAddress', values.email);
      router.push('/verify-password');
    } catch (error) {
      if (error instanceof Error && error.message.includes('User not found')) {
        form.setError('email', {
          type: 'manual',
          message: 'Имайл хаяг олдсонгүй',
        });
      } else {
        form.setError('email', {
          type: 'manual',
          message: 'Хүсэлт явуулахад алдаа гарлаа',
        });
      }
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Имэйл хаяг" data-testid="email-input-resetpassword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button data-testid="send-code-button" onClick={() => form.handleSubmit(onSubmit)()} className="text-[14px] font-medium text-white bg-[#441500]" type="button">
          Үргэлжүүлэх
        </Button>
      </div>
    </div>
  );
};
