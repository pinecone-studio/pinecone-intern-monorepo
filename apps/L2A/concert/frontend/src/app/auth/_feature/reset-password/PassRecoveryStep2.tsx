'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { GoArrowLeft } from 'react-icons/go';
import { FiRefreshCw } from 'react-icons/fi';
import { useOtpStep2Mutation } from '@/generated';
import { ArrowLeftCircle } from 'lucide-react';
import LoadingAnimation from '@/app/_components/LoadingAnimation';

export const PassRecoveryStep2 = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {
  const [otp, setOtp] = useState('');
  const [OtpStep2, { error, loading }] = useOtpStep2Mutation();

  const handleSubmit = async () => {
    try {
      const email = localStorage.getItem('OTP-email');
      if (!email) return;
      const res = await OtpStep2({
        variables: { email, otp: Number(otp) },
      });
      if (res.data) {
        localStorage.setItem('OTP-otp', otp);
        setStep(3);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOtp('');
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

  return (
    <div className="bg-black flex justify-center items-center h-[100vh] w-[100%]">
      <div className="border-[1px] flex flex-col justify-center items-center border-[#27272A] rounded-2xl">
        <div className=" flex flex-col items-center justify-center p-10 gap-10">
          <div data-testid="step-back-to-one" onClick={() => setStep(1)} className=" flex items-center gap-2 cursor-pointer ">
            <ArrowLeftCircle /> <div>Буцах</div>
          </div>
          <div className="text-[#A1A1AA] text-sm ">Имэйл хаяг руу илгээсээн 6 оронтой кодыг оруулна уу.</div>
          <div className="flex justify-center text-white  hover: border-white ">
            <InputOTP data-testid="OTP-input" value={otp} onChange={(e) => setOtp(e)} maxLength={6} className="">
              <InputOTPGroup>
                <InputOTPSlot index={0} className="border-[#2C2E33]" />
                <InputOTPSlot index={1} className="border-[#2C2E33]" />
                <InputOTPSlot index={2} className="border-[#2C2E33]" />
                <InputOTPSlot index={3} className="border-[#2C2E33]" />
                <InputOTPSlot index={4} className="border-[#2C2E33]" />
                <InputOTPSlot index={5} className="border-[#2C2E33]" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <div className=" text-red-400 text-xs justify-center flex">{error.message}</div>}
          {loading && <LoadingAnimation />}
          <div className="flex cursor-pointer justify-center  gap-11">
            <div data-testid="otp-step2-backspace" onClick={() => setOtp((prev) => prev.slice(0, -1))} className="text-white cursor-pointer">
              <GoArrowLeft />
            </div>
            <div data-testid="otp-step2-reset" onClick={() => setOtp('')} className="text-white cursor-pointer">
              <FiRefreshCw />
            </div>
          </div>
          {/* {otp.length === 6 && (
            <Button disabled={loading} onClick={handleSubmit}>
              Үргэлжлүүлэх
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
};
