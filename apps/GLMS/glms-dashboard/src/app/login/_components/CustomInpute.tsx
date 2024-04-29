import { Stack, TextField } from '@mui/material';

const CustomInpute = () => {
  return (
    <Stack>
      <TextField
        inputProps={{
          style: {
            padding: '8px',
            height: '56px',
            borderRadius: '8px',
            backgroundColor: '#F7F7F8',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '28px',
          },
        }}
      />
    </Stack>
  );
};
export default CustomInpute;
