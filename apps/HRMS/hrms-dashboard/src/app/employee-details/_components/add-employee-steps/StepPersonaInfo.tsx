import { Input } from '@/components/ui/input';
import { RightArrowIcon } from '../Icons/ModalIcons';
import { useFormik } from 'formik';
import { Department, EmploymentStatus } from '@/generated';
import { useState } from 'react';

type EmployeesInfoType = {
  firstname: string;
  lastname: string;
  email: string;
  imageURL: string;
  department: Department;
  jobTitle: string[];
  ladderLevel: string;
  salary: string;
  dateOfEmployment: Date;
  employmentStatus: EmploymentStatus;
};

export const StepPersonalInfo = ({
  nextStep,
  employeesInfo,
  changeEmployee,
}: {
  nextStep: () => void;
  employeesInfo: {
    firstname: string;
    lastname: string;
    email: string;
    imageURL: string;
    department: Department;
    jobTitle: string[];
    ladderLevel: string;
    salary: string;
    dateOfEmployment: Date;
    employmentStatus: EmploymentStatus;
  };
  changeEmployee: (_values: Partial<EmployeesInfoType>) => void;
}) => {
  const [validMessage, setValidMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      firstname: employeesInfo.firstname,
      lastname: employeesInfo.lastname,
      email: employeesInfo.email,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form with values:', values);
        changeEmployee(values);
        console.log('Employee created successfully:');
        resetForm();
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
  });

  const handleNext = () => {
    formik.handleSubmit();
    if (formik.values.firstname !== '' && formik.values.lastname !== '' && formik.values.email !== '') {
      nextStep();
    } else {
      setValidMessage('Мэдээллээ бүрэн оруулна уу');
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div data-testid="step-personal-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Овог'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Нэр'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Имайл'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="email" value={formik.values.email} onChange={formik.handleChange} />
        </div>
        <p className="text-[12px] text-[red]">{validMessage}</p>
      </div>
      <div className="flex mt-[48px] justify-end">
        <button data-testid="next-button" onClick={handleNext} className="flex gap-1 items-center px-4 py-2 h-12 rounded-[8px] bg-[#D6D8DB]">
          <p className="text-[#A9ACAF] text-[16px] font-[600] leading-5 tracking-[-0.3px]">Дараах</p>
          <div className="w-6 h-6">
            <RightArrowIcon />
          </div>
        </button>
      </div>
    </div>
  );
};
