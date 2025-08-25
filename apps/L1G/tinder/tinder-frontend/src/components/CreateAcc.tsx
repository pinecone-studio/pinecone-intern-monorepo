'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import z from 'zod';
import { useRequestSignupMutation, OtpType } from '@/generated';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { UserData } from '@/app/(auth)/signup/page';
import { ConfirmEmail } from './ConfirmEmail';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
});

type CreateAccountProps = {
  onSuccess: () => void;
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
};

export const CreateAccount = ({ onSuccess, userData, updateUserData }: CreateAccountProps) => {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const [requestSignup, { loading, error }] = useRequestSignupMutation();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setMessage(null);
      await requestSignup({
        variables: { email: values.email, otpType: OtpType.Create },
      });
      setMessage('OTP resent successfully.');
      updateUserData({ email: values.email });
      setStep('otp');
    } catch (e) {
      console.error('Failed to resend OTP:', e);
      setMessage('Failed to resend OTP, please try again.');
    }
  }

  const handleOtpSuccess = () => {
    console.log('OTP verified successfully');
    onSuccess();
  };

  if (step === 'otp' && userData.email) return <ConfirmEmail email={userData.email} onSuccess={handleOtpSuccess} updateUserData={updateUserData} otpType={OtpType.Create} />;

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="items-center flex flex-col text-center">
        <h1 className="font-semibold text-[24px] font-sans">Create an account</h1>
        <p className="text-[#71717A] text-[14px] font-[400]">Enter your email below to create your account</p>
      </div>

      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} className="rounded-md" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="rounded-full bg-[#E11D48E5] bg-opacity-90 font-sans hover:bg-[#E11D48E5] hover:bg-opacity-100">
              Continue
            </Button>
            {error && <p className="text-[14px] text-red-500 mt-2">{error.message}</p>}
          </form>
        </Form>
        <div className="w-full flex justify-between items-center gap-[10px] py-4">
          <Separator className="w-[156px]" />
          <p className=" font-[400] text-[12px] text-[#71717A]">OR</p>
          <Separator className="w-[156px]" />
        </div>

        <Button onClick={() => router.push('/login')} className="rounded-full border-[1px] border-[#E4E4E7] bg-white text-[#18181B] text-[14px] font-[500] shadow-sm hover:bg-[#E4E4E7]">
          Log in
        </Button>
      </div>

      <p className="text-center text-wrap w-[249px] text-[14px] text-[#71717A] font-[400]">
        By clicking continue, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};
