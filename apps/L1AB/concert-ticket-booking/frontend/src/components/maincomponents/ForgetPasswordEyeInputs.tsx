'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

export const ForgetPasswordEyeInputs = () => {
  const [isEyeOpenPassword, setIsEyeOpenPassword] = useState(false);
  return (
    <div className="grid gap-2">
      <Label htmlFor="Шинэ нууц үг:">Шинэ нууц үг:</Label>
      <Input type={isEyeOpenPassword ? 'text' : 'password'} className="px-3 py-1 border-[#27272A] bg-[#09090B] relative" />
      <div className="absolute text-white mt-8 right-96 mr-32 w-5 h-5 hover:text-[#878787]" data-testid="eye-btn" onClick={() => setIsEyeOpenPassword(!isEyeOpenPassword)}>
        {isEyeOpenPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </div>
    </div>
  );
};
