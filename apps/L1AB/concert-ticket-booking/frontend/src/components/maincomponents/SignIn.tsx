'use client';

import React, { useState } from 'react';
import { Container, useAuth } from '@/components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface SignInProps {
  header: string;
  emailLabel: string;
  passwordLabel: string;
  recoveryLinkHref: string;
  recoveryLinkText: string;
  buttonText: string;
  footerText: string;
  footerTextEnd: string;
  footerLinkText: string;
  footerLinkHref: string;
}

const SignIn: React.FC<SignInProps> = ({ header, recoveryLinkHref, recoveryLinkText, buttonText, footerText, footerTextEnd, footerLinkText, footerLinkHref, emailLabel, passwordLabel }) => {
  const [visible, setVisible] = useState(false);
  const { signin } = useAuth();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signin({
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };
  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem] max-sm:mx-3" data-cy="SignIn-Page">
        <form onSubmit={handleSubmit} className="rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex flex-col items-center justify-center py-2">
            <p className="text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px]" data-cy="SignIn-Header">
              {header}
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px] max-sm:w-full">
            <div className="flex flex-col justify-start w-full gap-1">
              <Label htmlFor="email" className="block text-base font-medium text-gray-200">
                {emailLabel}
              </Label>
              <Input id="email" type="email" placeholder="name@example.com" data-cy="SignIn-Email-Input" value={formData.email} onChange={handleChange} />
            </div>
            <div className="flex flex-col justify-start w-full gap-1">
              <Label htmlFor="password" className="block text-base font-medium text-gray-200">
                {passwordLabel}
              </Label>
              <div className="flex items-center border-[1px] rounded-md pr-3">
                <Input id="password" type={visible ? 'text' : 'password'} data-cy="SignIn-Password-Input" className="border-none" value={formData.password} onChange={handleChange} />
                <button type="button" data-testid="toggleVisibility" onClick={() => setVisible(!visible)}>
                  {visible ? <EyeOffIcon size={20} className="text-gray-400 cursor-pointer hover:text-white" /> : <EyeIcon size={20} className="text-gray-400 cursor-pointer hover:text-white" />}
                </button>
              </div>
            </div>
            <Link href={recoveryLinkHref} className="flex justify-end text-[#A1A1AA] self-stretch text-center text-sm leading-5 tracking-wide" data-cy="SignIn-Link">
              {recoveryLinkText}
            </Link>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              data-testid="clickSubmit"
              data-cy="SignIn-Submit-Button"
              className="flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] bg-[#00B7F4] shadow-sm text-[#18181B] hover:text-[#000000] hover:bg-[#54d0f9]"
            >
              <span>{buttonText}</span>
            </Button>
            <p className="text-[#A1A1AA] self-stretch text-center text-sm leading-5 tracking-wide">
              {footerText}{' '}
              <Link href={footerLinkHref} className="hover:underline underline decoration-solid underline-offset-auto hover:text-[#54d0f9] duration-300" data-cy="SignIn-Link">
                {footerLinkText}
              </Link>{' '}
              {footerTextEnd}
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
