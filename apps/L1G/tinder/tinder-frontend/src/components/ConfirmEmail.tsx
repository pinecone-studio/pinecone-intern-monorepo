'use client';
import React, { useState } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVerifyOtpMutation, useRequestSignupMutation, OtpType } from '@/generated';
import { ResetPassword } from './ResetPassword';
import { OtpForm } from './OtpForm';
import { CreatePassword } from './CreatePassword';
import { UserData } from 'types/chat';

export const FormSchema = z.object({
  otp: z.string().length(4, { message: 'Your one-time password must be 4 digits.' }).regex(/^\d+$/, { message: 'OTP must contain only digits.' }),
});

type ConfirmEmailProps = {
  onSuccess: () => void;
  email: string;
  updateUserData: (_: Partial<UserData>) => void;
  otpType: OtpType;
};

function useCountdown(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = React.useState(initialSeconds);

  React.useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const reset = () => setTimeLeft(initialSeconds);

  return { timeLeft, reset };
}

async function handleOtpSubmit(
  values: z.infer<typeof FormSchema>,
  email: string | undefined,
  otpType: OtpType,
  updateUserData: (_: Partial<UserData>) => void,
  verifyOtp: ReturnType<typeof useVerifyOtpMutation>[0],
  setOtpId: React.Dispatch<React.SetStateAction<string | null>>
) {
  if (!email) return;

  try {
    const response = await verifyOtp({
      variables: { email, otp: values.otp, otpType },
    });

    const otpIdFromResponse = response.data?.verifyOtp?.otpId;
    if (otpIdFromResponse) {
      setOtpId(otpIdFromResponse);
      updateUserData({ otpId: otpIdFromResponse });
    } else {
      console.error('OTP verification failed or otpId missing');
    }
  } catch (e) {
    console.error('Verification failed:', e);
  }
}

async function handleResendOtp(
  email: string | undefined,
  otpType: OtpType,
  requestSignup: ReturnType<typeof useRequestSignupMutation>[0],
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  resetTimer: () => void
) {
  if (!email) return;
  try {
    setMessage(null);
    await requestSignup({
      variables: { email, otpType },
    });
    resetTimer();
    setMessage('OTP resent successfully.');
  } catch (e) {
    console.error('Failed to resend OTP:', e);
    setMessage('Failed to resend OTP, please try again.');
  }
}

export const ConfirmEmail = ({ onSuccess, email, otpType, updateUserData }: ConfirmEmailProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { otp: '' },
  });

  const [verifyOtp, { loading: verifying, error: verifyError }] = useVerifyOtpMutation();
  const [requestSignup, { loading: resending, error: resendError }] = useRequestSignupMutation();
  const [message, setMessage] = useState<string | null>(null);

  const { timeLeft, reset: resetTimer } = useCountdown(60);

  const [otpId, setOtpId] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    await handleOtpSubmit(values, email, otpType, updateUserData, verifyOtp, setOtpId);
  }

  async function handleResend() {
    await handleResendOtp(email, otpType, requestSignup, setMessage, resetTimer);
  }

  if (otpId) {
    return otpType === OtpType.Create ? <CreatePassword otpId={otpId} onSuccess={onSuccess} updateUserData={updateUserData} /> : <ResetPassword otpId={otpId} onSuccess={onSuccess} />;
  }

  return (
    <div className="w-[340px] flex flex-col gap-4">
      <div className="flex flex-col gap-1 py-2 justify-center items-center">
        <p className="font-sans text-[24px] font-semibold text-[#09090B]">Confirm email</p>
        <p className="font-sans text-[14px] font-normal text-[#71717A] text-center">To continue, enter the secure code we sent to {email}. Check junk mail if it’s not in your inbox.</p>
      </div>

      <div className="w-full flex justify-center items-center gap-4">
        <OtpForm
          form={form}
          onSubmit={onSubmit}
          timeLeft={timeLeft}
          handleResend={handleResend}
          resending={resending}
          resendError={resendError ?? undefined}
          verifyError={verifyError ?? undefined}
          message={message}
          verifying={verifying}
        />
      </div>
    </div>
  );
};
