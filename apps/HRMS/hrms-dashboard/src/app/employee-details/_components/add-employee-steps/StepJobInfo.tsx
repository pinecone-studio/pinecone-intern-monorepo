import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Department, EmploymentStatus } from '@/generated';
import { useFormik } from 'formik';
import { LeftArrowIcon, RightArrowIcon } from '../Icons/ModalIcons';
import { object, string, array } from 'yup';

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

const userSchema = object({
  department: string().required(),
  jobTitle: array().of(string()).required(),
  salary: string().required(),
  employmentStatus: string().required(),
});

export const StepJobInfo = ({
  nextStep,
  prevStep,
  employeesInfo,
  changeEmployee,
}: {
  nextStep: () => void;
  prevStep: () => void;
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
  const formik = useFormik({
    initialValues: {
      department: employeesInfo.department,
      jobTitle: employeesInfo.jobTitle,
      salary: employeesInfo.salary,
      employmentStatus: employeesInfo.employmentStatus,
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      changeEmployee(values);
      nextStep();
    },
  });

  return (
    <div data-testid="job-info" className="flex flex-col gap-10">
      <div data-testid="step-job-info" className="flex gap-4 flex-col">
        <div data-testid="step-info" className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Хэлтэс'}</label>
          <Select data-testid="select-one" onValueChange={(value) => formik.setFieldValue('department', value)}>
            <SelectTrigger className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]">
              <SelectValue placeholder="Хэлтэс" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Department.BackOffice}>{Department.BackOffice}</SelectItem>
              <SelectItem value={Department.Design}>{Department.Design}</SelectItem>
              <SelectItem value={Department.Marketing}>{Department.Marketing}</SelectItem>
              <SelectItem value={Department.Software}>{Department.Software}</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.department && <label className=" text-[16px] font-normal text-[#121316]">{formik.errors.department}</label>}
        </div>
        <div data-testid="input-one" className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Мэргэжил'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="jobTitle" value={formik.values.jobTitle} onChange={formik.handleChange} />
          {formik.errors.jobTitle && <label className=" text-[16px] font-normal text-red-500">{formik.errors.jobTitle}</label>}
        </div>
        <div data-testid="input-two" className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Цалин'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="salary" value={formik.values.salary} onChange={formik.handleChange} />
          {formik.errors.salary && <label className=" text-[16px] font-normal text-red-500">{formik.errors.salary}</label>}
        </div>
        <div data-testid="input-one" className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Ажлын цаг'}</label>
          <Select data-testid="select-two" onValueChange={(value) => formik.setFieldValue('employmentStatus', value)}>
            <SelectTrigger className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]">
              <SelectValue placeholder="Ажлын цаг" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EmploymentStatus.Archive}>{EmploymentStatus.Archive}</SelectItem>
              <SelectItem value={EmploymentStatus.Contractor}>{EmploymentStatus.Contractor}</SelectItem>
              <SelectItem value={EmploymentStatus.FullTime}>{EmploymentStatus.FullTime}</SelectItem>
              <SelectItem value={EmploymentStatus.PartTime}>{EmploymentStatus.PartTime}</SelectItem>
              <SelectItem value={EmploymentStatus.Temporary}>{EmploymentStatus.Temporary}</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.employmentStatus && <label className=" text-[16px] font-normal text-[#121316]">{formik.errors.employmentStatus}</label>}
        </div>
      </div>
      <div className="flex justify-between">
        <button data-testid="prev-button" onClick={prevStep} className="flex justify-center items-center h-12 w-12 rounded-full bg-[#F6F6F6]">
          <div className="flex w-6 h-6 items-center justify-center">
            <LeftArrowIcon />
          </div>
        </button>
        <button data-testid="next-button" onClick={() => formik.handleSubmit} className="flex gap-1 items-center px-4 py-2 h-12 rounded-[8px] bg-[#D6D8DB]">
          <p className="text-[#A9ACAF] text-[16px] font-[600] leading-5 tracking-[-0.3px]">Дараах</p>
          <div className="w-6 h-6">
            <RightArrowIcon />
          </div>
        </button>
      </div>
    </div>
  );
};
