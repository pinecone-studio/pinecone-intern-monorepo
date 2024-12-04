'use client';
import React, { useState } from 'react';
import { Container, useAuth } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

interface PasswordRecoveryProps {
  header: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  buttonText: string;
}

export const PasswordRecovery = ({ header, buttonText, passwordLabel, confirmPasswordLabel }: PasswordRecoveryProps) => {
  const { passwordRecovery } = useAuth();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: '',
    confirmPassword: '',
  });
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const accessToken = searchParams.get('token');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Нууц үг таарахгүй байна !');
    } else {
      await passwordRecovery({
        email: email as string,
        accessToken: accessToken as string,
        password: formData.password,
      });
    }
  };
  return (
    <Container>
      <form className="text-amber-50 flex items-center justify-center h-[48rem] " data-cy="PasswordRecovery-Page">
        <div className="rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex flex-col items-center justify-center py-2 max-sm:w-full">
            <p className="text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px] max-sm:text-xl">{header}</p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px] max-sm:w-full">
            <div className="flex flex-col justify-start w-full gap-1">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Нууц үг
              </Label>
              <div className="flex items-center border-[1px] rounded-md pr-3">
                <Input id="password" type={visible ? 'text' : 'password'} className="border-none" data-cy="Password-Recovery-Input" placeholder={passwordLabel} onChange={handleChange} />
                <button type="button" data-testid="toggleVisibility" onClick={() => setVisible(!visible)}>
                  {visible ? <EyeOffIcon size={20} className="text-gray-400 cursor-pointer hover:text-white" /> : <EyeIcon size={20} className="text-gray-400 cursor-pointer hover:text-white" />}
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-start w-full gap-1">
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                Нууц үг давтах
              </Label>
              <div className="flex items-center border-[1px] rounded-md pr-3">
                <Input
                  id="confirmPassword"
                  type={visible ? 'text' : 'password'}
                  className="border-none"
                  data-cy="Password-Recovery-confirm-Input"
                  placeholder={confirmPasswordLabel}
                  onChange={handleChange}
                />
                <button type="button" data-testid="toggleVisibility" onClick={() => setVisible(!visible)}>
                  {visible ? <EyeOffIcon size={20} className="text-gray-400 cursor-pointer hover:text-white" /> : <EyeIcon size={20} className="text-gray-400 cursor-pointer hover:text-white" />}
                </button>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              data-cy="PasswordRecovery-Submit-Button"
              className="flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] bg-[#00B7F4] shadow-sm text-[#18181B] hover:text-[#000000] hover:bg-[#54d0f9]"
            >
              <span>{buttonText}</span>
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default PasswordRecovery;
