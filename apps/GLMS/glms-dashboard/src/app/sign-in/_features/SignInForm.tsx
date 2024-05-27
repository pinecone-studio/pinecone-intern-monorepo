'use client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../../signup/_components/TextInput';
import { useAuth } from '@/common/providers';
import { Spinner } from '../../../components/Spinner';

const SignInForm = () => {
  const { handleSignIn, loading } = useAuth();
  const validationSchema = yup.object({
    emailOrPhoneNumber: yup.string().required('Утас эсвэл имэйл хаяг оруулна уу'),
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
      <div className="flex flex-col w-full">
        <div className="h-24">
          <TextInput
            name="emailOrPhoneNumber"
            label="Таны имэйл эсвэл утасны дугаар"
            placeholder="Утас эсвэл имэйл хаяг оруулна уу"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailOrPhoneNumber}
            error={formik.touched.emailOrPhoneNumber && Boolean(formik.errors.emailOrPhoneNumber)}
            helperText={formik.touched.emailOrPhoneNumber && formik.errors.emailOrPhoneNumber}
          />
        </div>
        <div className="h-24">
          <TextInput
            name="password"
            label="Нууц үг"
            placeholder="Нууц үгээ оруулна уу"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>

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
        className={`btn w-full h-fit flex justify-center py-[9px] border-none bg-black text-white gap-2 hover:bg-black ${!formik.isValid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!formik.values.password || !formik.values.emailOrPhoneNumber || loading}
      >
        <h2 className="text-lg text-semibold flex items-center">Нэвтрэх</h2>
        {loading && <Spinner />}
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
