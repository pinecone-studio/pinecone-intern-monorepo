'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { Loader } from '../_components/Loader';
import { FormInput } from '../_components/FormInput';
import { object, ref, string } from 'yup';
import { useHelloMutationFromArticlesServiceMutation } from '../../../generated';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const validationSchema = object({
  emailOrPhoneNumber: string().required(`Email or Phone Number Хоосон байж болохгүй`),
  password: string()
    .required(`Password xоосон байж болохгүй`)
    .min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  confirmPassword: string()
    .required('Нууц үгээ давтаж оруулна уу')
    .oneOf([ref('password')], 'Нууц үг буруу байна '),
});

const SignUpForm = () => {
  const [useHelloMutationFromArticlesService, { loading: creationLoading }] = useHelloMutationFromArticlesServiceMutation();
  const handleLogin = (values: { password: string; confirmPassword: string; emailOrPhoneNumber: string }) => {
    console.log('this is getting called');
    console.log(values);
  };

  const formik = useFormik({
    onSubmit: (values) => {
      handleLogin(values);
    },
    validateOnChange: true,
    initialValues: { password: '', confirmPassword: '', emailOrPhoneNumber: '' },
    validationSchema: validationSchema,
  });

  return (
    <Stack data-testid="sign-up-form-container" gap={2.5} padding={5} maxWidth={'440px'} width={'100%'} bgcolor={'#fff'} borderRadius={3} border={'1px solid #d6d8db'}>
      <Typography data-testid="sign-up-modal-title" mb={1} textAlign={'center'} fontSize={36} fontWeight={700}>
        Бүртгүүлэх
      </Typography>
      <Stack gap={2}>
        <FormInput
          name="emailOrPhoneNumber"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Имэйл эсвэл утасны дугаар оруулна уу"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.emailOrPhoneNumber}
          error={formik.touched.emailOrPhoneNumber && Boolean(formik.errors.emailOrPhoneNumber)}
          helperText={formik.touched.emailOrPhoneNumber && formik.errors.emailOrPhoneNumber}
          onBlur={formik.handleBlur}
        />
        <FormInput
          name="password"
          label="Нууц үг"
          placeholder="Нууц үг оруулна уу"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
        />
        <FormInput
          name="confirmPassword"
          label="Нууц үг давтах"
          placeholder="Нууц үгээ давтаж оруулна уу"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          onBlur={formik.handleBlur}
        />
      </Stack>
      <Stack>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          disabled={!formik.isValid || creationLoading}
          fullWidth
          variant="contained"
          sx={{
            justifyContent: 'flex-end',
            py: '14px',
            px: '16px',
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
          {creationLoading && <Loader />}
          <Typography data-cy="Login-Button" mr={'23%'} fontSize={16} fontWeight={600}>
            Бүртгүүлэх
          </Typography>
          <ArrowForwardIcon data-testid="sign-up-modal-icon2" fontSize="medium" />
        </Button>
      </Stack>
      <Stack border={1} borderColor="#ECEDF0"></Stack>
      <Stack direction={'row'} justifyContent={'center'} gap={1}>
        <Typography>Бүртгэлтэй юу?</Typography>

        <Typography data-testid="sign-up-modal-to-signin" color={'#551a8b'} borderBottom={'1px solid #551a8b'}>
          <Link href={'/'}>Нэвтрэх</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignUpForm;
