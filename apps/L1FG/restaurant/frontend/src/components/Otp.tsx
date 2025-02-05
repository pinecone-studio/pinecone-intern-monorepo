'use client';

import { useRequestChangePasswordMutation, useRestoreForgetPasswordMutation } from '@/generated';
import { MoveLeft, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, KeyboardEvent, useEffect } from 'react';

const OTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [requestChangePassword] = useRequestChangePasswordMutation();
  const [requestedEmail, setRequestedEmail] = useState<string | null>(null);

  useEffect(() => {
    setRequestedEmail(localStorage.getItem('requestedEmail'));
  }, []);

  const [restoreForgetPassword, { loading, error }] = useRestoreForgetPasswordMutation();
  const router = useRouter();

  useEffect(() => {
    const isFilled = otp.every((digit) => digit !== '');

    if (isFilled) {
      handleSubmit();
    }
  }, [otp]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value.length === 1 && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (requestedEmail) {
      await requestChangePassword({
        variables: { input: { email: requestedEmail } },
      });
    } else {
      router.push('/reset-password');
    }
  };

  const handleSubmit = async () => {
    if (!requestedEmail) {
      router.push('/reset-password');
      return;
    }
    const { data } = await restoreForgetPassword({
      variables: { input: { email: requestedEmail, otp: otp.join('') } },
    });

    localStorage.setItem('userId', JSON.stringify(data?.updateForgetPassword.user._id));
    localStorage.removeItem('requestedEmail');
    router.push('/new-password');
  };

  const back = async () => {
    localStorage.removeItem('requestedEmail');
    router.push('/reset-password');
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto px-4 gap-8 max-w-[340px]">
      <Image src="/Logo.png" alt="Logo" width={54} height={66} />
      <div className="flex flex-col gap-6 justify-center items-center">
        <p className="text-center">Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу</p>
        <div className="flex flex-col gap-6">
          <form className="flex" aria-label="Enter the 6-digit code sent to your email">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                className={`w-10 h-10 border border-[#D6D8DB] text-center ${index === 0 ? 'rounded-l-lg ' : index === otp.length - 1 ? 'rounded-r-lg border-l-0' : 'border-l-0'}`}
                aria-label={`Digit ${index + 1}`}
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={loading} // Disable inputs while verifying
              />
            ))}
          </form>

          {/* Loading Text */}
          {loading && <p className="text-blue-500 text-sm">Шалгаж байна...</p>}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error.message}</p>}

          <div className="flex justify-between items-center gap-2 w-full">
            <button onClick={back} type="button" data-testid="back">
              <MoveLeft width={13} height={13} className="hover:text-gray-700" />
            </button>
            <button data-testid="resendOtp" className="hover:text-gray-700" aria-label="Resend OTP" onClick={handleResend} disabled={loading}>
              <RefreshCcw width={13} height={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
