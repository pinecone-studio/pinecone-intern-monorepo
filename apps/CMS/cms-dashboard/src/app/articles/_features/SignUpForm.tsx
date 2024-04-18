'use client';
import { ArrowForward, NavigateBefore } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { object, ref, string } from 'yup';
import { FormInput } from '../_components/FormInput';

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
    .required('Please re-type your password')
    .oneOf([ref('password')], 'Passwords does not match'),
});

const SignUpForm = () => {
  const handleLogin = (values: { password: string; confirmPassword: string; emailOrPhoneNumber: string }) => {
    console.log('this is getting called');
    console.log(values);
  };

  const handleNext = () => {
    console.log('this is getting called');
  };

  const { values, errors, handleSubmit, handleChange, isValid } = useFormik({
    onSubmit: (values) => {
      handleLogin(values);
    },
    validateOnChange: true,
    initialValues: { password: '', confirmPassword: '', emailOrPhoneNumber: '' },
    validationSchema: validationSchema,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack data-testid="sign-up-form-container" width={'100%'} alignItems={'center'} bgcolor={'white'} padding={5} borderRadius={3} border={'1px solid #ECEDF0'} gap={3}>
        <Typography data-testid="sign-up-modal-title" fontWeight={700} fontSize={36}>
          {'Бүртгүүлэх'}
        </Typography>
        <Stack width={'100%'} gap={2} alignItems={'center'}>
          <FormInput
            name="emailOrPhoneNumber"
            value={values.emailOrPhoneNumber}
            label="Таны имэйл эсвэл утасны дугаар"
            placeholder="80884200"
            helperText={errors.emailOrPhoneNumber}
            onChange={handleChange('emailOrPhoneNumber')}
          />
          <FormInput name="password" value={values.password} label="Нууц үг" placeholder="*******" helperText={errors.password} onChange={handleChange('password')} />
          <FormInput
            name="confirmPassword"
            value={values.confirmPassword}
            label="Нууц үг давтах"
            placeholder="Нууц үгээ оруулна уу"
            helperText={errors.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
          <Stack width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'primary.main'} borderRadius={2} padding={'8px 10px'} sx={{ cursor: 'pointer' }}>
            <NavigateBefore color="primary" />
            <Typography data-testid="sign-up-modal-next-btn" fontSize={14} fontWeight={600} color={'primary.contrastText'} onClick={handleNext}>
              Дараах
            </Typography>
            <ArrowForward data-testid="sign-up-modal-icon2" color="secondary" />
          </Stack>
          <Button
            data-cy="Login-Button"
            type="submit"
            component={'button'}
            data-testid="sign-up-modal-login-btn"
            color="primary"
            sx={{ cursor: !isValid ? 'not-allowed' : 'pointer' }}
            disabled={!isValid}
          >
            Нэвтрэх
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default SignUpForm;
