'use client';

import { ArrowForward } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { Loader } from '../_components/Loader';
import { FormInput } from '../_components/FormInput';
import { useAuth } from '../../../common/providers/AuthProvider';
import * as yup from 'yup';
import { useState } from 'react';
import TextInput from '../_components/TextInput';

const SignUpForm = () => {
  const { handleSignUp, signUpLoading } = useAuth();
  const [name, setName] = useState('');

  const validationSchema = yup.object({
    emailOrPhoneNumber: yup
      .string()
      .test('is-email-or-phoneNumber', 'Утас эсвэл имэйл хаяг байх ёстой', function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isEmail = emailRegex.test(value as string);

        const phoneRegex = /^\d{8}$|^\d{10}$/;

        const isPhoneNumber = phoneRegex.test(value as string);

        return isEmail || isPhoneNumber;
      })
      .required('Утас эсвэл имэйл хаяг оруулна уу'),
    password: yup
      .string()
      .required('Нууц үгээ оруулна уу')
      .min(8, 'Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой')
      .matches(/[a-z]/, 'Жижэг үсэг байх ёстой')
      .matches(/[A-Z]/, 'Том үсэг байх ёстой')
      .matches(/^(?=.*[!@#$%^&*])/, 'Тусгай тэмдэгт байх ёстой'),
    confirmPassword: yup
      .string()
      .required('Нууц үгээ давтаж оруулна уу')
      .oneOf([yup.ref('password')], 'Нууц үг буруу байна'),
  });

  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSignUp(values.emailOrPhoneNumber, values.password);
    },
  });

  return (
    <Stack data-testid="sign-up-form-container" gap={2.5} padding={5} maxWidth={'440px'} width={'100%'} bgcolor={'#fff'} borderRadius={3} border={'1px solid #d6d8db'}>
      <Typography data-testid="sign-up-modal-title" mb={1} textAlign={'center'} fontSize={36} fontWeight={700}>
        Бүртгүүлэх
      </Typography>
      <Stack gap={1}>
        <TextInput
          name="emailOrPhoneNumber"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Имэйл эсвэл утасны дугаар оруулна уу"
          type="password"
          crossOrigin=""
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailOrPhoneNumber}
          error={Boolean(formik.errors.emailOrPhoneNumber)}
        />
        {/* <FormInput
          name="emailOrPhoneNumber"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Имэйл эсвэл утасны дугаар оруулна уу"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.emailOrPhoneNumber}
          error={Boolean(formik.errors.emailOrPhoneNumber)}
          helperText={formik.errors.emailOrPhoneNumber}
          onBlur={formik.handleBlur}
        /> */}
        <FormInput
          name="password"
          label="Нууц үг"
          placeholder="Нууц үг оруулна уу"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
          onBlur={formik.handleBlur}
        />
        <FormInput
          name="confirmPassword"
          label="Нууц үг давтах"
          placeholder="Нууц үгээ давтаж оруулна уу"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={Boolean(formik.errors.confirmPassword)}
          helperText={formik.errors.confirmPassword}
          onBlur={formik.handleBlur}
        />
      </Stack>
      <Stack>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          data-cy="Sign-Up-Button"
          data-testid="Sign-Up-Button-Loader"
          disabled={!formik.isValid || signUpLoading}
          fullWidth
          variant="contained"
          sx={{
            justifyContent: 'flex-end',
            py: '14.5px',
            background: '#000',
            color: 'white',
            gap: '8px',
            '&:hover': {
              backgroundColor: '#d6d8db',
              color: '#000',
            },
            borderRadius: '8px',
            cursor: !formik.isValid ? 'not-allowed' : 'pointer',
          }}
        >
          {signUpLoading && <Loader />}
          <Typography mr={'23%'} fontSize={16} fontWeight={600}>
            Бүртгүүлэх
          </Typography>
          <ArrowForward data-testid="sign-up-modal-icon2" fontSize="medium" />
        </Button>
      </Stack>

      <Stack border={1} borderColor="#ECEDF0"></Stack>

      <Stack direction={'row'} justifyContent={'center'} gap={1}>
        <Typography>Бүртгэлтэй юу?</Typography>

        <Typography
          data-testid="sign-up-modal-to-signin"
          color={'#551a8b'}
          borderBottom={'1px solid #551a8b'}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Link href={'/sign-in'}>Нэвтрэх</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignUpForm;
