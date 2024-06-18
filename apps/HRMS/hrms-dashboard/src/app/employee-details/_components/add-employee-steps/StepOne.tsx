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

const StepOne = (props: CustomInputProps & PropsWithChildren) => {
  const { label, type, placeholder, name, value, children, helperText, onChange, onBlur } = props;

  return (
    <>
      <p>{label}</p>
      {type != 'select' && <Input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} onBlur={onBlur} />}
      {type == 'select' && (
        <select
          data-testid="select-input"
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          style={{ color: !value ? '#D6D8DB' : '#121316' }}
          className="w-full p-2 appearance-none rounded-lg text-base font-semibold bg-light border border-[#D6D8DB]"
        >
          {children}
        </select>
      )}
      <p className="text-error text-xs ml-2">{helperText}</p>{' '}
    </>
  );
};

export default StepOne;
