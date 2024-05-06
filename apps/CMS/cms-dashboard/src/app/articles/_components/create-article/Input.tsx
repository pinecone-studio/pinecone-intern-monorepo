import { ChangeEventHandler, FocusEventHandler } from 'react';
import cx from 'classnames';
interface InputProps {
  value?: string;
  placeholder: string;
  name: string;
  type: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error?: string;
  helpertext?: string;
}

const Input = ({ placeholder, value, onChange, name, type, onBlur, error, helpertext }: InputProps) => {
  return (
    <div className=" flex flex-col gap-2">
      <input
         className={cx('h-16 px-6 items-center bg-[#ffffff] text-lg rounded-2xl w-full', {
          'ring-[1px] ring-red-700 hover:ring-[1px]': error,
          'focus-within:border focus-within:border-[#000000] focus-within:hover:border-[#000000]': !error,
        })}
        name={name}
        data-testid="title"
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      <p data-testid="helperText" className=" text-red-700 text-[16px]">
        {helpertext}
      </p>
    </div>
  );
};

export default Input;
