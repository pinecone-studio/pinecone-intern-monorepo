import { ChangeEventHandler, FocusEventHandler, ReactNode, useState } from 'react';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';

type TextInputProps = {
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;

  helperText?: string;
};

const TextInput = (props: TextInputProps) => {
  const { name, label, type = 'text', onChange, onBlur, value, placeholder, helperText } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-lg">{label}</h1>
      <label className="input flex items-center gap-2  bg-[#ECEDF0] border border-black border-solid rounded-none">
        <input
          className="py-[24px] w-full text-black"
          type={type === 'password' ? (showPassword ? 'text' : type) : type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button onClick={togglePassword} className="btn btn-circle w-7 h-7 border-none bg-transparent hover:bg-transparent shadow-none">
            {showPassword ? <MdVisibilityOff size="small" /> : <MdVisibility size="small" />}
          </button>
        )}
      </label>
      <p className="text-red-700 text-2">{helperText}</p>
    </div>
  );
};

export default TextInput;
