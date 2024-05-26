'use client';
import { CustomInput } from '../../../_components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Department, EmploymentStatus, useUpdateEmploymentMutation } from '@/generated';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { CloseSvg } from '../../../../asset/icons/CloseSvg';
import { toast } from 'react-toastify';
const validationSchema = yup.object({
  jobTitle: yup.string().required('Албан тушаал оруулна уу'),
  department: yup.string().required('Хэлтэс сонгоно уу'),
  dateOfEmployment: yup.date().required('Огноо оруулна уу'),
  employmentStatus: yup.string().required('Төлөв сонгоно уу'),
});
const departmentList = Object.values(Department);
const employeeStatusList = Object.values(EmploymentStatus);
type EmploymentInfoInputProps = {
  jobTitle: string | number | null | undefined;
  department: string | null | undefined;
  dateOfEmployment: string | null | undefined;
  employmentStatus: string | null | undefined;
  setUpdateEmpInput: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};
export const EmploymentInfoInput = (props: EmploymentInfoInputProps) => {
  const [updateEmployment] = useUpdateEmploymentMutation();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      jobTitle: props.jobTitle,
      department: props.department,
      dateOfEmployment: props.dateOfEmployment,
      employmentStatus: props.employmentStatus,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { data } = await updateEmployment({
        variables: {
          updateEmploymentId: id,
          input: {
            jobTitle: values.jobTitle as string,
            department: values.department as Department,
            dateOfEmployment: values.dateOfEmployment as string,
            employmentStatus: values.employmentStatus as EmploymentStatus,
          },
        },
      });
      if (data?.updateEmployment.employmentStatus) {
        toast.success(`Мэдээлэл шинэчлэгдлээ`, {
          position: 'top-center',
          hideProgressBar: true,
        });
      }
      props.refetch();
      props.setUpdateEmpInput(false);
    },
  });
  return (
    <main data-cy="updateEmploymentForm" className=" max-w-[585px] rounded-xl p-10 bg-[#fff] gap-10 flex flex-col ">
      <div className="flex justify-between w-full items-center">
        <p data-testid="updateEmploymentTitle" className="text-lg text-main font-semibold">
          Хөдөлмөр эрхлэлтийн мэдээлэл
        </p>
        <div
          data-testid="closeSvg"
          onClick={() => {props.setUpdateEmpInput(false);}}
          className="cursor-pointer"
        ><CloseSvg />
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4 ">
        <div className="w-[424px] flex flex-col gap-4 ">
          <CustomInput
            data-testid="EmploymentInputInfo"
            label="Албан тушаал"
            type="text"
            value={formik.values.jobTitle ?? ''}
            name="jobTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.jobTitle)}
          />
          <CustomInput
            data-testid="EmploymentInputInfo"
            label="Хэлтэс"
            type="select"
            value={formik.values.department ?? ''}
            name="department"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.department)}
          >
            {departmentList.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </CustomInput>
          <CustomInput
            data-testid="EmploymentInputInfo"
            label="Ажилд орсон өдөр"
            type="date"
            value={formik.values.dateOfEmployment?.toString().slice(0, 10) ?? ''}
            name="dateOfEmployment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.dateOfEmployment)}
          />
          <CustomInput
            data-testid="EmploymentInputInfo"
            label="Төлөв"
            type="select"
            value={formik.values.employmentStatus ?? ''}
            name="employmentStatus"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.employmentStatus)}
          >
            {employeeStatusList.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </CustomInput>
          <div className="flex justify-end gap-2">
            <button
              data-cy="closeBtn"
              name="CloseBtn"
              disabled={!formik.isValid}
              style={{
                backgroundColor: '#fff',
                color: '#121316',
                padding: '8px 16px',
                border: '1px solid #000',
                borderRadius: '4px',
                cursor: 'pointer',}}
              onClick={() => {props.setUpdateEmpInput(false);}}>
              Цуцлах
            </button>
            <button
              data-cy="updateEmploymentBtn"
              name="updateBtn"
              disabled={!formik.isValid}
              style={{
                backgroundColor: '#121316',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >Хадгалах</button>
          </div>
        </div>
      </div>
    </main>
  );
};
