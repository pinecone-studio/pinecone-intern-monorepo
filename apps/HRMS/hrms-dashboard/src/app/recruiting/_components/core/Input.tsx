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
    <div className="w-full">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input type="text" name={name} onChange={onChange} value={value} placeholder={placeholder} disabled={disabled} className="input input-bordered w-full bg-base-200" />
      </label>
      <p>{errorText}</p>
    </div>
  );
};

export const TextArea = ({ name, label, value, errorText, disabled, placeholder }: InputProps) => {
  return (
    <div className="w-full">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea name={name} value={value} placeholder={placeholder} disabled={disabled} className="textarea textarea-bordered h-28 w-full bg-base-200"></textarea>
      </label>
      <p>{errorText}</p>
    </div>
  );
};

Input.displayName = 'Input';
TextArea.displayName = 'TextArea';
