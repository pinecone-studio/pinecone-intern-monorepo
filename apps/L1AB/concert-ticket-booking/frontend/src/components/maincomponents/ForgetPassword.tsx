'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { ForgetPasswordEyeInputs } from './ForgetPasswordEyeInputs';

export const ForgetPassword = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isEyeOpenRePassword, setIsEyeOpenRePassword] = useState(false);

  return (
    <div className="w-full h-full flex flex-col gap-6" data-cy="Profile-Page-ForgetPassword">
      <p className="font-semibold text-2xl text-white">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-6 text-[#FAFAFA] bg-[#131313] rounded-xl">
        <div className="grid gap-2 relative">
          <div className="grid gap-2">
            <Label htmlFor="Хуучин нууц үг:">Хуучин нууц үг:</Label>
            <Input type={isEyeOpen ? 'text' : 'password'} className="px-3 py-1 border-[#27272A] bg-[#09090B] " data-cy="Profile-Password-Input" />
          </div>
          <div className=" text-white hover:text-[#878787] flex w-fit absolute right-3 top-9" data-testid="eyeOne-btn" data-cy="Profile-Password-Input-icon" onClick={() => setIsEyeOpen(!isEyeOpen)}>
            {isEyeOpen ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <ForgetPasswordEyeInputs />
        <div className="grid gap-2 relative">
          <div className='grid gap-2'>
            <Label htmlFor="Шинэ нууц үг давтах:">Шинэ нууц үг давтах:</Label>
            <Input type={isEyeOpenRePassword ? 'text' : 'password'} className="px-3 py-1 border-[#27272A] bg-[#09090B]" data-cy="Profile-New-Password-Input" />
          </div>
          <div
            className=" text-white hover:text-[#878787] w-fit absolute right-3 top-9"
            data-testid="eyeTwo-btn"
            data-cy="Profile-New-Password-Input-icon"
            onClick={() => setIsEyeOpenRePassword(!isEyeOpenRePassword)}
          >
            {isEyeOpenRePassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="w-fit font-medium text-sm hover:text-black hover:bg-[#00B7F4] text-white hover:border-none px-4 py-2 flex justify-center rounded-md bg-[#272729]"
            data-cy="Profile-Submit-Button"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};
