import React, { ChangeEvent } from 'react';
import { FormControl, FormLabel, TextField, FormHelperText } from '@mui/material';

interface InputProps {
  label: string;
  placeholder: string;
  name?: string;
  value?: string;
  row?: string;
  errorText?: string | undefined;
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, label, placeholder, onChange, row, value, errorText }: InputProps) => {
  return (
    <>
      <FormControl sx={{ my: 1 }} variant="outlined" fullWidth>
        <FormLabel htmlFor={name} sx={{ my: '2px', color: 'black', fontWeight: '600' }}>
          {label}
        </FormLabel>
        <TextField
          id={name}
          variant="outlined"
          sx={{ backgroundColor: '#F7F7F8', borderRadius: '8px' }}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          multiline
          rows={row || '1'}
        />
        <FormHelperText error={errorText ? true : false}>{errorText}</FormHelperText>
      </FormControl>
    </>
  );
};

Input.displayName = 'Input';
