'use client';

<<<<<<< HEAD
=======
import { Employee, useGetEmployeesQuery } from '@/generated';
>>>>>>> main
import PaginationDemo from '../_components/Pagination';
import { TableDemo } from '../_components/TableBoard';
import { AddEmployee } from '../_components/modal/AddEmployee';
import { useState } from 'react';
import React from 'react';
import { Department, Employee, EmploymentStatus, useCreateEmployeeMutation, useGetEmployeesQuery } from '@/generated';

const CLOUD_NAME = 'dy39wvdh0';
const UPLOAD_PRESET = 'gxjou9af';

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

export const EmployeeDetails = () => {
<<<<<<< HEAD
  const [currentStep, setCurrentStep] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const { data } = useGetEmployeesQuery();
  const [createEmployeeMutation] = useCreateEmployeeMutation();
  const [employeesInfo, setEmployeesInfo] = useState({
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
  });

  const changeEmployee = (values: Partial<EmployeesInfoType>) => {
    setEmployeesInfo((prev) => {
      const updatedInfo = { ...prev, ...values };
      console.log('Updated Employee Info:', updatedInfo);
      return updatedInfo;
    });
  };

  const createData = async () => {
    console.log('Creating Employee with data:', employeesInfo);
    await createEmployeeMutation({ variables: { input: employeesInfo } });
  };

  const employees = data?.getEmployees;

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
      console.log('image', resJson.url);
      if (resJson.url) {
        setImageUrl(resJson.url);
      }
    }
  };

  const steps = [
    { title: 'Step 1', content: 'Хувийн мэдээлэл' },
    { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
    { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
  ];

  const nextStep = async () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

=======
  const { data } = useGetEmployeesQuery();
  const employees = data?.getEmployees;

>>>>>>> main
  return (
    <div className="bg-[#F7F7F8] p-8 h-screen">
      <div className="bg-white rounded-xl pb-6 flex flex-col justify-between">
        <AddEmployee
          currentStep={currentStep}
          steps={steps}
          nextStep={nextStep}
          prevStep={prevStep}
          employeesInfo={employeesInfo}
          changeEmployee={changeEmployee}
          createData={createData}
          fileChangeHandler={fileChangeHandler}
          imageUrl={imageUrl}
        />
        <div className="pb-6">
          <TableDemo employees={employees as Employee[]} />
        </div>
        <PaginationDemo />
      </div>
    </div>
  );
};
