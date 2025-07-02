'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useEffect, useRef, useState } from 'react';
import { useRequestPasswordResetMutation, useVerifyPasswordResetOtpMutation } from '@/generated';

const otpSchema = z.object({
  otp: z.string().length(4, 'Must be 4 digits'),
});

type Props = {
  email: string;
  setCurrentStep: (_step: number) => void;
};

export const ForgetPasswordOtp = ({ email, setCurrentStep }: Props) => {
  const [verifyOtp, { loading: verifyLoading }] = useVerifyPasswordResetOtpMutation();
  const [requestPasswordReset, { loading: resendLoading }] = useRequestPasswordResetMutation({
    onError: () => {
      setError('otp', { message: 'Failed to resend OTP' });
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });

  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(15);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = async () => {
    await requestPasswordReset({ variables: { email } });
    setTimer(15);
    setCanResend(false);
  };

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    const response = await verifyOtp({
      variables: { email, otp: data.otp },
    });

    if (response.data?.verifyPasswordResetOTP.success) {
      setCurrentStep(2);
    } else {
      setError('otp', {
        message: response.data?.verifyPasswordResetOTP.message || 'Invalid OTP',
      });
    }
  };

  return (
    <div data-cy="otp-page" className="h-screen relative flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center font-medium">
        <div className="flex items-center gap-2 mb-[24px]">
          <div className="w-5 h-5 rounded-full bg-[#2563eb]"></div>
          <h2 className="text-[#09090b] text-[20px]">Pedia</h2>
        </div>
        <h3 className="text-[24px] leading-8 mb-[4px] font-medium font-inter">Confirm email</h3>
        <p className="font-light text-[#71717a] max-w-xs text-center">To continue, enter the secure code we sent to {email}. Check junk mail if it&#39;s not in your inbox.</p>
      </div>
      <form data-cy="otp-form" onSubmit={handleSubmit(onSubmit)} className="w-[350px] max-w-md mt-6">
        <div data-cy="otp-input" className="mb-4 flex justify-center">
          <InputOTP
            maxLength={4}
            textAlign="center"
            onChange={(value) => {
              setValue('otp', value);
              if (value.length === 4) {
                handleSubmit(onSubmit)();
              }
            }}
            className="gap-2 justify-center"
            disabled={verifyLoading}
            ref={inputRef}
          >
            <InputOTPGroup>
              {[...Array(4)].map((_, i) => (
                <InputOTPSlot key={i} index={i} className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md shadow-sm focus-visible:ring-0 font-extralight" />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {errors.otp && (
            <p data-cy="error-message" className="text-sm text-red-500 text-center mt-2 font-thin">
              {errors.otp.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <button
            data-cy="resend-btn"
            type="button"
            onClick={handleResendCode}
            disabled={!canResend || resendLoading}
            className="text-[#2563eb] text-[14px] font-light hover:underline disabled:text-gray-400 disabled:no-underline"
          >
            {canResend ? 'Resend code' : `Resend code (${timer})`}
          </button>
          {errors.otp && (
            <p data-cy="error-message" className="text-sm text-red-500 text-center mt-2 font-thin">
              {errors.otp.message}
            </p>
          )}
        </div>
      </form>
      <div className="absolute bottom-8 text-sm text-[#09090B] font-light">©2024 Pedia is an Pedia Group company.</div>
    </div>
  );
};
