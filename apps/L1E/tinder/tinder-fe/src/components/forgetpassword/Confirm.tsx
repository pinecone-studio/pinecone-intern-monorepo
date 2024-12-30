/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Setnewpassword from './Setnewpassword';
import Image from 'next/image';

const Confirm: React.FC = () => {
  const [step, _setStep] = useState<'confirm' | 'newpassword'>('confirm');
  const [_time, _setTime] = useState(30);

  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      {/* {step === 'confirm' ? ( */}
      <div className=" flex flex-col items-center justify-between h-[276px] w-[350px] ">
        <Image width={100} height={24} src="/redlogo.png" alt="Logo" />
        <div className="flex gap-2 h-[72px] w-[305px] items-center flex-col">
          <div className="font-semibold text-black text-2xl">Confirm email</div>
          <div className="font-normal text-center text-sm text-[#71717A]">{`To continue, enter the secure code we sent to  Check junk mail if it’s not in your inbox.`}</div>
        </div>
        <div className="flex items-center justify-center w-[157px] max-sm:w-full">
          <div className="flex gap-[2px]">
            <input
              data-testid="Signup"
              type="text"
              maxLength={1}
              className="h-[40px] w-[40px] text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black"
            />
          </div>
        </div>
      </div>
      {/* ) : ( */}
      {/* step === 'newpassword' && <Setnewpassword /> */}
      {/* )} */}
    </div>
  );
};

export default Confirm;
