import React from 'react';
import { Input } from '@/components/ui/input';
import { ChangeEventHandler, FocusEventHandler, PropsWithChildren } from 'react';

interface CustomInputProps {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  value: string | number;
  defaultValue?: string | number;
  error?: boolean;
  helperText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
}

export const StepOne = (props: CustomInputProps & PropsWithChildren) => {
  const { label, type, placeholder, name, value, helperText, onChange, onBlur } = props;

  return (
    <>
      <p>{label}</p>
      <Input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} onBlur={onBlur} />
      <p className="text-error text-xs ml-2">{helperText}</p>{' '}
    </>
  );
};
