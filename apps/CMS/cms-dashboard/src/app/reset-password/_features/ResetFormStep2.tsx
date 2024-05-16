'use client';

import { Dispatch, SetStateAction } from 'react';
import { ArrowIcon } from '../../../assets/icons/ArrowIcon';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSendMailMutation } from '@/generated';
import { useResetPassword } from '@/common/providers/ResetPasswordProvider';
import TextInput from '@/app/sign-up/_components/TextInput';

export const ResetFormStep2 = ({ setIndex }: { setIndex: Dispatch<SetStateAction<number>> }) => {
  const [sendMail, { loading: creationLoading }] = useSendMailMutation();
  const { setOtp, email } = useResetPassword();

  const validationSchema = yup.object({
    code: yup.string().required('Нууц үг сэргээх кодоо оруулна уу'),
  });

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await setOtp(values.code);
      setIndex((prev) => prev + 1);
    },
  });
  return (
    <div data-testid="reset-form2-container" className="flex flex-col gap-5 p-10 max-w-[440px] w-full bg-white rounded-lg border border-solid border-[#d6d8db] ">
      <h1 data-testid="reset-form2-modal-title" className="mb-2 text-center text-4xl font-bold">
        Нууц үг сэргээх
      </h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h2>
            Таны<span className="ml-2 text-[#01E17B]">{email}</span>-руу нууц үг сэргээх код илгээх болно.
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <TextInput
            name="code"
            label="Нууц үг сэргээх код"
            placeholder="Нууц үг сэргээх код оруулна уу"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
            helperText={formik.errors.code}
            error={formik.errors.code}
          />
          <button
            onClick={async () => {
              await sendMail({ variables: { email } });
            }}
            disabled={creationLoading}
            data-cy="Reset-Form2-Again-Button"
            className="btn btn-xs border-none bg-white hover:bg-[#ECEDF0] text-[#551a8b] cursor-pointer text-1 shadow-none"
          >
            Код дахин илгээх
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          formik.handleSubmit();
        }}
        data-cy="Reset-Form2-Button"
        data-testid="Sign-Up-Button-Loader"
        className={`btn w-full h-fit flex justify-end py-[9px] border-none bg-black text-white gap-2 hover:bg-[#d6d8db] hover:text-black ${!formik.isValid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!formik.isValid}
      >
        <h2 className="mr-[24%] text-lg text-semibold flex items-center">Илгээх</h2>
        <ArrowIcon />
      </button>
    </div>
  );
};
