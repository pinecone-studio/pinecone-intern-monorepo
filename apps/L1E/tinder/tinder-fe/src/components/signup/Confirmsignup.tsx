'use client';
import { useEffect, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import Addpassword from './Addpassword';

const Confirmsignup = () => {
  const [step, setStep] = useState<'forget' | 'confirm' | 'newpassword'>('confirm');
  const [time, setTime] = useState(30);
  const [otp, setOtp] = useState<string>(''); // State to store OTP value

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (otp.length === 4) {
      setStep('newpassword'); // Switch to the new password step
    }
  }, [otp]);
  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      {step === 'confirm' ? (
        <div className="w-[350px] flex flex-col items-center justify-between h-[270px]">
          <img className="w-[100px] h-[24px]" src="redlogo.png" alt="Logo" />
          <div className="flex gap-2 h-[72px] w-[305px] items-center flex-col">
            <div className="font-semibold text-2xl">Confirm email</div>
            <div className="font-normal text-center text-sm text-[#71717A]">To continue, enter the secure code we sent to n.shagai@nest.mn. Check junk mail if it’s not in your inbox.</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <InputOTP maxLength={4} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                  <InputOTPSlot className="rounded-tl-xl border-gray-400 rounded-bl-xl" index={0} />
                  <InputOTPSlot className="border-gray-400" index={1} />
                  <InputOTPSlot className="border-gray-400" index={2} />
                  <InputOTPSlot className="rounded-tr-xl border-gray-400 rounded-br-xl" index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex justify-center items-center gap-2">
              <button>Send again</button>
              <p>({`${time % 60}`.padStart(1, '0')})</p>
            </div>
          </div>
        </div>
      ) : (
        step === 'newpassword' && <Addpassword />
      )}
    </div>
  );
};

export default Confirmsignup;
