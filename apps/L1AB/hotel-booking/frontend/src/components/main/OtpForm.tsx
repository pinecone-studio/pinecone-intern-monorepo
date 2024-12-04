'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { usePasswordChangeMutation, usePasswordRecoveryRequestMutation } from '@/generated';
import { useState, useEffect, useCallback } from 'react';
import { OtpFormProps } from '@/app/forgetpassword/page';

export const OtpForm = ({ setInputData, setCurrentIndex, inputData }: OtpFormProps) => {
  const [passwordChange, { loading, error }] = usePasswordChangeMutation();
  const [passwordRecoveryRequest] = usePasswordRecoveryRequestMutation();
  const [timer, setTimer] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    setTimer(60);
    setTimerRunning(true);
  }, []);

  useEffect(() => {
    if (timerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setTimerRunning(false);
    }
  }, [timer, timerRunning]);

  const handleClick = useCallback(async () => {
    await passwordChange({
      variables: {
        input: { otp: inputData.otp, email: inputData.email, password: '' },
      },
    });
    setCurrentIndex(2);
  }, [inputData, passwordChange, setCurrentIndex]);

  const handleValueChange = useCallback(
    (value: string) => {
      setInputData((prev) => ({
        ...prev,
        otp: value,
      }));
    },
    [setInputData]
  );

  const resendOtp = useCallback(() => {
    passwordRecoveryRequest({
      variables: {
        input: { email: inputData.email },
      },
    });
    setTimer(60);
    setTimerRunning(true);
  }, [inputData.email, passwordRecoveryRequest]);

  return (
    <div className="flex justify-center">
      <div className="mt-[200px] flex flex-col items-center gap-6 w-[350px]">
        <div className="flex gap-2 items-center justify-center max-h-5">
          <p className="h-5 w-5 bg-[#2563EB] rounded-full"></p>
          <p className="text-[20px]">Pedia</p>
        </div>
        <div className="flex items-center flex-col">
          <p className="text-[24px] font-semibold leading-8">Confirm email</p>
          <p className="text-[#71717A] text-sm text-center">
            To continue, enter the secure code we sent to {inputData.email}. Check junk mail if it’s not in your inbox.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <InputOTP
            onChange={handleValueChange}
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            data-testid="otp-input-group"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} aria-label="OTP input 1" />
              <InputOTPSlot index={1} aria-label="OTP input 2" />
              <InputOTPSlot index={2} aria-label="OTP input 3" />
              <InputOTPSlot index={3} aria-label="OTP input 4" />
            </InputOTPGroup>
          </InputOTP>
          {loading ? (
            <Button variant="ghost" disabled data-testid="continue-button-disabled">
              Verifying...
            </Button>
          ) : (
            <Button onClick={handleClick} data-testid="continue-button">
              Continue
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={resendOtp}
            disabled={timerRunning}
            data-testid="resend-button"
          >
            {timerRunning ? `Send again (${timer}s)` : 'Send again'}
          </Button>
          {error && (
            <p className="text-red-500 text-sm" data-testid="error-message">
              {error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
