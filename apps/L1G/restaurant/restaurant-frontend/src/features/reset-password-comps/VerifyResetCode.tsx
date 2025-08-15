'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Image from 'next/image';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSendResetCodeMutation, useVerifyResetCodeMutation } from '@/generated';

const formSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: 'Код 4 оронтой байх ёстой',
    })
    .max(4, {
      message: 'Код 4 оронтой байх ёстой',
    }),
});

export const StepTwo = () => {
  const [verifyResetCode, { loading }] = useVerifyResetCodeMutation();
  const [sendResetCode] = useSendResetCodeMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userEmail = localStorage.getItem('emailAddress');
    try {
      await verifyResetCode({
        variables: {
          input: { code: values.code, email: userEmail || '' },
        },
      });
      router.push('/reset-password/verify-password/update-password');
    } catch (error) {
      if (error instanceof Error && error.message.includes('Invalid code')) {
        form.setError('code', {
          type: 'manual',
          message: 'Код буруу байна',
        });
      } else {
        form.setError('code', {
          type: 'manual',
          message: 'Хүсэлт явуулахад алдаа гарлаа',
        });
      }
    }
  }

  async function ResendResetCode() {
    const userEmail = localStorage.getItem('emailAddress');
    try {
      await sendResetCode({
        variables: {
          input: {
            email: userEmail || '',
          },
        },
      });
      form.setValue('code', '');
    } catch (error) {
      if (error instanceof Error && error.message.includes('User not found')) {
        form.setError('code', {
          type: 'manual',
          message: 'Имэйл хаяг олдсонгүй',
        });
      } else {
        form.setError('code', {
          type: 'manual',
          message: 'Хүсэлт явуулахад алдаа гарлаа',
        });
      }
    }
  }

  if (loading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
        <p className="text-center text-[#441500] ">Уншиж байна</p>
      </div>
    );
  }
  return (
    <div data-cy="Verify-Reset-Code-Page" className="w-screen h-screen flex flex-col items-center pt-[105px] gap-8 ">
      <Image src="/mainLogo.png" alt="Main Logo" height={66} width={54} />
      <div className="flex w-[327px] flex-col gap-2 items-center">
        <h1 className="text-[16px] text-[#3F4145] text-center">Имэйл хаяг руу илгээсээн 4 оронтой кодыг оруулна уу</h1>
        <div className="flex justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[221px] space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        data-cy="opt-input-test"
                        maxLength={4}
                        {...field}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value.length === 4) {
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="rounded-tl-[8px] rounded-bl-[8px] h-[56px]  w-[56px] " />
                          <InputOTPSlot index={1} className="h-[56px]  w-[56px] " />
                          <InputOTPSlot index={2} className="h-[56px]  w-[56px] " />
                          <InputOTPSlot index={3} className="rounded-tr-[8px] rounded-br-[8px] h-[56px] w-[56px]  " />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage data-cy="Error-Message" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="flex justify-between w-[221px]">
          <ArrowLeft data-cy="ArrowLeft-Back" onClick={() => router.push('/reset-password')} className="w-[14px] text-black cursor-pointer" />
          <RefreshCcw data-cy="Resend-Button" onClick={ResendResetCode} className="w-[16px] text-black cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
