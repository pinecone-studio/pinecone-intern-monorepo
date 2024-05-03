import { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import cx from 'classnames';
import Eye from '../../../assets/eye';
import EyeSlash from '../../../assets/eye-slash';

type TextInputProps = {
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  helperText?: string;
  error?: string;
};

const TextInput = (props: TextInputProps) => {
  const { name, label, type = 'text', onChange, onBlur, value, placeholder, helperText, error } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1" data-testid="Custom-Input">
      <h1 data-testid="label">{label}</h1>
      <label
        className={cx('flex px-[13px] items-center gap-2 bg-[#ECEDF0] rounded-[4px] border border-[#d6d8db] hover:border-black', {
          'border-red-700 hover:border-red-700': error,
          'focus-within:border-2 focus-within:border-red-700': error,
          'focus-within:border-2 focus-within:border-[#3873cb] focus-within:hover:border-[#3873cb]': !error,
        })}
      >
        <input
          className="py-[13px] w-full text-black bg-[#ECEDF0] rounded-sm focus:outline-none"
          type={type === 'password' ? (showPassword ? 'text' : type) : type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button data-testid="toggleVisibility" onClick={togglePassword} className="btn btn-circle w-7 h-7 border-none bg-transparent hover:bg-transparent shadow-none">
            {/* {showPassword ? <MdVisibilityOff size="small" color="#6c6d6e" /> : <MdVisibility size="small" color="#6c6d6e" />} */}
            {showPassword ? <Eye /> : <EyeSlash />}
          </button>
        )}
      </label>
      <p data-testid="helperText" className="text-red-700 text-xs">
        {helperText}
      </p>
    </div>
  );
};

export default TextInput;
