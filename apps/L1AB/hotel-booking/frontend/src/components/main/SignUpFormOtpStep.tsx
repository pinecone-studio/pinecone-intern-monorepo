'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { useSignUpCheckOtpMutation, useSignUpSendOtpMutation } from '@/generated';
import { toast } from 'react-toastify';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

interface SignUpFormOtpStepProps {
  nextHandler: () => void;
  email: string;
}

const SignUpFormOtpStep: React.FC<SignUpFormOtpStepProps> = ({ nextHandler, email }) => {
  const [timer, setTimer] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>('');

  const [signUpCheckOtp, { loading: otpChecking }] = useSignUpCheckOtpMutation();
  const [signUpSendOtpMutation] = useSignUpSendOtpMutation();

  useEffect(() => {
    if (!timerRunning || timer <= 0) {
      if (timer === 0 && timerRunning) {
        setTimerRunning(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, timerRunning]);

  const handleValueChange = useCallback((value: string) => {
    setOtp(value);
  }, []);

  const resendOtp = async () => {
    try {
      await signUpSendOtpMutation({
        variables: { email },
      });

      setTimer(60);
      setTimerRunning(true);
      setOtp('');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const handleSubmit = async () => {
      if (otp.length === 4) {
        try {
          const { data } = await signUpCheckOtp({ variables: { input: { otp, email } } });
          if (data?.SignUpCheckOtp?.success) {
            nextHandler();
            toast.success('OTP verified successfully');
          } else {
            toast.error('OTP is wrong');
          }
        } catch {
          toast.error('Failed to verify OTP. Please try again.');
        }
      }
    };

    handleSubmit();
  }, [otp, signUpCheckOtp, nextHandler, email]);

  return (
    <div className="space-y-8">
      <div className="flex items-center flex-col">
        <p className="text-[24px] font-semibold leading-8">Confirm email</p>
        <p className="text-[#71717A] text-sm text-center">To continue, enter the secure code we sent to {email}. Check junk mail if it’s not in your inbox.</p>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <InputOTP onChange={handleValueChange} maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} data-testid="otp-input-group">
          <InputOTPGroup>
            <InputOTPSlot index={0} data-testid="otp-input-group-1" aria-label="OTP input 1" />
            <InputOTPSlot index={1} data-testid="otp-input-group-2" aria-label="OTP input 2" />
            <InputOTPSlot index={2} data-testid="otp-input-group-3" aria-label="OTP input 3" />
            <InputOTPSlot index={3} data-testid="otp-input-group-4" aria-label="OTP input 4" />
          </InputOTPGroup>
        </InputOTP>
        {otpChecking && <p>Verifying...</p>}
        <Button variant="ghost" onClick={resendOtp} disabled={timerRunning} data-testid="resend-button">
          {timerRunning ? `Send again (${timer}s)` : 'Send again'}
        </Button>
      </div>
    </div>
  );
};

export default SignUpFormOtpStep;
