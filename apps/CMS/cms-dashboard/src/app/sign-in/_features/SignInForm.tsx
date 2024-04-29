'use client';

import { Button, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../../../common';
import { FormInput, Loader } from '../../sign-up/_components';

const SignInForm = () => {
  const { handleSignIn, loginLoading } = useAuth();

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
  });

  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSignIn(values.emailOrPhoneNumber, values.password);
    },
  });

  return (
    <Stack data-testid="sign-in-form-container" gap={2.5} padding={5} maxWidth={'440px'} width={'100%'} bgcolor={'#fff'} borderRadius={3} border={'1px solid #d6d8db'}>
      <Typography data-testid="sign-in-modal-title" textAlign={'center'} mb={1} fontSize={36} fontWeight={700}>
        Нэвтрэх
      </Typography>
      <Stack gap={2}>
        <FormInput
          name="emailOrPhoneNumber"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Имэйл эсвэл утасны дугаар оруулна уу"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.emailOrPhoneNumber}
          error={Boolean(formik.errors.emailOrPhoneNumber)}
          helperText={formik.errors.emailOrPhoneNumber}
          onBlur={formik.handleBlur}
        />

        <Stack alignItems={'flex-end'}>
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
          <Typography fontSize={14} fontWeight={400}>
            Нууц үг сэргээх
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          data-cy="Sign-In-Button"
          data-testid="Sign-Up-Button-Loader"
          fullWidth
          variant="contained"
          disabled={!formik.isValid || loginLoading}
          sx={{
            justifyContent: 'flex-end',
            py: '14.5px',
            background: '#121316',
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
          {loginLoading && <Loader />}
          <Typography mr={'28%'} fontSize={16} fontWeight={600}>
            Нэвтрэх
          </Typography>
          <ArrowForwardIcon data-testid="sign-in-modal-icon2" fontSize="medium" />
        </Button>
      </Stack>
      <Stack border={1} borderColor="#ECEDF0"></Stack>
      <Stack direction={'row'} justifyContent={'center'} gap={1}>
        <Typography>Бүртгэлгүй юу?</Typography>

        <Typography
          data-testid="sign-in-modal-to-signin"
          color={'#551a8b'}
          borderBottom={'1px solid #551a8b'}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Link href={'/sign-up'}>Бүртгүүлэх</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignInForm;
