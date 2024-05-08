'use client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../_components/TextInput';
import { useAuth } from '../../../common/providers/AuthProvider';
import { ArrowIcon } from '../../../../public/assets/ArrowIcon';

const LoginForm = () => {
  const { handleSignIn, loginLoading } = useAuth();

  const validationSchema = yup.object({
    emailorPhone: yup
      .string()
      .test('is-email-or-phoneNumber', 'Утас эсвэл имэйл хаяг байх ёстой', function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isEmail = emailRegex.test(value as string);

        const phoneRegex = /^\d{8}$|^\d{10}$/;

        const isPhoneNumber = phoneRegex.test(value as string);

        return isEmail || isPhoneNumber;
      })
      .required('Утас эсвэл имэйл хаяг оруулна уу'),
  });

  const formik = useFormik({    
    initialValues: {
      emailorPhone: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSignIn(values.emailorPhone);
    },
  });

  return (
    <div data-testid="sign-in-form-container" className="flex flex-col gap-5 p-10 max-w-[440px] w-full bg-white rounded-lg border border-solid border-[#d6d8db] ">
      <h1 data-testid="sign-in-modal-title" className="mb-2 text-center text-4xl font-bold">
        Нэвтрэх
      </h1>
      <div className="flex flex-col gap-2 w-full">
        <TextInput
          name="emailorPhone"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Имэйл эсвэл утасны дугаар оруулна уу"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailorPhone}
          helperText={formik.errors.emailorPhone}
          error={formik.errors.emailorPhone}
        />
        <div className="flex flex-col items-end">
        </div>
      </div>
      <div className="group">
        <button
          onClick={() => {
            formik.handleSubmit();
          }}
          data-cy="Sign-In-Button"
          data-testid="Sign-Up-Button-Loader"
          className={`btn w-full h-fit flex justify-end py-[12px] border-none bg-black text-white gap-2 hover:bg-[#d6d8db] hover:text-black ${
            !formik.isValid ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={!formik.isValid || loginLoading}
        >
          {loginLoading && <span className="loading loading-ring loading-lg"></span>}
          <h2  className="mr-[23%] text-lg text-semibold flex items-center">Нэвтрэх</h2>
          <ArrowIcon />
        </button>
      </div>

      <div className="border border-solid border-[#ecedf0]"></div>
    </div>
  );
};

export default LoginForm;