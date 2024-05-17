import { HelperText } from './HelperText';
import { EDIT_INPUT_PROPS } from './common';

export const TitleInput = (props: EDIT_INPUT_PROPS) => {
  const { name, placeholder, type = 'text', onChange, onBlur, value, helperText, error } = props;

  return (
    <div className="flex flex-col gap-1">
      <input data-cy="title-input-cy-id" name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} className="input input-bordered w-full rounded-lg" />
      {error && <HelperText error={helperText} />}
    </div>
  );
};
