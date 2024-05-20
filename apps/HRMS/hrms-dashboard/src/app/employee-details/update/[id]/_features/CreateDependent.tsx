import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'next/navigation';
import { CustomInput } from '../../../_components';
import { useCreateDependentMutation, useEmployeeDependentUpdateMutation } from '@/generated';
import { CloseSvg } from '../../../../../../public/assets/CloseSvg';

const validationSchema = yup.object({
  lastName: yup.string().required('Овог оо оруулна уу.'),
  firstName: yup.string().required('Нэрийг нь оруулна уу.'),
  phone: yup.string().required('Холбоо барих дугаар аа бичнэ үү.'),
  dependency: yup.string().required('Энэ хүн таны хэн болох.'),
});

type CreateDependentProps = {
  handleCreateDependentClose: () => void;
};

export const CreateDependent = ({ handleCreateDependentClose }: CreateDependentProps) => {
  const [createDependent] = useCreateDependentMutation();
  const [dependentUpdate] = useEmployeeDependentUpdateMutation();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      phone: '',
      dependency: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const createDependentResponse = await createDependent({
        variables: {
          input: {
            lastName: values.lastName,
            firstName: values.firstName,
            dependency: values.dependency,
            phone: values.phone,
          },
        },
      });
      await dependentUpdate({
        variables: {
          employeeDependentUpdateId: id,
          input: {
            relative: `${createDependentResponse.data?.createDependent.id}`,
          },
        },
      });
      handleCreateDependentClose();
    },
  });

  const generateFormikProps = (name: keyof typeof formik.values) => ({
    name: name,
    value: formik.values[name],
    error: Boolean(formik.errors[name]),
    helperText: formik.errors[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  });
  return (
    <main data-cy="addDependentForm" className="flex flex-col max-w-[650px] w-full p-10  rounded-2xl overflow-hidden border border-[#D6D8DB] bg-white">
      <div className="flex justify-between">
        <p data-testid="addEmployeeTitle" className="text-lg text-main font-semibold">
          Нэмэлт мэдээлэл
        </p>
        <div data-testid="close-button" className="cursor-pointer" onClick={() => handleCreateDependentClose()}>
          <CloseSvg />
        </div>
      </div>
      <form className="flex flex-col justify-center px-10 pt-10 gap-4">
        <div className="grid grid-cols-1 gap-6">
          <CustomInput data-testid="customInput" label={'Овог оо оруулна уу'} type={'lastName'} placeholder={'Овог оо оруулна уу'} {...generateFormikProps('lastName' as keyof typeof formik.values)} />
          <CustomInput
            data-testid="customInput"
            label={'Нэрийг нь оруулна уу'}
            type={'firstName'}
            placeholder={'Нэрийг нь оруулна уу'}
            {...generateFormikProps('firstName' as keyof typeof formik.values)}
          />
          <CustomInput
            data-testid="customInput"
            label={'Холбоо барих дугаар аа бичнэ үү'}
            type={'phone'}
            placeholder={'Холбоо барих дугаар аа бичнэ үү'}
            {...generateFormikProps('phone' as keyof typeof formik.values)}
          />
          <CustomInput
            data-testid="customInput"
            label={'энэ хүн таны хэн болох'}
            type={'dependency'}
            placeholder={'энэ хүн таны хэн болох'}
            {...generateFormikProps('dependency' as keyof typeof formik.values)}
          />
          <div className="flex gap-2 justify-end">
            <button
              data-cy="cancel-button"
              className="border py-4 px-5 font-semibold rounded-lg border-[D6D8D8]"
              onClick={(e) => {
                e.preventDefault();
                handleCreateDependentClose();
              }}
            >
              Цуцлах
            </button>
            <button
              data-cy="submit-button"
              className=" py-4 px-5 font-semibold rounded-lg bg-black text-white"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              Хадгалах
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};
