'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { MoveLeft } from 'lucide-react';
import { passwordClick } from '@/app/resetPassword/page';
import { useUpdateForgetPasswordInputMutation } from '@/generated';

const CodeInput = ({ handleBack, handleNext, data }: passwordClick) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [updateForgetPasswordInput] = useUpdateForgetPasswordInputMutation();

  const handleOtp = async () => {
    const otpString = code.join('');

    if (otpString.length === 6) {
      await updateForgetPasswordInput({
        variables: { input: { email: data.email, otp: otpString } },
      });
      handleNext();
    } else {
      console.log('Please complete the OTP input.');
    }
  };

  useEffect(() => {
    const isFilled = code.every((digit) => digit !== '');
    if (isFilled) {
      handleNext();
    }
  }, [code, handleNext]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handlePrev = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="border border-neutral-800 px-12 py-8 rounded-xl flex flex-col gap-6">
        <div className="text-neutral-400 font-thin text-[18px] w-[327px] mx-auto flex-col text-center">Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу</div>
        <div className="flex justify-center">
          {code.map((digit, index) => (
            <input
              data-cy="otp-code"
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePrev(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border border-neutral-800 rounded-lg bg-transparent text-white text-center text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          ))}
        </div>
        <div data-testid="icons-container" className="flex justify-between text-white text-sm px-2">
          <MoveLeft data-cy="otp-back" onClick={handleBack} />
          <RefreshCw data-cy="otp-next" onClick={handleOtp} />
        </div>
      </div>
    </div>
  );
};

export default CodeInput;
