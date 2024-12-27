'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

const OtPpasswordcomp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (index > 0 && otp[index] === '' && e.key === 'Backspace') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.some((digit) => digit === '')) {
      setError('Бүх талбарыг бөглөнө үү.');
      return;
    }
  };

  const handleResend = () => {
    console.log('Resending OTP');
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen p-4 bg-gray-50" data-cy="OTP-Page">
      <div className="flex items-center h-full">
        <div className="w-[300px] p-8 py-16 flex flex-col gap-8 rounded-3xl border bg-card shadow-sm text-card-foreground">
          <div className="text-center flex flex-col items-center gap-5">
            <div>
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Нэвтрэх</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35" fill="none">
              <path
                d="M6.53711 3.05531L1.21625 13.2358C0.552329 14.5102 0.219238 15.9082 0.219238 17.3085C0.219238 18.7088 0.552329 20.1072 1.21625 21.3811L6.53711 31.5616C7.51785 33.4423 9.43595 34.6165 11.5235 34.6165H17.1757V31.7324H17.1734C16.1307 31.7324 15.1717 31.1464 14.6813 30.2061L9.36228 20.0237C8.91755 19.1748 8.6961 18.2428 8.6961 17.3085C8.6961 16.3742 8.91755 15.4422 9.36228 14.5932L14.6813 4.41086C15.1717 3.47056 16.1307 2.88413 17.1734 2.88413H17.1757V0H11.5235C9.43595 0 7.51785 1.17469 6.53711 3.05531Z"
                fill="currentColor"
              />
              <path
                d="M38.7839 13.2358L33.4631 3.05531C32.4819 1.17469 30.5642 0 28.4766 0H22.8245V2.88413H22.8268C23.8694 2.88413 24.8285 3.47055 25.3188 4.41086L30.6379 14.5932C31.0822 15.4422 31.3036 16.3742 31.3036 17.3085C31.3036 18.2428 31.0822 19.1748 30.6379 20.0237L25.3188 30.2061C24.8285 31.1464 23.8694 31.7324 22.8268 31.7324H22.8245V34.6165H28.4766C30.5642 34.6165 32.4819 33.4423 33.4631 31.5616L38.7839 21.3811C39.4478 20.1072 39.7809 18.7088 39.7809 17.3085C39.7809 15.9082 39.4478 14.5102 38.7839 13.2358Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm text-muted-foreground">Имэйлээ шалгаад код оо оруулна уу.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  data-testid={`otp${index}`}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(input) => (inputRefs.current[index] = input)}
                  className="w-12 h-12 text-center text-lg border-2 border-gray-200 rounded focus:border-primary focus:outline-none"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  data-cy={`OTP-Input-${index}`}
                />
              ))}
            </div>
            {error && (
              <h1 className="pt-2 text-[12.8px] font-medium text-[#E11D48]" data-cy="OTP-Page-Error-Message">
                {error}
              </h1>
            )}
            <button
              data-testid="handle-btn"
              onClick={() => handleSubmit()}
              className="h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              type="submit"
              data-cy="OTP-Page-Submit-Button"
            >
              Баталгаажуулах
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-[300px] pt-4">
        <button data-testid="back-btn" onClick={() => window.history.back()} className="text-sm text-gray-500 hover:text-gray-700 flex items-center" data-cy="OTP-Page-Back-Button">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Буцах
        </button>
        <button data-testid="resent-btn" onClick={handleResend} className="text-sm text-gray-500 hover:text-gray-700 flex items-center" data-cy="OTP-Page-Resend-Button">
          <RotateCcw className="w-4 h-4 mr-1" />
          Дахин илгээх
        </button>
      </div>
    </div>
  );
};

export default OtPpasswordcomp;
