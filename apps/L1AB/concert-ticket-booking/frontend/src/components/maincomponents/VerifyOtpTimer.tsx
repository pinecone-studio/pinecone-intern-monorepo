'use client';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../providers';
import { useSearchParams } from 'next/navigation';

interface TimerProps {
  initialCounter: number;
}

const Timer = ({ initialCounter }: TimerProps) => {
  const { requestPasswordRecovery } = useAuth();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [counter, setCounter] = useState(initialCounter);

  const handleResend = async () => {
    await requestPasswordRecovery({ email: email as string });
    setCounter(initialCounter);
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  return (
    <div>
      {counter > 0 ? (
        <div className="flex flex-col items-end">
          <RefreshCcw size={20} color={'#9ca3af'} />
          <p className="text-xs text-gray-400">{`${counter} секунд хүлээнэ үү.`}</p>
        </div>
      ) : (
        <div className="flex flex-col items-end">
          <RefreshCcw size={20} role="button" onClick={handleResend} data-testid="resend-otp-button" className="cursor-pointer hover:text-[#54d0f9] hover:scale-125 duration-200" />
          <p data-testid="resend-otp-text" className="text-xs text-gray-400">
            OTP дахин илгээх.
          </p>
        </div>
      )}
    </div>
  );
};

export default Timer;
