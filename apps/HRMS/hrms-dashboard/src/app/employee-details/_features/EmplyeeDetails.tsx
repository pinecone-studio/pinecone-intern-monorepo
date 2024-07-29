'use client';
import { Department, Employee, EmploymentStatus, useCreateEmployeeMutation, useGetEmployeesQuery } from '@/generated';
import PaginationDemo from '../_components/Pagination';
import { TableDemo } from '../_components/TableBoard';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { AddModal } from '../_components/modal/AddModal';
import { isValidPersonalInfo, isValidJobInfo, isValidAdditionalInfo } from '../utils/validation-utils';
export type EmployeesInfoType = {
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
const employeeSchema = object({
  email: string().email('Invalid email').required('Имайл оруулна уу'),
});
const CLOUD_NAME = 'dy39wvdh0';
const UPLOAD_PRESET = 'gxjou9af';
export const EmployeeDetails = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [createEmployeeMutation] = useCreateEmployeeMutation();
  const { data } = useGetEmployeesQuery();
  const { refetch } = useGetEmployeesQuery();
  const employees = data?.getEmployees;
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      imageURL: imageUrl,
      department: Department.Software,
      jobTitle: [''],
      ladderLevel: '',
      salary: '',
      dateOfEmployment: new Date(),
      employmentStatus: EmploymentStatus.FullTime,
    },
    validationSchema: employeeSchema,
    onSubmit: async (values: EmployeesInfoType) => {
      console.log('employee info', values);
      try {
        await createEmployeeMutation({ variables: { input: values } });
        refetch();
      } catch {
        console.error();
      }
    },
  });
  const fileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const selectedFile = event.target.files[0];
      await uploadHandler(selectedFile);
    }
  };
  const uploadHandler = async (file: File) => {
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: data,
      });
      const resJson = await res.json();
      if (resJson.url) {
        setImageUrl(resJson.url);
        formik.setFieldValue('imageURL', resJson.url);
      }
    }
  };
  const steps = [
    { title: 'Step 1', content: 'Хувийн мэдээлэл' },
    { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
    { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
  ];
  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    await formik.handleSubmit(event);
  };
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const inputOne = [
    { label: 'Овог', type: 'text', name: 'lastname', value: formik.values.lastname, errorMessage: 'Овог оруулна уу' },
    { label: 'Нэр', type: 'text', name: 'firstname', value: formik.values.firstname, errorMessage: 'Нэр оруулна уу' },
    { label: 'И-мэйл', type: 'text', name: 'email', value: formik.values.email, errorMessage: formik.errors.email },
  ];
  const isPersonalInfoInvalid = isValidPersonalInfo(formik.values, formik.errors);
  const isJobInfoInvalid = isValidJobInfo(formik.values);
  const isAdditionalInfoInvalid = isValidAdditionalInfo(formik.values);
  const handleNextStepPI = () => {
    if (!isPersonalInfoInvalid) {
      nextStep();
    }
  };
  const handleNextStepJI = () => {
    if (!isJobInfoInvalid) {
      nextStep();
    }
  };
  const handleSubmitAI = () => {
    if (!isAdditionalInfoInvalid) {
      formik.handleSubmit();
    }
  };
  return (
    <div className="bg-[#F7F7F8] p-8 h-screen">
      <div className="bg-white  rounded-xl  pb-6 flex flex-col justify-between">
        <div data-testid="add-employee" className="flex justify-between py-5 px-6 items-center">
          <h1 className="text-2xl font-bold  ">Ажилчид</h1>
          <AddModal
            firstname={formik.values.firstname}
            lastname={formik.values.lastname}
            email={formik.values.email}
            jobTitle={formik.values.jobTitle}
            ladderLevel={formik.values.ladderLevel}
            salary={formik.values.salary}
            fileChangeHandler={fileChangeHandler}
            onChangeHandler={formik.handleChange}
            onSubmitHandler={handleSubmit}
            setValueFormik={formik.setFieldValue}
            validEmail={formik.errors.email}
            handleNextStepPI={handleNextStepPI}
            prevStep={prevStep}
            currentStep={currentStep}
            steps={steps}
            imageUrl={imageUrl}
            inputOne={inputOne}
            isValidPersonalInfo={isPersonalInfoInvalid}
            handleNextStepJI={handleNextStepJI}
            isValidJobInfo={isJobInfoInvalid}
            handleSubmitAI={handleSubmitAI}
            isValidAdditionalInfo={isAdditionalInfoInvalid}
          />
        </div>
        <div className="pb-6">
          <TableDemo employees={employees as Employee[]} />
        </div>
        <PaginationDemo />
      </div>
    </div>
  );
};
