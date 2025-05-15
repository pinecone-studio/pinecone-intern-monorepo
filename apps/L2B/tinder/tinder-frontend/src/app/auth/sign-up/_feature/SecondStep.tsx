import React, { useEffect, useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useIsVerifiedMutation } from '@/generated';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
};

const RESEND_TIMEOUT = 15;

const SecondStep = ({ setStep, email }: Props) => {
  const [verifyOtp, { loading: verifying }] = useIsVerifiedMutation();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [resending, setResending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canResend && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [timer, canResend]);

  useEffect(() => {
    if (otp.length === 4) {
      (async () => {
        const { data } = await verifyOtp({ variables: { email, otp } });
        if (data?.isVerified === 'success') {
          setStep(3);
        } else {
          setError('The password is incorrect. Please check again.');
        }
      })();
    }
  }, [otp]);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setTimer(RESEND_TIMEOUT);
      setCanResend(false);
      setResending(false);
    }, 1000);
  };

  const handleChange = (val: string) => {
    setOtp(val);
    if (error) setError('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-2xl font-semibold text-[#09090B]">Confirm email</p>
        <p className="text-sm text-[#71717A] mt-1 w-[322px]">
          To continue, enter the secure code we sent to <strong>{email}</strong>. Check junk mail if it’s not in your inbox.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4" data-testid="otp-slot">
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

        {(verifying || resending) && (
          <div role="status" className="flex items-center gap-2 mt-2 text-sm text-black">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            {verifying ? 'Verifying...' : 'Resending...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondStep;
