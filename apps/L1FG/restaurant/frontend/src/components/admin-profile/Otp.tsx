'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export const OtpPattern = () => {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
};
