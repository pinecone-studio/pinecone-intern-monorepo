import { FormikErrors } from 'formik';
import { ChangeEvent, FocusEvent } from 'react';

interface InputProps {
  label: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  errorText?: string | string[] | FormikErrors<unknown> | FormikErrors<unknown>[];
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_: FocusEvent<HTMLInputElement>) => void;
}

export const Input = ({ type = 'text', name, label, onBlur, onChange, value, errorText, disabled, placeholder }: InputProps) => {
  let displayErrorText: string | undefined;
  if (Array.isArray(errorText)) {
    displayErrorText = errorText.join(', ');
  } else if (typeof errorText === 'object') {
    displayErrorText = Object.values(errorText).join(', ');
  } else {
    displayErrorText = errorText;
  }
  return (
    <div className="w-full tracking-tight">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text text-[#121316] text-base font-semibold">{label}</span>
        </div>
        <input
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className="input input-bordered w-full tracking-tight bg-[#F7F7F8] text-[#121316] border-[#D6D8DB] text-lg"
        />
      </label>
      <p className="text-sm text-[#FF2C2C]">{displayErrorText}</p>
    </div>
  );
};

Input.displayName = 'Input';
