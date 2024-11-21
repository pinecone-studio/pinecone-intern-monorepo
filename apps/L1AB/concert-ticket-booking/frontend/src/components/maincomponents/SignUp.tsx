'use client';

import React from 'react';
import { Container } from '@/components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FormInput from '@/components/maincomponents/FormInput';
import PasswordInput from '@/components/maincomponents/PasswordInput';

interface SignUpProps {
  header: string;
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  passwordLabel: string;
  comfirmPasswordLabel: string;
  buttonText: string;
  footerText: string;
  footerTextEnd: string;
  footerLinkText: string;
  footerLinkHref: string;
}

const SignUp: React.FC<SignUpProps> = ({ header, emailLabel, nameLabel, phoneLabel, passwordLabel, comfirmPasswordLabel, buttonText, footerText, footerTextEnd, footerLinkText, footerLinkHref }) => {
  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem]" data-cy="SignUp-Page">
        <div className="rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex py-2 flex-col justify-center items-center">
            <p className="text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px]">{header}</p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px]">
            <FormInput id="name" label={nameLabel} type="name" placeholder="Your name here ..." dataCy="SignUp-Name-Input" />
            <FormInput id="phone" label={phoneLabel} type="number" placeholder="Your phone number here ..." dataCy="SignUp-Phone-Input" />
            <FormInput id="email" label={emailLabel} type="email" placeholder="name@example.com" dataCy="SignUp-Email-Input" />
            <PasswordInput id="password" label={passwordLabel} dataCy="SignUp-Password-Input" />
            <PasswordInput id="password" label={comfirmPasswordLabel} dataCy="SignUp-Password-Input" />
            <Button
              data-cy="SignUp-Submit-Button"
              className="flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] bg-[#00B7F4] shadow-sm text-[#18181B] hover:text-[#000000] hover:bg-[#54d0f9]"
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
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
