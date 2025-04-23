'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { GoArrowLeft } from 'react-icons/go';
import { FiRefreshCw } from 'react-icons/fi';
export const VerificationCode = () => {
  return (
    <div className="bg-black flex justify-center h-[100vh] w-[100%]">
      <div className="w-[446px] h-[240px] border-[1px]  border-[#27272A] rounded-2xl mt-[190px]">
        <div className="w-[350px] h-[220px] ml-[48px]">
          <div className="text-[#A1A1AA] mt-[32px] text-sm">Имэйл хаяг руу илгээсээн 4 оронтой кодыг оруулна уу.</div>
          <div className="flex justify-center mt-[24px] text-white  hover: border-white">
            <InputOTP maxLength={4} className="">
              <InputOTPGroup>
                <InputOTPSlot index={0} className="border-[#2C2E33]" />
                <InputOTPSlot index={1} className="border-[#2C2E33]" />
                <InputOTPSlot index={2} className="border-[#2C2E33]" />
                <InputOTPSlot index={3} className="border-[#2C2E33]" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex justify-center mt-[24px] w-[210px] h-[16px] ml-[40px]">
            <div className="text-white ml-[50px] ">
              <GoArrowLeft />
            </div>
            <div className="text-white ml-[50px]">
              <FiRefreshCw />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
