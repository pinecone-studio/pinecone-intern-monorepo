'use client';

import { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../../common/providers/AuthProvider';
import * as yup from 'yup';
import TextInput from '@/app/sign-up/_components/TextInput';
import { Loader } from '@/app/sign-up/_components';
import { ArrowIcon } from '../../../assets/icons/ArrowIcon';

export const ResetFormStep1 = ({ setIndex }: { setIndex: Dispatch<SetStateAction<number>> }) => {
  const { setUserEmail } = useAuth();

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
  });

  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await console.log(values);
      setUserEmail(values.emailOrPhoneNumber);
    },
  });
  return (
    <div data-testid="reset-form1-form-container" className="flex flex-col gap-5 p-10 max-w-[440px] w-full bg-white rounded-lg border border-solid border-[#d6d8db] ">
      <h1 data-testid="reset-form1-modal-title" className="mb-2 text-center text-4xl font-bold">
        Нууц үг сэргээх
      </h1>
      <div className="flex flex-col gap-2">
        <TextInput
          name="emailOrPhoneNumber"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Имэйл эсвэл утасны дугаар оруулна уу"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailOrPhoneNumber}
          helperText={formik.errors.emailOrPhoneNumber}
          error={formik.errors.emailOrPhoneNumber}
        />
      </div>
      <div>
        <button
          onClick={() => {
            formik.handleSubmit();
            setIndex((prev) => prev + 1);
          }}
          data-cy="Reset-Form1-Button"
          data-testid="Sign-Up-Button-Loader"
          className={`btn w-full h-fit flex justify-end py-[12px] border-none bg-black text-white gap-2 hover:bg-[#d6d8db] hover:text-black ${
            !formik.isValid ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={!formik.isValid}
        >
          <Loader />
          <h2 className="mr-[24%] text-lg text-semibold flex items-center">Илгээх</h2>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};
