'use client';

import { MoveLeft, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, KeyboardEvent } from 'react';

const OTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only one character
    setOtp(newOtp);

    // Move to the next input if the value length is 1
    if (value.length === 1 && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // const handleResend = () => {};

  return (
    <div className="flex flex-col items-center w-full mx-auto px-4 gap-8 max-w-[340px]">
      <Image src="/Logo.png" alt="Logo" width={54} height={66} />
      <div className="flex flex-col gap-6 justify-center items-center">
        <p className="text-center">Имэйл хаяг руу илгээсэн 4 оронтой кодыг оруулна уу</p>
        <div className="flex flex-col gap-6">
          <form className="flex" aria-label="Enter the 4-digit code sent to your email">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                className={`w-12 h-12 ${
                  index === 0 ? 'rounded-l-lg border-r-0' : index === otp.length - 1 ? 'rounded-r-lg border-l-0' : index === 2 ? 'border-l-0' : ''
                } border border-[#D6D8DB] text-center`}
                aria-label={`Digit ${index + 1}`}
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </form>
          <div className="flex justify-between items-center gap-2 w-full">
            <Link href="/reset-password">
              <MoveLeft width={13} height={13} className="hover:text-gray-700" />
            </Link>
            <button
              className="hover:text-gray-700"
              aria-label="Resend OTP"
              //  onClick={handleResend}
            >
              <RefreshCcw width={13} height={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
