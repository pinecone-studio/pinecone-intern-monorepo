import { ChangeEvent, FocusEvent } from 'react';

interface TextAreaProps {
  name?: string;
  label: string;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  errorText?: string;
  onChange?: (_: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (_: FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({ name, label, onBlur, value, errorText, disabled, placeholder, onChange }: TextAreaProps) => {
  return (
    <div className="w-full tracking-tight">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-[#121316] text-base font-semibold">{label}</span>
        </div>
        <textarea
          name={name}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className="textarea textarea-bordered border-[#D6D8DB] h-28 w-full rounded-lg bg-[#F7F7F8] text-[#121316] tracking-tight text-lg"
        ></textarea>
      </label>
      <p className="text-sm text-[#FF2C2C]">{errorText}</p>
    </div>
  );
};

TextArea.displayName = 'TextArea';
