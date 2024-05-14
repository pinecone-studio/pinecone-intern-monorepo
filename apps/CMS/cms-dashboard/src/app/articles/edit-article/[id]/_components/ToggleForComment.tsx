'use client';

import { ChangeEventHandler, FocusEventHandler } from 'react';
import { HelperText } from './HelperText';
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
      <div style={{ fontSize: '18px', fontStyle: 'normal', fontWeight: 600, lineHeight: '24px', color: 'black' }}>{value === true ? 'Сэтгэгдэл идэвхтэй' : 'Сэтгэгдэл идэвхгүй'}</div>
      <input
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={value}
        type="checkbox"
        data-testid="input-test-id"
        className={'toggle [--tglbg:#f6f6f6]'}
        style={{ background: value === true ? 'white' : 'black' }}
      />
      {formikError && <HelperText error={helperText} />}
    </div>
  );
};
