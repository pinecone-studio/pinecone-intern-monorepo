import { ChangeEventHandler, FocusEventHandler } from 'react';
import { HelperText } from './HelperText';

type PropsType = {
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  name: string;
  placeholder: string;
  value: string | undefined;
  helperText?: string;
  error?: string;
};

export const ContentInput = (props: PropsType) => {

  const { name, placeholder, onChange, onBlur, value, helperText, error } = props;
  
  return (
    <div>
      <textarea value={value} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} className="textarea textarea-bordered h-[237px] w-full rounded-lg">
        {value}
      </textarea>
      {error && <HelperText data-testid="helper-text-id" error={helperText} />}
    </div>
  );
};
