'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { Stepper } from './Stepper';
import { useState } from 'react';
import { NextAndBackButton } from './NextAndBackButton';
import { StepPersonalInfo } from '../add-employee-steps/StepPersonaInfo';
import { StepJobInfo } from '../add-employee-steps/StepJobInfo';
import { StepAdditionalInfo } from '../add-employee-steps/StepAdditionaInfo';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      firstname
      lastname
      email
      department
      jobTitle
      salary
    }
  }
`;

export const AddModal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE_MUTATION);

  const steps = [
    { title: 'Step 1', content: 'Хувийн мэдээлэл' },
    { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
    { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
  ];

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      imageURL: '',
      department: 'SOFTWARE',
      jobTitle: [],
      ladderLevel: '',
      salary: 0,
      dateOfEmployment: new Date(),
      employmentStatus: 'FULL_TIME',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      department: Yup.mixed().oneOf(['SOFTWARE', 'DESIGN', 'MARKETING', 'BACK_OFFICE']).required('Department is required'),
      jobTitle: Yup.array().of(Yup.string()).required('Job title is required'),
      salary: Yup.number().min(0, 'Salary must be positive').required('Salary is required'),
      dateOfEmployment: Yup.date().required('Date of employment is required'),
      employmentStatus: Yup.mixed().oneOf(['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'ARCHIVE']).required('Employment status is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form with values:', values);
        const { data } = await createEmployee({ variables: { input: values } });
        console.log('Employee created successfully:', data);
        resetForm();
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="addEmployeeBtn" variant={'secondary'} className="bg-[#F7F7F8] text-[#121316] hover:bg-gray-200 duration-600 ease-in-out h-9 px-4 py-2 ">
          <MdOutlineAdd data-testid="add-icon" className="w-5 h-5" />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modalContent" className="flex gap-10 flex-col sm:max-w-[620px] px-8">
        <DialogHeader>
          <DialogTitle data-testid="title">Ажилтан нэмэх</DialogTitle>

          <DialogDescription></DialogDescription>
          <Stepper currentStep={currentStep} steps={steps} />
          {currentStep == 0 && <StepPersonalInfo firstname={formik.values.firstname} lastname={formik.values.lastname} email={formik.values.email} handleChange={formik.handleChange} />}
          {currentStep == 1 && (
            <StepJobInfo
              department={formik.values.department}
              jobTitle={formik.values.jobTitle}
              salary={formik.values.salary}
              employmentStatus={formik.values.employmentStatus}
              handleChange={formik.handleChange}
            />
          )}
          {currentStep == 2 && <StepAdditionalInfo ladderLevel={formik.values.ladderLevel} handleChange={formik.handleChange} />}
          {loading && <p>Loading...</p>}
        </DialogHeader>
        <DialogFooter></DialogFooter>
        <NextAndBackButton steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} handleSubmit={formik.handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};
