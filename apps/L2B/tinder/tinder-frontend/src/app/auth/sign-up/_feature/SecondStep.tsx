import React, { useEffect, useState } from 'react';

import { useIsVerifiedMutation } from '@/generated';
import InputOtp from './InputOtp';

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

  useEffect(() => {
    if (!canResend && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [canResend, timer]);

  useEffect(() => {
    if (timer === 0 && !canResend) {
      setCanResend(true);
    }
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
  }, [otp, email, setStep, verifyOtp]);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setTimer(RESEND_TIMEOUT);
      setCanResend(false);
      setResending(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-2xl font-semibold text-[#09090B]">Confirm email</p>
        <p className="text-sm text-[#71717A] mt-1 w-[322px]">
          To continue, enter the secure code we sent to <strong>{email}</strong>. Check junk mail if it’s not in your inbox.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <InputOtp setOtp={setOtp} error={error} otp={otp} verifying={verifying} resending={resending} handleResend={handleResend} timer={timer} canResend={canResend} />

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
