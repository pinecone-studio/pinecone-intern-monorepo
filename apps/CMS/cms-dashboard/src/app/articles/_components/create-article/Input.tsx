import { ChangeEvent } from 'react';

interface InputProps {
  value?: string;
  placeholder: string;
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
    const {placeholder, value, onChange } = props;
  return (
      <div>
        <input data-testid="title" type="text" onChange={onChange} value={value}  placeholder={placeholder} className=" h-16 bg-white px-6 items-center py-[18px] text-lg rounded-2xl w-full" />
      </div>
  );
};
export default Input;

