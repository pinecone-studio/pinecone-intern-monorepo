'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ForgetPasswordEyeInputs } from './ForgetPasswordEyeInputs';
import { usePasswordUpdateMutation } from '@/generated';
import { toast } from 'react-toastify';

export const ForgetPassword = () => {
  const [PasswordUpdate] = usePasswordUpdateMutation();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isEyeOpenRePassword, setIsEyeOpenRePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePass = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Шинэ нууц үг болон баталгаажуулах нууц үг таарахгүй байна.', { autoClose: 2000 });
      return;
    }

    try {
      await PasswordUpdate({
        variables: {
          input: { oldPassword, newPassword },
        },
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Нууц үг амжилттай шинэчлэгдлээ.', { autoClose: 2000 });
    } catch (error) {
      toast.error((error as Error).message, { autoClose: 2000 });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6" data-cy="Profile-Page-ForgetPassword">
      <p className="font-semibold text-2xl dark:text-white text-black">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-6 dark:text-[#FAFAFA] dark:bg-[#131313] bg-[#f2f2f2] text-black rounded-xl">
        <div className="grid gap-2 relative">
          <div className="grid gap-2">
            <Label htmlFor="Хуучин нууц үг:">Хуучин нууц үг:</Label>
            <Input
              data-testid="OldPassword"
              type={isEyeOpen ? 'text' : 'password'}
              className="px-3 py-1 dark:border-[#27272A] dark:bg-[#09090B] border-[#c6c6c6] bg-white"
              data-cy="Profile-Password-Input"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </div>
          <IconChange setIsEyeOpen={setIsEyeOpen} isEyeOpen={isEyeOpen} />
        </div>

        <ForgetPasswordEyeInputs value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />

        <div className="grid gap-2 relative">
          <div className="grid gap-2">
            <Label htmlFor="Шинэ нууц үг давтах:">Шинэ нууц үг давтах:</Label>
            <Input
              data-testid="ComfirmPassword"
              type={isEyeOpenRePassword ? 'text' : 'password'}
              className="px-3 py-1 dark:border-[#27272A] dark:bg-[#09090B] border-[#c6c6c6] bg-white"
              data-cy="Profile-New-Password-Input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div
            className="dark:text-white hover:text-[#878787] text-black w-fit absolute right-3 top-9"
            data-testid="eyeTwo-btn"
            data-cy="Profile-New-Password-Input-icon"
            onClick={() => setIsEyeOpenRePassword(!isEyeOpenRePassword)}
          >
            {isEyeOpenRePassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            data-testid="UpdatePasswordClick"
            className="w-fit font-medium text-sm hover:text-black hover:bg-[#00B7F4] text-white hover:border-none px-4 py-2 flex justify-center rounded-md bg-[#272729]"
            data-cy="Profile-Submit-Button"
            onClick={handleUpdatePass}
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

interface Icontypes {
  setIsEyeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEyeOpen: boolean;
}

const IconChange = ({ setIsEyeOpen, isEyeOpen }: Icontypes) => (
  <div
    className="dark:text-white hover:text-[#878787] text-black flex w-fit absolute right-3 top-9"
    data-testid="eyeOne-btn"
    data-cy="Profile-Password-Input-icon"
    onClick={() => setIsEyeOpen(!isEyeOpen)}
  >
    {isEyeOpen ? <FaRegEye /> : <FaRegEyeSlash />}
  </div>
);
