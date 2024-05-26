'use client';

import { useFormik } from 'formik';
import { Loader } from '../_components/Loader';
import { useAuth } from '../../../common/providers/AuthProvider';
import * as yup from 'yup';
import TextInput from '../_components/TextInput';
import { ArrowLeftIcon } from '../../../../public/assets/ArrowLeftIcon';

const SignUpForm = () => {
  const { handleSignUp, signUpLoading } = useAuth();

  const validationSchema = yup.object({
    email: yup.string().email('Имэйл хаяг буруу байна').required('Имэйл хаягаа оруулна уу'),
    number: yup.number().typeError('Утасны дугаар буруу байна').required('Утасны дугаараа оруулна уу'),
    password: yup.string().required('Нууц үгээ оруулна уу'),
    confirmPassword: yup
      .string()
      .required('Нууц үгээ давтаж оруулна уу')
      .oneOf([yup.ref('password')], 'Нууц үг буруу байна'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      number: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignUp(values.email, values.number, values.password);
    },
  });

  return (
    <div data-testid="sign-up-form-container" className="flex flex-col gap-5 p-10 max-w-[440px] w-full bg-white rounded-lg border border-solid border-[#d6d8db] ">
      <h1 data-testid="sign-up-modal-title" className="mb-2 text-center text-4xl font-bold">
        Бүртгүүлэх
      </h1>
      <div className="flex flex-col gap-2">
        <TextInput
          name="email"
          label="Таны имэйл"
          placeholder="Имэйлээ оруулна уу"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          helperText={formik.errors.email}
          error={formik.errors.email}
        />
        <TextInput
          name="number"
          label="Таны утасны дугаар"
          placeholder="Утасны дугаар оруулна уу"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.number}
          helperText={formik.errors.number}
          error={formik.errors.number}
        />
        <TextInput
          name="password"
          label="Нууц үг"
          placeholder="Нууц үг оруулна уу"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          helperText={formik.errors.password}
          error={formik.errors.password}
        />
        <TextInput
          name="confirmPassword"
          label="Нууц үг давтах"
          placeholder="Нууц үгээ давтаж оруулна уу"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          helperText={formik.errors.confirmPassword}
          error={formik.errors.confirmPassword}
        />
      </div>

      <button
        onClick={() => {
          formik.handleSubmit();
        }}
        data-cy="Sign-Up-Button"
        data-testid="Sign-Up-Button-Loader"
        className={`btn w-full h-fit flex justify-end py-[9px] border-none bg-black text-white gap-2 hover:bg-[#d6d8db] hover:text-black ${!formik.isValid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!formik.isValid || signUpLoading}
      >
        {signUpLoading && <Loader />}
        <h2 className="mr-[20%] text-lg text-semibold flex items-center">Бүртгүүлэх</h2>
        <ArrowLeftIcon />
      </button>

      <div className="border border-solid border-[#ecedf0]"></div>

      <div className="flex justify-center gap-2">
        <h2>Бүртгэлтэй юу?</h2>

        <div className="text-[#551a8b] border-b border-b-solid border-[#551a8b] cursor-pointer" data-testid="sign-up-modal-to-signin">
          <a href={'/sign-in'}>Нэвтрэх</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
