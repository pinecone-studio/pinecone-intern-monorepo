'use client';

import * as yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../../signup/_components/TextInput';
import { ArrowBackIcon } from '../../../../public/assets/ArrowBackIcon';
import { useAuth } from '@/common/providers';

const SignInForm = () => {
  const { handleSignIn, loading } = useAuth();
  const validationSchema = yup.object({
    emailOrPhoneNumber: yup
      .string()
      .test('is-email-or-phoneNumber', 'Утас эсвэл имэйл хаяг оруулна уу', function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isEmail = emailRegex.test(value as string);

        const phoneRegex = /^\d{8}$|^\d{10}$/;

        const isPhoneNumber = phoneRegex.test(value as string);

        return isEmail || isPhoneNumber;
      })
      .required('Утас эсвэл имэйл хаяг оруулна уу'),
    password: yup.string().required('Нууц үгээ оруулна уу'),
  });

  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleSignIn(values.emailOrPhoneNumber, values.password);
    },
  });

  return (
    <div data-testid="sign-in-form-container" className="flex flex-col gap-5 p-10 max-w-[440px] w-full bg-white rounded-lg border border-solid border-[#d6d8db]">
      <h1 data-testid="sign-in-modal-title" className="mb-2 text-center text-4xl font-bold">
        Нэвтрэх
      </h1>

      <div className="flex items-center justify-center w-full">
        <div className="w-full border border-solid border-[#ecedf0]"></div>
        <div className="w-full border border-solid border-[#ecedf0]"></div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <TextInput
          name="emailOrPhoneNumber"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Утас эсвэл имэйл хаяг оруулна уу"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailOrPhoneNumber}
          helperText={formik.errors.emailOrPhoneNumber}
          error={formik.errors.emailOrPhoneNumber}
        />

        <TextInput
          name="password"
          label="Нууц үг"
          placeholder="Нууц үгээ оруулна уу"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          helperText={formik.errors.password}
          error={formik.errors.password}
        />
        <a href={'#'} className="text-base text-[#26282e] hover:text-[#551a8b] text-center">
          Нууц үг сэргээх
        </a>
      </div>

      <button
        onClick={() => {
          formik.handleSubmit();
        }}
        data-cy="Sign-In-Button"
        data-testid="Sign-Up-Button-Loader"
        className={`btn w-full h-fit flex justify-end py-[9px] border-none bg-black text-white gap-2 hover:bg-[#d6d8db] hover:text-black ${!formik.isValid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!formik.isValid || loading}
      >
        <h2 className="mr-[23%] text-lg text-semibold flex items-center"> Нэвтрэх</h2>
        <ArrowBackIcon />
      </button>

      <div className="border border-solid border-[#ecedf0]"></div>

      <div className="flex justify-center gap-2">
        <h2>Бүртгэлгүй юу?</h2>

        <div className="text-[#551a8b] border-b border-b-solid border-[#551a8b] cursor-pointer" data-testid="sign-in-modal-to-signup">
          <a href={'/signup'}>Бүртгүүлэх</a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
