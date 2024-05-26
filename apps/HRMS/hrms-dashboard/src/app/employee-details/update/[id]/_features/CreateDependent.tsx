import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'next/navigation';
import { CustomInput } from '../../../_components';
import { Dependent, useCreateDependentMutation, useEmployeeDependentUpdateMutation } from '@/generated';
import { CloseSvg } from '../../../../../../public/assets/CloseSvg';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  lastName: yup.string().required('Овог оо оруулна уу.'),
  firstName: yup.string().required('Нэрийг нь оруулна уу.'),
  phone: yup.string().required('Холбоо барих дугаар аа бичнэ үү.'),
  dependency: yup.string().required('Энэ хүн таны хэн болох.'),
});

type CreateDependentProps = {
  handleCreateDependentClose: () => void;
  refetch: () => void;
  dependantPhone: string | null | undefined;
  dependency: string | null | undefined;
  relative: Dependent;
};

export const CreateDependent = ({ handleCreateDependentClose, refetch }: CreateDependentProps) => {
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
      if (createDependentResponse.data?.createDependent.id) {
        toast.success(`Мэдээлэл шинэчлэгдлээ`, {
          position: 'top-center',
          hideProgressBar: true,
        });
      }
      handleCreateDependentClose();
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
    <main data-cy="addDependentForm" className="flex flex-col max-w-[650px] w-full p-10  rounded-2xl overflow-hidden border border-[#D6D8DB] bg-white">
      <div className="flex justify-between">
        <p data-testid="addEmployeeTitle" className="text-lg text-main font-semibold">
          Гэр бүлийн мэдээлэл
        </p>
        <div data-testid="close-button" className="cursor-pointer" onClick={() => handleCreateDependentClose()}>
          <CloseSvg />
        </div>
      </div>
      <div className="flex flex-col justify-center pt-10 gap-4">
        <div className="grid grid-cols-1 gap-6">
          <CustomInput data-testid="customInput" label={'Овог'} type={'lastName'} placeholder={'Овог оруулна уу'} {...generateFormikProps('lastName' as keyof typeof formik.values)} />
          <CustomInput data-testid="customInput" label={'Нэр'} type={'firstName'} placeholder={'Нэр оруулна уу'} {...generateFormikProps('firstName' as keyof typeof formik.values)} />
          <CustomInput data-testid="customInput" label={'Холбоо барих дугаар'} type={'phone'} placeholder={'Холбоо барих дугаар'} {...generateFormikProps('phone' as keyof typeof formik.values)} />
          <CustomInput data-testid="customInput" label={'Таны хэн болох'} type={'dependency'} placeholder={'Таны хэн болох'} {...generateFormikProps('dependency' as keyof typeof formik.values)} />
          <div className="flex gap-2 justify-end">
            <button
              data-cy="cancel-button"
              type="reset"
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
              className=" py-2 px-4 font-semibold rounded-lg bg-black text-white"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
