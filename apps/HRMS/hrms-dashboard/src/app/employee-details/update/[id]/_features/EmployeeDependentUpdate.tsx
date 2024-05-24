import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CustomInput } from '../../../_components';
import { Dependent, useUpdatedDependentMutation } from '@/generated';
import { CloseSvg } from '../../../../../../public/assets/CloseSvg';

const validationSchema = yup.object({
  lastName: yup.string().required('Овог оо оруулна уу.'),
  firstName: yup.string().required('Нэрийг нь оруулна уу.'),
  phone: yup.string().required('Холбоо барих дугаар аа бичнэ үү.'),
  dependency: yup.string().required('Энэ хүн таны хэн болох.'),
});

type CreateDependentProps = {
  handleUpdateDependentClose: () => void;
  relative: Dependent;
  refetch: () => void;
};

export const EmployeeDependentUpdate = ({ refetch, handleUpdateDependentClose, relative }: CreateDependentProps) => {
  const [EmployeeDependentUpdate] = useUpdatedDependentMutation();
  const formik = useFormik({
    initialValues: {
      lastName: String(relative.lastName),
      firstName: String(relative.firstName),
      phone: String(relative.phone),
      dependency: String(relative.dependency),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await EmployeeDependentUpdate({
        variables: {
          updatedDependentId: relative.id,
          input: {
            lastName: values.lastName,
            firstName: values.firstName,
            phone: values.phone,
            dependency: values.dependency,
          },
        },
      });
      handleUpdateDependentClose();
      refetch();
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
    <main className="flex flex-col max-w-[500px] w-full p-10  rounded-2xl overflow-hidden border border-[#D6D8DB] bg-white">
      <div className="flex justify-between">
        <p data-testid="addEmployeeTitle" className="text-lg text-main font-semibold">
          Гэр бүлийн мэдээлэл
        </p>
        <div data-testid="close-button" className="cursor-pointer" onClick={() => handleUpdateDependentClose()}>
          <CloseSvg />
        </div>
      </div>
      <form className="flex flex-col justify-center  pt-10 gap-4">
        <div className="grid grid-cols-1 gap-6">
          <CustomInput data-testid="customInput" label={'Овог'} type={'lastName'} placeholder={'Овог оо оруулна уу'} {...generateFormikProps('lastName' as keyof typeof formik.values)} />
          <CustomInput data-testid="customInput" label={'Нэр'} type={'firstName'} placeholder={'Нэр'} {...generateFormikProps('firstName' as keyof typeof formik.values)} />
          <CustomInput
            data-testid="customInput"
            label={'Холбоо барих дугаар'}
            type={'phone'}
            placeholder={'Холбоо барих дугаар аа бичнэ үү'}
            {...generateFormikProps('phone' as keyof typeof formik.values)}
          />
          <CustomInput
            data-testid="customInput"
            label={'Таны хэн болох'}
            type={'dependency'}
            placeholder={'энэ хүн таны хэн болох'}
            {...generateFormikProps('dependency' as keyof typeof formik.values)}
          />
          <div className="flex gap-2 justify-end">
            <button
              data-cy="cancel-button"
              className="border py-2 px-4 font-semibold rounded-lg border-[D6D8D8]"
              onClick={(e) => {
                e.preventDefault();
                handleUpdateDependentClose();
              }}
            >
              Цуцлах
            </button>
            <button
              data-cy="submit-button"
              type="submit"
              className=" py-2 px-4 font-semibold rounded-lg bg-black text-white"
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
