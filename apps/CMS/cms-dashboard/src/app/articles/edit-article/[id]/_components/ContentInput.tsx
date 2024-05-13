import { HelperText } from './HelperText';
import { EDIT_INPUT_PROPS } from './common';

export const ContentInput = (props: EDIT_INPUT_PROPS) => {
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
