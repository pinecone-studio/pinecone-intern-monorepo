import { Category } from '@/generated';
import { ChangeEventHandler, FocusEventHandler } from 'react';

export type EDIT_INPUT_PROPS = {
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | undefined;
  name: string;
  placeholder?: string;
  type?: string;
  value: string | number | readonly string[] | undefined;
  helperText?: string | undefined;
  error?: boolean | undefined;
  defaultValue?: string | number | undefined;
  loading?: boolean;
  categories?: [Category] | undefined;
};
