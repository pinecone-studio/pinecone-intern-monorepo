import React, { useEffect, useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useForgotMatchOtpMutation, useSendForgotOtpMutation } from '@/generated';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
};

const SecondStep = ({ setStep, email }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(15);
  const inputRef = useRef<HTMLInputElement>(null);

  const [forgotMatchOtp, { loading }] = useForgotMatchOtpMutation();
  const [sendForgotOtp] = useSendForgotOtpMutation();
  const canResend = timer === 0;

  useEffect(() => {
    if (!canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [canResend]);

  const handleChange = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    const verifyOtp = async () => {
      const { data } = await forgotMatchOtp({ variables: { email, otp: value } });

      if (data?.forgotMatchOtp === 'success') {
        setError('');
        setStep(3);
      } else {
        setError('Wrong code. Please try again.');
        setValue('');
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };

    if (value.length === 4) {
      verifyOtp();
    }
  }, [value, email, forgotMatchOtp, setStep]);

  const resendCode = async () => {
    setError('');
    setValue('');

    await sendForgotOtp({ variables: { email } });
    setTimer(15);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xl font-semibold text-[#09090B]">Confirm email</p>
        <p className="text-sm text-[#71717A] mt-1 w-[322px]">To continue, enter the secure code we sent to {email}. Check junk mail if it’s not in your inbox.</p>
      </div>

      <div className="flex flex-col items-center gap-4" data-testid="otp-slot">
        <form autoComplete="one-time-code">
          <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={value} onChange={handleChange} disabled={loading} ref={inputRef}>
            <InputOTPGroup className="rounded-2xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button data-testid="resend-button" className="text-base font-medium text-blue-600 disabled:opacity-60" onClick={resendCode} disabled={!canResend || loading}>
          {canResend ? 'Send again' : `Send again (${timer})`}
        </button>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-black mt-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondStep;
