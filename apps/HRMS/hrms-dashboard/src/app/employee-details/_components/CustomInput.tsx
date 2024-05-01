import { Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
type CustomInputProps = {
  label: string;
  type: string;
  placeholder: string;
};
export const CustomInput = (props: TextFieldProps & CustomInputProps & PropsWithChildren) => {
  const { label, type, placeholder, ...rest } = props;
  return (
    <Stack width={'100%'} justifyContent="center" gap={0.5} data-testid="customInput">
      <Typography fontSize={16} fontWeight={400} color={'primary.main'} data-testid="label">
        {label}
      </Typography>
      <TextField
        data-testid="inputField"
        select={type == 'select'}
        {...rest}
        type={type}
        placeholder={placeholder}
        sx={{ '& .MuiSelect-select': { padding: '8px' } }}
        inputProps={{
          style: {
            padding: '8px',
            fontSize: '16px',
            fontWeight: '600',
          },
        }}
        InputProps={{
          style: {
            backgroundColor: '#F7F7F8',
          },
        }}
      >
        {props.children}
      </TextField>
    </Stack>
  );
};
