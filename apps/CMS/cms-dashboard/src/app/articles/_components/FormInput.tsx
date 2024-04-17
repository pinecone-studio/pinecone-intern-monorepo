// Custom input
import { Stack, TextField, TextFieldProps, Typography } from '@mui/material';

export const FormInput = (props: TextFieldProps) => {
  const { label, helperText, ...rest } = props;
  return (
    <Stack width={'100%'} gap={1} data-testid="Custom-Input">
      <Typography fontSize={14} fontWeight={600} data-testid="label">
        {label}
      </Typography>
      <Stack gap={1}>
        <TextField {...rest} />
        <Typography color={'#DF1F29'} fontSize={12} fontWeight={600} data-testid="helperText">
          {helperText}
        </Typography>
      </Stack>
    </Stack>
  );
};
