import { Stack, TextField } from '@mui/material';

const CustomInput = () => {
  return (
    <Stack data-testid="input">
      <TextField
        id="custom-input"
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
