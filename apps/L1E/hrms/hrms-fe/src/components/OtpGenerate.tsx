'use client';

import { Card } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Image from 'next/image';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { LuRefreshCw } from 'react-icons/lu';

interface OtpGenerateProps {
  handleChange: (_e: string) => void;
  handlesubmit: () => void;
}

export const OtpGenerate = ({ handleChange, handlesubmit }: OtpGenerateProps) => {
  return (
    <div>
      <Card className="flex flex-col justify-center items-center gap-9 w-[364px] h-[364px] rounded-xl border" data-cy="login-otp-stage">
        <h2>Нэвтрэх</h2>
        <Image src="/Logo.png" alt="Logo" width={32} height={28} />
        <p>Имэйлээ шалгаад код оо оруулна уу.</p>
        <InputOTP maxLength={4} data-cy="enter-input" pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onComplete={handlesubmit}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex flex-row gap-[240px]">
          <button data-testid="button" type="submit" onClick={() => handleChange('email')}>
            <IoIosArrowRoundBack className="w-4 h-4" />
          </button>
          <button>
            <LuRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  );
};
