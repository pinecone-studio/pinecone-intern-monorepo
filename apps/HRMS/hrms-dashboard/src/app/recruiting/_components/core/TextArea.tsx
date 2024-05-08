import { ChangeEvent } from 'react';

interface TextAreaProps {
  name?: string;
  label: string;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  errorText?: string;
  onChange?: (_: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({ name, label, value, errorText, disabled, placeholder, onChange }: TextAreaProps) => {
  return (
    <div className="w-full">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea name={name} value={value} placeholder={placeholder} disabled={disabled} onChange={onChange} className="textarea textarea-bordered h-28 w-full bg-base-200"></textarea>
      </label>
      <p>{errorText}</p>
    </div>
  );
};

TextArea.displayName = 'TextArea';
