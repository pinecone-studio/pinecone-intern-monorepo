'use client';
import React, { useState } from 'react';
import { Container, useAuth } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import _ from 'lodash';

interface RecoveryEmailProps {
  header: string;
  emailLabel: string;
  buttonText: string;
}

export const RecoveryEmail = ({ header, buttonText }: RecoveryEmailProps) => {
  const [formData, setFormData] = useState({ email: '' });
  const { requestPasswordRecovery } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleOnChange = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, 500);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await requestPasswordRecovery(formData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="text-amber-50 flex items-center justify-center h-[48rem]" data-cy="RecoveryEmail-Page">
        <div className="rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6">
          <div className="flex flex-col items-center justify-center py-2">
            <p className="text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px] max-sm:text-xl">{header}</p>
          </div>
          <div className="flex flex-col items-center gap-6 self-stretch w-[350px] max-sm:w-full">
            <Input onChange={handleOnChange} id="email" type="email" placeholder="name@example.com" data-cy="RecoveryEmail-Email-Input" />
            <Button
              type="submit"
              data-cy="RecoveryEmail-Submit-Button"
              className={`flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] shadow-sm text-[#000] bg-[#00B7F4] hover:bg-[#54d0f9]`}
            >
              <span>{loading ? 'Илгээж байна...' : buttonText}</span>
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default RecoveryEmail;
