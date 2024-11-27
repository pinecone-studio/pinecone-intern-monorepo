'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

export const OtpForm = ({ setInputData, setCurrentIndex, inputData, handleOnchange }) => {
  const handleClick = () => {
    setCurrentIndex(2);
    setInputData({ otp: inputData.otp });
    console.log(inputData)
  };

  return (
    <div className="flex justify-center">
      <div className="mt-[200px] flex flex-col items-center gap-6 w-[350px]">
        <div className="flex gap-2 items-center justify-center max-h-5">
          <p className="h-5 w-5 bg-[#2563EB] rounded-full"></p>
          <p className="text-[20px]">Pedia</p>
        </div>
        <div className="flex items-center flex-col">
          <p className="text-[24px] font-semibold leading-8">Confirm email</p>
          <p className="text-[#71717A] text-sm text-center">To continue, enter the secure code we sent to n.shagai@nest.mn. Check junk mail if it’s not in your inbox.</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <InputOTP name="otp" onChange={handleOnchange} maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {!inputData.otp ? (
            <Button variant="ghost">
              <p>Send again</p>
              <p>(15)</p>
            </Button>
          ) : (
            <Button>Continue</Button>
          )}
        </div>
      </div>
    </div>
  );
};
