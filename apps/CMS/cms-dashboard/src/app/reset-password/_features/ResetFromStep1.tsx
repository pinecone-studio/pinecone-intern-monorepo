'use client';

import { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextInput from '@/app/sign-up/_components/TextInput';
import { Loader } from '@/app/sign-up/_components';
import { ArrowIcon } from '../../../assets/icons/ArrowIcon';
import { useResetPassword } from '@/common/providers/ResetPasswordProvider';

export const ResetFormStep1 = ({ setIndex }: { setIndex: Dispatch<SetStateAction<number>> }) => {
  const { setEmail, handleSendMail, sendMailLoading } = useResetPassword();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Имэйл хаяг аа оруулна уу')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Имэйл хаяг байх ёстой'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleSendMail(values.email);
      setEmail(values.email);
      setIndex((prev) => prev + 1);
    },
  });
  return (
    <div data-testid="reset-form1-container" className="flex flex-col gap-5 p-10 max-w-[440px] w-full bg-white rounded-lg border border-solid border-[#d6d8db] ">
      <h1 data-testid="reset-form1-modal-title" className="mb-2 text-center text-4xl font-bold">
        Нууц үг сэргээх
      </h1>
      <div className="flex flex-col gap-2">
        <TextInput
          name="email"
          label="Таны имэйл эсвэл утасны дугаар"
          placeholder="Имэйл эсвэл утасны дугаар оруулна уу"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          helperText={formik.errors.email}
          error={formik.errors.email}
        />
      </div>
      <button
        onClick={() => {
          formik.handleSubmit();
        }}
        data-cy="Reset-Form1-Button"
        data-testid="Sign-Up-Button-Loader"
        className={`btn w-full h-fit flex justify-end py-[9px] border-none bg-black text-white gap-2 hover:bg-[#d6d8db] hover:text-black ${!formik.isValid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={sendMailLoading || !formik.isValid}
      >
        {sendMailLoading && <Loader />}
        <h2 className="mr-[24%] text-lg text-semibold flex items-center">Илгээх</h2>
        <ArrowIcon />
      </button>
    </div>
  );
};
