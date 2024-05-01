import { IconButton, Input } from '@material-tailwind/react';
import { ChangeEventHandler, FocusEventHandler, useState } from 'react';
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
  error?: boolean;
  crossOrigin: string;
};

const TextInput = (props: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const { name, label, type = 'text', onChange, onBlur, value, error, crossOrigin, placeholder } = props;

  return (
    <div className="gap-1">
      <div className="gap-1">
        <h1>{label}</h1>
        <div className="flex flex-row relative">
          <Input
            type={type === 'password' && showPassword ? 'text' : type}
            className="py-[14px] px-[16px] bg-[#ECEDF0] w-full text-black"
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            error={error}
            crossOrigin={crossOrigin}
          />
          <IconButton className="w-7 h-7 flex items-center" variant="text" onClick={handleShowPassword}>
            {showPassword ? <MdVisibility size="medium" /> : <MdVisibilityOff size="medium" />}
          </IconButton>
        </div>
      </div>
      <div className="gap-1">
        <h1>{label}</h1>
        <label className="input input-bordered flex items-center gap-2  bg-[#ECEDF0]">
          <input
            className="py-[24px] w-full text-black"
            type={type === 'password' && showPassword ? 'text' : type}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />
          <button onClick={handleShowPassword} className="btn btn-circle w-7 h-7 bg-transparent">
            {showPassword ? <MdVisibility size="small" className="bg-red" /> : <MdVisibilityOff size="small" />}
          </button>
        </label>
      </div>
    </div>
  );
};

export default TextInput;
