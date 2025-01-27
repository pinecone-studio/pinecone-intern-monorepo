import { Input } from '@/components/ui/input';
import { ChangeEvent, FC } from 'react';

type RegistrationInputProps = {
  type: string;
  placeholder: string;
  onChange: (_e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  dataCy: string;
  dataTestId: string;
};
export const RegistrationInput: FC<RegistrationInputProps> = ({ type, placeholder, onChange, required, dataCy, dataTestId }) => {
  return (
    <Input
      className="w-[300px] h-[36px] border border-[#E4E4E7] rounded-[6px] px-2"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      data-cy={dataCy}
      data-testid={dataTestId}
    />
  );
};
