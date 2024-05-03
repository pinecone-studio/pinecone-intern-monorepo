import { ChangeEventHandler, FocusEventHandler } from 'react';
interface InputProps {
  value?: string;
  placeholder: string;
  name: string;
  type: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error: string;
  helpertext: string;
}

const Input = (props: InputProps) => {
  const { placeholder, value, onChange, name, type, onBlur, error, helpertext } = props;

  return (
    <div className=" flex flex-col gap-1">
      <input
        name={name}
        data-testid="title"
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        className=" h-16 bg-white px-6 items-center py-[18px] text-lg rounded-2xl w-full"
      />
      <p data-testid="helperText" className=" text-red-700 text-xs">
        {helpertext}
      </p>
    </div>
  );
};
export default Input;
