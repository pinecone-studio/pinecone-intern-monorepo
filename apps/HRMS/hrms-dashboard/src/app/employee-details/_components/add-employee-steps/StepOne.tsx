import { Input } from '@/components/ui/input';
import { ChangeEventHandler, FocusEventHandler, PropsWithChildren, useContext } from 'react';

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

const StepOne = (props: CustomInputProps & PropsWithChildren) => {
  const { label, type, placeholder, name, value, children, helperText, onChange, onBlur } = props;

  return <>{type != 'select' && <Input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} onBlur={onBlur} />}</>;
};
export default StepOne;
