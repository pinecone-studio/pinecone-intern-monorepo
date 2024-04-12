'use client';
import { Stack, Typography } from '@mui/material';
import { ArrowForward, NavigateBefore } from '@mui/icons-material';
import { CustomInput } from './CustomInput';

const SignUpModal = () => {
  return (
    <Stack data-testid="sign-up-modal-container" width={'100%'} alignItems={'center'} bgcolor={'white'} padding={5} borderRadius={3} border={'1px solid #ECEDF0'} gap={3}>
      <Typography data-testid="sign-up-modal-title" fontWeight={700} fontSize={36}>
        {'Бүртгүүлэх'}
      </Typography>
      <Stack width={'100%'} gap={2} alignItems={'center'}>
        <CustomInput name="emailOrPhoneNumber" label="Таны имэйл эсвэл утасны дугаар" placeholder="80884200" />
        <CustomInput name="password" label="Нууц үг" placeholder="*******" />
        <CustomInput name="rePassword" label="Нууц үг давтах" placeholder="Нууц үгээ оруулна уу" />
        <Stack
          data-testid="signup-button"
          width={'100%'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          bgcolor={'primary.main'}
          borderRadius={2}
          padding={'8px 10px'}
          sx={{ cursor: 'pointer' }}
        >
          <NavigateBefore color="primary" />
          <Typography data-testid="sign-up-modal-next-btn" fontSize={14} fontWeight={600} color={'primary.contrastText'}>
            Дараах
          </Typography>
          {<ArrowForward data-testid="sign-up-modal-icon2" color="secondary" />}
        </Stack>
        <Typography data-testid="sign-up-modal-login-btn" fontSize={14} fontWeight={600} color="primary" sx={{ cursor: 'pointer' }}>
          Нэвтрэх
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignUpModal;
