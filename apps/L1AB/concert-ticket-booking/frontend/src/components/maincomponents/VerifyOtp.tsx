'use client';
import { Container } from '@/components';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { MoveLeft, RefreshCcw } from 'lucide-react';

interface VerifyOtpProps {
  footerText: string;
}

export const VerifyOtp = ({ footerText }: VerifyOtpProps) => {
  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem] max-sm:px-3" data-cy="OTPInput-Page">
        <div className="flex rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex flex-col justify-center items-center self-stretch w-[327px] max-sm:w-full">
            <p className="text-[#A1A1AA] self-stretch text-center text-base leading-7 tracking-wide">{footerText}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 self-stretch w-[327px] max-sm:w-full">
            <InputOTP maxLength={6} data-testid="OTPInput">
              <InputOTPGroup>
                <InputOTPSlot data-testid="OTPInput-Slot-0" className="h-14 w-14" index={0} />
                <InputOTPSlot data-testid="OTPInput-Slot-1" className="h-14 w-14" index={1} />
                <InputOTPSlot data-testid="OTPInput-Slot-2" className="h-14 w-14" index={2} />
                <InputOTPSlot data-testid="OTPInput-Slot-3" className="h-14 w-14" index={3} />
                <InputOTPSlot data-testid="OTPInput-Slot-4" className="h-14 w-14" index={4} />
                <InputOTPSlot data-testid="OTPInput-Slot-5" className="h-14 w-14" index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="flex justify-between w-[211px] max-sm:w-full">
              <MoveLeft data-testid="MoveLeft" className="w-5 h-5" />
              <RefreshCcw data-testid="RefreshCcw" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyOtp;
