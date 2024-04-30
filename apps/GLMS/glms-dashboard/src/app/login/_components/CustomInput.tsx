import { Stack, TextField, TextFieldProps } from '@mui/material';

const CustomInput = (props: TextFieldProps) => {
  const { ...rest } = props;
  return (
    <Stack data-testid="input">
      <TextField
        {...rest}
        placeholder="text"
        inputProps={{
          style: {
            padding: '8px',
            height: '56px',
            backgroundColor: '#F7F7F8',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '28px',
          },
        }}
      />
    </Stack>
  );
};
export default CustomInput;
