import React, { useEffect, useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const SecondStep = ({ setStep }: Props) => {
  const correctCode = '1234';
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const resendCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Code resent!');
      setTimer(15);
      setCanResend(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (val: string) => {
    setValue(val);
    if (error) setError('');
  };

  useEffect(() => {
    if (value.length === 4) {
      setIsLoading(true);
      setTimeout(() => {
        if (value === correctCode) {
          setError('');
          setStep(3);
        } else {
          setError('Wrong code. Please try again.');
          setValue('');
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }
        setIsLoading(false);
      }, 1500);
    }
  }, [value, setStep]);

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[4px] py-[8px] text-[24px] items-center justify-center">
        <p className="font-semibold text-[#09090B]">Confirm email</p>
        <p className="text-[#71717A] text-[14px] text-center w-[322px] h-[60px]">To continue, enter the secure code we sent to n.shagai@nest.mn. Check junk mail if it’s not in your inbox.</p>
      </div>

      <div className="flex flex-col gap-[16px] items-center justify-center" data-testid="otp-slot">
        <form autoComplete="one-time-code" className="flex">
          <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={value} onChange={handleChange} disabled={isLoading} ref={inputRef} data-testid="otp">
            <InputOTPGroup className="rounded-2xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </form>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <button className="text-[16px] font-medium disabled:opacity-70" onClick={resendCode} disabled={!canResend || isLoading}>
          {canResend ? 'Send again' : `Send again (${timer})`}
        </button>

        {isLoading && (
          <div role="status" className="flex items-center gap-2 mt-2 text-black text-sm">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondStep;
