'use client';
import { useState } from 'react';

import Link from 'next/link';

const Setnewpassword = () => {
  const [step, setStep] = useState<'forget' | 'confirm' | 'newpassword'>('forget');

  const toggle = (step: 'forget' | 'confirm') => {
    setStep(step);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      <div className="w-[350px] flex flex-col gap-8 items-center justify-between h-[340px]">
        <img className="w-[100px] h-[24px]" src="redlogo.png" alt="Logo" />
        <div className="flex gap-2 h-[92px] w-[350px] items-center flex-col">
          <div className="font-semibold text-2xl">Set new password</div>
          <div className="font-normal text-center text-sm text-[#71717A]">Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-medium text-sm">Password</div>
            {step}
            <input placeholder="Password" className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium text-sm">Confirm password</div>
            <input placeholder="Password repeat" className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="text" />
          </div>
          <Link href="signin" className="flex w-[350px] h-[36px] font-medium text-sm justify-center items-center rounded-full text-white bg-[#E11D48]" onClick={() => toggle('confirm')}>
            Confirm Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Setnewpassword;
