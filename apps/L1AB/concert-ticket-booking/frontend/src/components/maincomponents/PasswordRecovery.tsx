'use client';

import React from 'react';
import { Container } from '@/components';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

interface PasswordRecoveryProps {
  header: string;
  passwordLabel: string;
  comfirmPasswordLabel: string;
  buttonText: string;
}

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({ header, passwordLabel, comfirmPasswordLabel, buttonText }) => {
  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem]" data-cy="PasswordRecovery-Page">
        <div className="rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex py-2 flex-col justify-center items-center">
            <p className="text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px]">{header}</p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px]">
            <Input id="password" data-cy="PasswordRecovery-Input" />
            <Input id="password" data-cy="PasswordRecovery-comfirm-Input" />
            <Button
              data-cy="PasswordRecovery-Submit-Button"
              className="flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] bg-[#00B7F4] shadow-sm text-[#18181B] hover:text-[#000000] hover:bg-[#54d0f9]"
            >
              <span>{buttonText}</span>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PasswordRecovery;
