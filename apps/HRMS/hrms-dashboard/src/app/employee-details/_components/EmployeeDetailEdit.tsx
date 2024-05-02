import { Stack, Typography } from '@mui/material';
import { CustomInput } from './CustomInput';
import { CancelButton } from './CancelButton';
import { SaveButton } from './SaveButton';

export const EmployeeDetailEdit = () => {
  return (
    <Stack maxWidth={'585px'} gap={5} padding={5} sx={{ border: 'solid, 1 , #ECEDF0', borderRadius: '12px' }}>
      <Typography fontSize={18} fontWeight={600}>
        Хөдөлмөр эрхлэлтийн мэдээлэл
      </Typography>
      <Stack width={'100%'} justifyContent={'center'}>
        <Stack width={'424px'} gap={2}>
          <Stack width={'100%'}>
            <CustomInput label="Албан тушаал" type="text" placeholder="Дизайнер" />
            <CustomInput label="Хэлтэс" type="text" placeholder="Хөгжүүлэлтийн хэлтэс" />
            <CustomInput label="Ажилд орсон өдөр" type="text" placeholder="Хөгжүүлэлтийн хэлтэс" />
            <CustomInput label="Төлөв " type="text" placeholder="Үндсэн ажилтан" />
            <Stack width={'220px'} justifyContent={'flex-end'} gap={1}>
              <CancelButton />
              <SaveButton />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
