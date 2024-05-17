'use client';

import { ChangeEventHandler, FocusEventHandler } from 'react';
import { HelperText } from './HelperText';
import { InputLabel } from './InputLabel';
type ToggleInputProps = {
  name: string;
  defaultChecked?: boolean | undefined;
  value: boolean | undefined;
  helperText?: string;
  formikError?: boolean | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
};

export const ToggleButtonForCommnent = (props: ToggleInputProps) => {
  const { name, defaultChecked, value, helperText, formikError, onChange } = props;

  return (
    <div className="flex justify-between p-6">
      <InputLabel title={value === true ? 'Сэтгэгдэл идэвхтэй' : 'Сэтгэгдэл идэвхгүй'} />
      <input
        data-cy="comment-permission-check-box-cy-id"
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={value}
        type="checkbox"
        data-testid="input-test-id"
        className={'toggle [--tglbg:#f6f6f6]'}
      />
      {formikError && <HelperText error={helperText} />}
    </div>
  );
};
