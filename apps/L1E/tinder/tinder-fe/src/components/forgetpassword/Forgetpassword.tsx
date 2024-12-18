'use client';
import { useState } from 'react';
import Confirm from './Confirm';

const Forgetpassword = () => {
  const [step, setStep] = useState<'forget' | 'confirm' | 'newpassword'>('forget');

  const toggle = (step: 'forget' | 'confirm') => {
    setStep(step);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      {step === 'forget' ? (
        <div className="w-[350px] flex flex-col items-center justify-between h-[240px]">
          <img className="w-[100px] h-[24px]" src="redlogo.png" alt="Logo" />
          <div className="flex gap-2 h-[72px] w-[305px] items-center flex-col">
            <div className="font-semibold text-2xl">Forget password</div>
            <div className="font-normal text-sm text-[#71717A]">Enter your email account to reset password</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="font-medium text-sm">Email</div>
              <input placeholder="name@example.com" className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="text" />
            </div>
            <button className="flex w-[350px] h-[36px] font-medium text-sm justify-center items-center rounded-full text-white bg-[#E11D48E5]" onClick={() => toggle('confirm')}>
              Confirm Email
            </button>
          </div>
        </div>
      ) : (
        step === 'confirm' && <Confirm />
      )}
    </div>
  );
};

export default Forgetpassword;
