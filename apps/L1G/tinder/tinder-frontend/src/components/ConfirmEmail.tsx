'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  otp: z.string().length(4, { message: 'Your one-time password must be 4 digits.' }).regex(/^\d+$/, { message: 'OTP must contain only digits.' }),
});

type ConfirmEmailProps = {
  onSuccess: () => void;
};

export const ConfirmEmail = ({ onSuccess }: ConfirmEmailProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  function onSubmit(_value: z.infer<typeof FormSchema>) {
    console.log('otp working');
    onSuccess();
  }

  function handleResend() {
    console.log('Resend OTP clicked');
    setTimeLeft(60);
  }

  return (
    <div className="w-[350px] flex flex-col gap-4">
      <div className="flex flex-col gap-1 py-2 justify-center items-center">
        <p className="font-sans text-[24px] font-semibold text-[#09090B]">Confirm email</p>
        <p className="font-sans text-[14px] font-normal text-[#71717A] text-center">To continue, enter the secure code we sent to n.shagai@nest.mn. Check junk mail if it’s not in your inbox.</p>
      </div>

      <div className="w-full flex justify-center items-center gap-4">
        <Form {...form}>
          <form data-testid="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center gap-4">
            <FormField
              data-testid="otp"
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-center justify-center">
                  <FormLabel></FormLabel>
                  <FormControl>
                    <InputOTP maxLength={4} {...field} className="w-full">
                      <InputOTPGroup className="h-[40px]" data-testid="otp-group">
                        <InputOTPSlot index={0} className="h-full rounded-l-md" />
                        <InputOTPSlot index={1} className="h-full " />
                        <InputOTPSlot index={2} className="h-full " />
                        <InputOTPSlot index={3} className="h-full rounded-r-md" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="py-2 px-4 flex justify-center items-center">
              {timeLeft > 0 ? (
                <p className="text-[14px] font-medium text-[#09090B] font-sans">Send again in {timeLeft}s</p>
              ) : (
                <Button type="button" onClick={handleResend} className="bg-transparent hover:bg-transparent text-[14px] font-medium text-blue-600 hover:underline font-sans">
                  Resend Code
                </Button>
              )}
            </div>

            <Button type="submit" className="w-full bg-[#E11D48E5] bg-opacity-90 text-white hover:bg-[#E11D48E5] rounded-full">
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
