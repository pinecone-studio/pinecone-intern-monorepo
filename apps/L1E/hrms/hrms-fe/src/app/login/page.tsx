'use client';

import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const Page: React.FC = () => {
  const [loginStage, setLoginStage] = useState<'email' | 'otp'>('email');
  return (
    <div className="w-screen h-screen flex items-center justify-center " data-cy="login-page">
      {loginStage == 'otp' ? (
        <Card className="flex flex-col justify-center items-center gap-9 w-[364px] h-[364px] rounded-xl border " data-cy="login-otp-stage">
          <h2>Нэвтрэх</h2>
          <Image src="/Logo.png" alt="Logo" width={32} height={28} />
          <p>Имэйлээ шалгаад код оо оруулна уу.</p>
          <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <input
              aria-label="Email"
              className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder: focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              id="credential"
              placeholder="Имэйл хаяг"
            />
          </div>
          <button data-cy="login-submit" onClick={() => setLoginStage('otp')} className="h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90" type="submit">
            Үргэлжлүүлэх
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
