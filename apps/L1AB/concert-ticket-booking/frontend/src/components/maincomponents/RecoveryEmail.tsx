'use client';

import React from 'react';
import { Container } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RecoveryEmailProps {
  header: string;
  emailLabel: string;
  buttonText: string;
}

const RecoveryEmail: React.FC<RecoveryEmailProps> = ({ header, buttonText }) => {
  return (
    <Container>
      <div className="text-amber-50 flex items-center justify-center h-[48rem]" data-cy="RecoveryEmail-Page">
        <div className="rounded-2xl dark:border-slate-500 bg-[#f2f2f2] dark:bg-black border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex py-2 flex-col justify-center items-center">
            <p className="dark:text-[#FAFAFA] text-black text-2xl font-semibold tracking-[-0.6px] max-sm:text-xl">{header}</p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px] max-sm:w-full">
            <Input id="email" type="email" placeholder="name@example.com" data-cy="RecoveryEmail-Email-Input" className='bg-white dark:bg-[#09090B]' />
            <Button
              data-cy="RecoveryEmail-Submit-Button"
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

export default RecoveryEmail;
