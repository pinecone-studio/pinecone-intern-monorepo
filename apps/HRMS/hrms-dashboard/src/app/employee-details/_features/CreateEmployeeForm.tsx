import { Stack, Button, Typography } from '@mui/material';
import { CustomInput } from '../_components/CustomInput';
import { Close } from '@mui/icons-material';
import { createEmployeeText } from '../constants';
export const CreateEmployeeForm = () => {
  return (
    <Stack p={5} maxWidth={'sm'} borderRadius={'16px'} border={1} borderColor={'#D6D8DB'}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography data-testid="addEmployeeTitle" color={'common.black'} fontSize={18} fontWeight={600}>
          Ажилтан нэмэх
        </Typography>
        <Stack>
          <Close fontSize="small" />
        </Stack>
      </Stack>
      <Stack justifyContent="center" px={5} pt={5} gap={2}>
        {createEmployeeText.map((item, index) => (
          <CustomInput key={index} label={item.label} type={item.type} placeholder={item.placeholder} />
        ))}
        <Stack color={'red'} alignItems={'flex-end'}>
          <Button data-testid="addEmployeeBtn" variant="contained" color="primary" sx={{ width: 'fit-content' }}>
            <Typography fontSize={16} fontWeight={600}>
              Хадгалах
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
