import { Input } from '@/components/ui/input';
import { ChangeEventHandler, FocusEventHandler, PropsWithChildren } from 'react';

type CustomInputProps = {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  value: string | number;
  error?: boolean;
  helperText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> & ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLInputElement> & FocusEventHandler<HTMLSelectElement>;
};

export const StepThree = (props: CustomInputProps & PropsWithChildren) => {
  const { label, type, placeholder, name, value, helperText, onChange, onBlur } = props;

  return (
    <>
      <p>{label}</p>
      <Input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} onBlur={onBlur} />
      <p className="text-error text-xs ml-2">{helperText}</p>
    </>
  );
};
