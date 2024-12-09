'use client';
import { Container, useAuth } from '@/components';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { MoveLeft, RefreshCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface VerifyOtpProps {
  footerText: string;
}

export const VerifyOtp = ({ footerText }: VerifyOtpProps) => {
  const { verifyOtp } = useAuth();
  const { requestPasswordRecovery } = useAuth();
  const [value, setValue] = useState('');
  const [refreshCounter, setRefreshCounter] = useState(60);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();

  useEffect(() => {
    if (value.length === 6) {
      handleSubmit();
    }
  }, [value]);

  const handleSubmit = async () => {
    await verifyOtp({
      email: email as string,
      otp: value,
    });
  };

  const handleBack = async () => {
    router.push('/recovery?step=1');
  };

  const handleRefresh = async () => {
    if (refreshCounter === 0) {
      await requestPasswordRecovery({ email: email as string });
      setRefreshCounter(60); // Reset to 60 seconds
    }
  };

  useEffect(() => {
    if (refreshCounter > 0) {
      const timer = setTimeout(() => setRefreshCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [refreshCounter]);

  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem] max-sm:px-3" data-cy="OTPInput-Page">
        <div className="flex rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex flex-col justify-center items-center self-stretch w-[327px] max-sm:w-full">
            <p className="text-[#A1A1AA] self-stretch text-center text-base leading-7 tracking-wide">{footerText}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 self-stretch w-[327px] max-sm:w-full">
            <InputOTP maxLength={6} data-testid="OTPInput" onChange={(value) => setValue(value)}>
              <InputOTPGroup>
                <InputOTPSlot data-testid="OTPInput-Slot-0" className="h-14 w-14" index={0} />
                <InputOTPSlot data-testid="OTPInput-Slot-1" className="h-14 w-14" index={1} />
                <InputOTPSlot data-testid="OTPInput-Slot-2" className="h-14 w-14" index={2} />
                <InputOTPSlot data-testid="OTPInput-Slot-3" className="h-14 w-14" index={3} />
                <InputOTPSlot data-testid="OTPInput-Slot-4" className="h-14 w-14" index={4} />
                <InputOTPSlot data-testid="OTPInput-Slot-5" className="h-14 w-14" index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="flex justify-around w-full max-sm:w-full">
              <div className="w-1/2">
                <MoveLeft onClick={handleBack} data-testid="MoveLeft" className="w-5 h-5 cursor-pointer hover:text-[#54d0f9] hover:scale-125 duration-200" />
                <p className="text-xs text-gray-400">{`Буцах`}</p>
              </div>
              <div className="flex flex-col items-end w-1/2">
                {refreshCounter === 0 ? (
                  <>
                    <RefreshCcw
                      role="button"
                      onClick={handleRefresh}
                      data-testid="RefreshButton"
                      className={`w-5 h-5 cursor-pointer ${refreshCounter === 0 ? 'hover:text-[#54d0f9] hover:scale-125 duration-200' : 'text-gray-400 cursor-not-allowed'}`}
                    />
                    <p className="text-xs text-gray-400">OTP дахин илгээх.</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-400">{refreshCounter > 0 ? `${refreshCounter} секунд хүлээнэ үү.` : 'Баярлалаа!'}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyOtp;
