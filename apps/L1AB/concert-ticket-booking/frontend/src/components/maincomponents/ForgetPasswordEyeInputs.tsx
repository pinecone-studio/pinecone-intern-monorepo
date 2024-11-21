'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

export const ForgetPasswordEyeInputs = () => {
  const [isEyeOpenPassword, setIsEyeOpenPassword] = useState(false);
  return (
    <div className="grid gap-2 relative">
      <div className='grid gap-2 '>
      <Label htmlFor="Шинэ нууц үг:">Шинэ нууц үг:</Label>
      <Input type={isEyeOpenPassword ? 'text' : 'password'} className="px-3 py-1 border-[#27272A] bg-[#09090B] " data-cy='Profile-RePassword-Input'/>
      </div>
      <div className=" text-white hover:text-[#878787] absolute right-3 top-9" data-testid="eye-btn" data-cy='Profile-RePassword-Input-icon' onClick={() => setIsEyeOpenPassword(!isEyeOpenPassword)}>
        {isEyeOpenPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </div>
    </div>
  );
};
