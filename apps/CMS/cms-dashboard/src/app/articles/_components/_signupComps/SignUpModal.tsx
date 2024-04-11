// Sign up modal for CMS
'use client';

import { CircularProgress, Stack, Typography } from '@mui/material';
import { ArrowForward, NavigateBefore } from '@mui/icons-material';
import { CustomInput } from './CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

const SignUpModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object({
    emailOrPhoneNumber: yup.string().required('Энэ нүд хоосон байх ёсгүй').email('Имэйл ээ зөв оруулна уу'),
    password: yup.string().required('Энэ нүд хоосон байх ёсгүй'),
    rePassword: yup.string().required('Энэ нүд хоосон байх ёсгүй'),
  });
  const formik = useFormik({
    initialValues: { emailOrPhoneNumber: '', password: '', rePassword: '' },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setIsLoading(true);
      setIsLoading(false);
    },
  });

  const errorInEmail = Boolean(formik.errors.emailOrPhoneNumber) && formik.touched.emailOrPhoneNumber;
  const errorInPassword = Boolean(formik.errors.password) && formik.touched.password;
  const errorInRePass = Boolean(formik.errors.rePassword) && formik.touched.rePassword;

  return (
    <Stack width={'100%'} alignItems={'center'} bgcolor={'white'} padding={5} borderRadius={3} border={'1px solid #ECEDF0'} gap={3}>
      <Typography fontWeight={700} fontSize={36}>
        Бүртгүүлэх
      </Typography>
      <Stack width={'100%'} gap={2} alignItems={'center'}>
        <CustomInput
          name="emailOrPhoneNumber"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="80884200"
          value={formik.values.emailOrPhoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={errorInEmail}
          helperText={formik.errors.emailOrPhoneNumber}
        />
        <CustomInput
          name="password"
          label="Нууц үг"
          placeholder="*******"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={errorInPassword}
          helperText={formik.errors.password}
        />
        <CustomInput
          name="rePassword"
          label="Нууц үг давтах"
          placeholder="Нууц үгээ оруулна уу"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={errorInRePass}
          helperText={formik.errors.rePassword}
        />
        <Stack width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'primary.main'} borderRadius={2} padding={'8px 10px'} sx={{ cursor: 'pointer' }}>
          <NavigateBefore color="primary" />
          <Typography fontSize={14} fontWeight={600} color={'primary.contrastText'}>
            Дараах
          </Typography>
          {isLoading ? <CircularProgress size={18} color="secondary" thickness={5} /> : <ArrowForward color="secondary" />}
        </Stack>
        <Typography fontSize={14} fontWeight={600} color="primary" sx={{ cursor: 'pointer' }}>
          Нэвтрэх
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignUpModal;
