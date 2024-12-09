'use client';

import { Input } from '@/components/ui/input';
import React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  dataCy: string;
  value: string;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, type, placeholder, dataCy, value, onChange, error }) => {
  return (
    <div className="flex flex-col items-start gap-1 self-stretch">
      <label htmlFor={id} className="block text-base font-medium text-gray-200">
        {label}
      </label>
      <Input
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        placeholder={placeholder}
        data-cy={dataCy}
        aria-label={label}
        className="mt-1 block w-full rounded-md border border-gray-700 bg-[#09090B] p-2 text-white text-sm"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
