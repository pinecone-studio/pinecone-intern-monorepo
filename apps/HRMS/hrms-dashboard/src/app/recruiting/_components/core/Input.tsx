import { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  name?: string;
  value?: string;
  placeholder: string;
  row?: string;
  disabled?: boolean;
  errorText?: string | undefined;
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, label, onChange, value, errorText, disabled, placeholder }: InputProps) => {
  return (
    <div className="w-full tracking-tight">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text text-[#121316] text-base font-semibold">{label}</span>
        </div>
        <input
          type="text"
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className="input input-bordered w-full tracking-tight bg-[#F7F7F8] text-[#121316] border-[#D6D8DB] text-lg"
        />
      </label>
      <p>{errorText}</p>
    </div>
  );
};

Input.displayName = 'Input';
