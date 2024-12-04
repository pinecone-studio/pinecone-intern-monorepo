'use client';

import React, { useState } from 'react';
import { Container, useAuth } from '@/components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FormInput from '@/components/maincomponents/FormInput';
import PasswordInput from '@/components/maincomponents/PasswordInput';

interface SignUpProps {
  header: string;
  nameLabel: string;
  confirmPasswordLabel: string;
  phoneLabel: string;
  emailLabel: string;
  passwordLabel: string;
  buttonText: string;
  footerText: string;
  footerTextEnd: string;
  footerLinkText: string;
  footerLinkHref: string;
}

const SignUp: React.FC<SignUpProps> = ({ header, nameLabel, phoneLabel, emailLabel, passwordLabel, confirmPasswordLabel, buttonText, footerText, footerTextEnd, footerLinkText, footerLinkHref }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem] max-sm:px-3" data-cy="SignUp-Page">
        <form onSubmit={handleSubmit} className="rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6 ">
          <div className="flex py-2 flex-col justify-center items-center">
            <p className="text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px]">{header}</p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px] max-sm:w-full ">
            <FormInput id="name" label={nameLabel} type="text" placeholder="Your name here ..." value={formData.name} onChange={handleChange} dataCy="SignUp-Name-Input" />
            <FormInput id="phone" label={phoneLabel} type="tel" placeholder="Your phone number here ..." value={formData.phone} onChange={handleChange} dataCy="SignUp-Phone-Input" />
            <FormInput id="email" label={emailLabel} type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} dataCy="SignUp-Email-Input" />
            <PasswordInput id="password" label={passwordLabel} value={formData.password} onChange={handleChange} dataCy="SignUp-Password-Input" />
            <PasswordInput id="confirmPassword" label={confirmPasswordLabel} value={formData.confirmPassword} onChange={handleChange} dataCy="SignUp-ConfirmPassword-Input" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              data-testid="clickSubmit"
              data-cy="SignUp-Submit-Button"
              className="flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] bg-[#00B7F4] shadow-sm text-[#18181B] hover:text-[#000000] hover:bg-[#54d0f9]"
              type="submit"
            >
              <span>{buttonText}</span>
            </Button>
            <p className="text-[#A1A1AA] self-stretch text-center text-sm leading-5 tracking-wide">
              {footerText}{' '}
              <Link href={footerLinkHref} className="hover:underline underline decoration-solid underline-offset-auto hover:text-[#54d0f9] duration-300" data-cy="SignUp-Link">
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

export default SignUp;
