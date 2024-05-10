import { ChangeEventHandler, FocusEventHandler } from 'react';
import { HelperText } from './HelperText';

type PropsType = {
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  name: string;
  placeholder: string;
  type?: string;
  value: string | undefined;
  helperText?: string;
  error?: boolean | undefined;
};

export const TitleInput = (props: PropsType) => {
  const { name, placeholder, type = 'text', onChange, onBlur, value, helperText, error } = props;
  return (
    <div className="flex flex-col gap-1">
      <input defaultValue={value} onChange={onChange} onBlur={onBlur} name={name} type={type} placeholder={placeholder} className="input input-bordered w-full rounded-lg" />
      {error && <HelperText error={helperText} />}
    </div>
  );
};
