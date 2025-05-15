'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import React, { useRef } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

type InputOtpProps = {
  setOtp: (_val: string) => void;
  error: string;
  setError: (_val: string) => void;
  otp: string;
  verifying: boolean;
  resending: boolean;
  handleResend: () => void;
  timer: number;
  canResend: boolean;
};

const InputOtp = ({ setOtp, error, setError, otp, verifying, resending, handleResend, timer, canResend }: InputOtpProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (val: string) => {
    setOtp(val);
    if (error) setError('');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form autoComplete="one-time-code" className="flex">
        <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={otp} onChange={handleChange} disabled={verifying || resending} ref={inputRef} data-testid="otp">
          <InputOTPGroup className="rounded-2xl">
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleResend} disabled={!canResend || resending} className="text-[16px] font-medium disabled:opacity-70">
        {canResend ? 'Send again' : `Send again (${timer})`}
      </button>
    </div>
  );
};

export default InputOtp;
