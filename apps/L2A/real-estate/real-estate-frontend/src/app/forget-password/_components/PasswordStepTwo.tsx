'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRequestOtpMutation, useVerifyOtpMutation } from '@/generated';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import type { PasswordStepTwoProps } from '../page';

export const PasswordStepTwo = ({ setStep, email, testLoading }: PasswordStepTwoProps & { testLoading?: boolean }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(15);
  const [resendEnabled, setResendEnabled] = useState(false);

  const [requestOTP] = useRequestOtpMutation();
  const [verifyOTP, { loading }] = useVerifyOtpMutation();
  const isLoading = typeof testLoading === 'boolean' ? testLoading : loading;

  const otpRequestRef = useRef(false);

  const startTimer = useCallback(() => {
    setTimer(15);
    setResendEnabled(false);
  }, []);

  const sendOTP = useCallback(async () => {
    if (!email) {
      setError('Email not found. Please restart the signup process.');
      return;
    }
    try {
      await requestOTP({ variables: { email } });
      startTimer();
    } catch {
      setError('Error sending OTP. Please try again.');
    }
  }, [email, requestOTP, startTimer]);

  const handleVerify = useCallback(() => {
    verifyOTP({ variables: { email, otp } })
      .then(({ data }) => {
        if (data?.verifyOTP === true) {
          setStep(3);
        } else {
          setError('Invalid OTP. Please try again.');
        }
      })
      .catch(() => {
        setError('Error verifying OTP. Please try again.');
      });
  }, [otp, email, verifyOTP, setStep]);

  useEffect(() => {
    if (!otpRequestRef.current && email) {
      otpRequestRef.current = true;
      sendOTP();
    }
  }, [email, sendOTP]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp, handleVerify]);

  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex flex-col items-center justify-center">
      <InputOTP data-cy="otp-input" onChange={(val) => setOtp(val)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && (
        <p className="text-red-500" data-testid="otp-error">
          {error}
        </p>
      )}

      {!resendEnabled ? (
        <p className="text-gray-500" data-cy="resend-otp-button">
          Send again ({timer})
        </p>
      ) : (
        <button onClick={sendOTP} className="text-[15px] font-500 text-[#09090B]">
          Send again ({timer})
        </button>
      )}

      {isLoading && (
        <p className="text-gray-500" data-testid="otp-loading">
          Verifying OTP...
        </p>
      )}
    </div>
  );
};
