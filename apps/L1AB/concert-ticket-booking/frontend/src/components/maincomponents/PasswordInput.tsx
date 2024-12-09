'use client';

import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react';

interface PasswordInputProps {
  id: string;
  label: string;
  dataCy: string;
  value: string;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, label, dataCy, value, onChange, error }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col items-start gap-1 self-stretch">
      <label htmlFor={id} className="block text-base font-medium text-gray-200">
        {label}
      </label>
      <div className="relative w-full">
        <Input
          value={value}
          onChange={onChange}
          id={id}
          type={visible ? 'text' : 'password'}
          data-cy={dataCy}
          aria-label={label}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-[#09090B] p-2 text-white text-sm"
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
          aria-label={visible ? 'Hide password' : 'Show password'}
          data-cy={`${dataCy}-Icons`}
          data-testid="InputButton"
        >
          {visible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
