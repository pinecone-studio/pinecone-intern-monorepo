'use client';
import Link from 'next/link';
import { useState } from 'react';
import Confirmsignup from './Confirmsignup';

const Signup = () => {
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');

  const jumper = (step: 'signup' | 'confirm') => {
    setStep(step);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      {step === 'signup' ? (
        <div className="w-[350px] flex flex-col items-center justify-between h-[410px]">
          <img className="w-[100px] h-[24px]" src="redlogo.png" alt="" />
          <div className="flex gap-2 h-[72px] w-[305px] items-center flex-col">
            <div className="font-semibold text-2xl">Create an account</div>
            <div className="font-normal text-sm text-[#71717A]">Enter your email below to create your account</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="font-medium text-sm">Email</div>
                <input placeholder="name@example.com" className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="text" name="" id="" />
              </div>
            </div>
            <button onClick={() => jumper('confirm')} className="flex w-[350px] h-[36px] font-medium text-sm justify-center items-center rounded-full text-white bg-[#E11D48E5]">
              Continue
            </button>
            <div className="flex justify-between items-center">
              <div className="w-[146px] h-[1px] border-[1px] border-[#E4E4E7]"></div>
              <div className="text-xs text-[#71717A]">OR </div>
              <div className="w-[146px] h-[1px] border-[1px] border-[#E4E4E7]"></div>
            </div>
            <Link href="signin" className="font-medium text-center text-sm w-[350px] h-[36px] rounded-full px-3 py-2 border-[1px] border-[#E4E4E7] text-black">
              Log in
            </Link>
          </div>
        </div>
      ) : (
        step === 'confirm' && <Confirmsignup />
      )}
    </div>
  );
};

export default Signup;
