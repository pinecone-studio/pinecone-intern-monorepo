import { Stack, TextField, Typography } from '@mui/material';

export const FileUpload = () => {
  return (
    <Stack width={'340px'}>
      <Typography fontSize={18} fontWeight={600} color={'#121316'}>
        Өнгөц зураг
      </Typography>
      <Stack>
        <TextField type="file" />
      </Stack>
    </Stack>
  );
};
