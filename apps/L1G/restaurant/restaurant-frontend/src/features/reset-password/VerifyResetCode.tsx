'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Image from 'next/image';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { useSendResetCodeMutation, useVerifyResetCodeMutation } from '@/generated';
import { useRouter } from 'next/navigation';

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
  const [verifyPassword] = useVerifyResetCodeMutation();
  const [sendResetCode] = useSendResetCodeMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleVerificationError = (error: Error) => {
    const errorMessage = error.message.toLowerCase();
    const errorMap: Record<string, string> = {
      'invalid code': 'Код буруу байна',
      'not found': 'Имэйл хаяг олдсонгүй',
    };

    const errorType = Object.keys(errorMap).find((key) => errorMessage.includes(key));
    if (errorType) {
      form.setError('code', {
        type: 'manual',
        message: errorMap[errorType],
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userEmail = localStorage.getItem('emailAddress');
    try {
      await verifyPassword({
        variables: {
          input: { code: values.code, email: userEmail || '' },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        handleVerificationError(error);
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
      router.push('/update-password');
    } catch (error) {
      if (error instanceof Error && error.message.includes('User not found')) {
        form.setError('code', {
          type: 'manual',
          message: 'Имайл хаяг олдсонгүй',
        });
      } else {
        form.setError('code', {
          type: 'manual',
          message: 'Хүсэлт явуулахад алдаа гарлаа',
        });
      }
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-[105px] gap-8 ">
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
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} data-testid="otp-slot-0" className="rounded-tl-[8px] rounded-bl-[8px] h-[56px]  w-[56px] " />
                          <InputOTPSlot index={1} data-testid="otp-slot-1" className="h-[56px]  w-[56px] " />
                          <InputOTPSlot index={2} data-testid="otp-slot-2" className="h-[56px]  w-[56px] " />
                          <InputOTPSlot index={3} data-testid="otp-slot-3" className="rounded-tr-[8px] rounded-br-[8px] h-[56px] w-[56px]  " />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="flex justify-between w-[221px]">
          <ArrowLeft onClick={() => router.push('/reset-password/verify-password/reset-password')} className="w-[14px] text-black cursor-pointer" />
          <RefreshCcw onClick={ResendResetCode} className="w-[16px] text-black cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
