// todo:
// make the employee update with appolos
//  connect the inputs to the database
// make custom changes in CustomInput with the inputs
// for the design:
// tutslah hadgalah button iig compenent bolgoj Jest Bichih
// Hamgiin suuld Cypress bichih

import { Stack, TextField, TextFieldProps, Typography } from '@mui/material';
type CustomInputProps = {
  label: string;
  type: string;
  placeholder: string;
};
export const CustomInput = (props: TextFieldProps & CustomInputProps) => {
  const { label, type, placeholder, ...rest } = props;
  return (
    <Stack justifyContent="center" gap={0.5} data-testid="customInput">
      <Typography fontSize={16} fontWeight={400} color={'primary.main'} data-testid="label">
        {label}
      </Typography>
      <TextField
        data-testid="inputField"
        {...rest}
        type={type}
        placeholder={placeholder}
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
      ></TextField>
    </Stack>
  );
};
