'use client';
import { Stack, TextField, Typography } from '@mui/material';
import { fileManagement } from '@/file-management';

type FormikTypes = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  thumbnail: string;
};
const FileUploader = (props: FormikTypes) => {
  const { setFieldValue, thumbnail } = props;
  const handleUpload = async (e: any) => {
    if (e.target.files || thumbnail !== '') {
      const file = Array.from(e.target.files);
      const accessUrl = await fileManagement(file, 'GLMS-dashboard');
      setFieldValue('thumbnail', accessUrl[0], true);
    }
  };

  return (
    <Stack
      width={'100%'}
      height={422}
      px={1}
      border={'2px #D6D8DB dashed'}
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={'8px'}
      sx={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover' }}
    >
      <Typography fontWeight={400} fontSize={18} color={'#3F414580'}>
        Зургийг чирж буулгах эсвэл
      </Typography>
      <Stack width={80} overflow={'hidden'} position={'relative'} alignItems={'center'}>
        <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontWeight={600} color={'#3F4145'}>
          Browse
        </Typography>
        <TextField
          id="file-test"
          onChange={handleUpload}
          type="file"
          sx={{
            opacity: 0,
            '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 },
            position: 'absolute',
          }}
        />
      </Stack>
    </Stack>
  );
};
export default FileUploader;
