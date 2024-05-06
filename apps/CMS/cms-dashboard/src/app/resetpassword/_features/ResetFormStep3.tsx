'use client';

import { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../../common/providers/AuthProvider';
import * as yup from 'yup';
import TextInput from '@/app/sign-up/_components/TextInput';
import { Loader } from '@/app/sign-up/_components';
import { ArrowIcon } from '../../../assets/icons/ArrowIcon';
import { useRouter } from 'next/navigation';

export const ResetFormStep3 = ({ index, setIndex }: { index: number; setIndex: Dispatch<SetStateAction<number>> }) => {
  const { userEmail, userOtp } = useAuth();
  const router = useRouter();

  const validationSchema = yup.object({
    newPassword: yup.string().required('Нууц үгээ оруулна уу'),
    reNewPassword: yup
      .string()
      .required('Нууц үгээ давтаж оруулна уу')
      .oneOf([yup.ref('newPassword'), 'Нууц үг буруу байна']),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      reNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await console.log(values);
    },
  });
  return (
    <div data-testid="reset-form3-form-container" className="flex flex-col gap-5 p-10 max-w-[440px] w-full bg-white rounded-lg border border-solid border-[#d6d8db] ">
      <h1 data-testid="reset-form3-modal-title" className="mb-2 text-center text-4xl font-bold">
        Нууц үг сэргээх
      </h1>
      <div className="flex flex-col gap-2">
        <TextInput
          name="newPassword"
          label="Шинэ нууц үг"
          placeholder="Шинэ нууц үгээ оруулна уу"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          helperText={formik.errors.newPassword}
          error={formik.errors.newPassword}
        />
        <TextInput
          name="reNewPassword"
          label="Шинэ нууц үг давтах "
          placeholder="Шинэ нууц үгээ давтаж оруулна уу"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.reNewPassword}
          helperText={formik.errors.reNewPassword}
          error={formik.errors.reNewPassword}
        />
      </div>
      <div>
        <button
          onClick={() => {
            formik.handleSubmit();
            if (index === 3) {
              router.push('/');
              setIndex(0);
            }
          }}
          data-cy="Reset-Form3-Button"
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
