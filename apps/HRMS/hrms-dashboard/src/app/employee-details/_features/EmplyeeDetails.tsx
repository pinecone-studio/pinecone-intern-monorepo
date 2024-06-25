'use client';

import PaginationDemo from '../_components/Pagination';
import { TableDemo } from '../_components/TableBoard';
import { AddEmployee } from '../_components/modal/AddEmployee';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import React from 'react';
import { Department, Employee, EmploymentStatus, useCreateEmployeeMutation, useGetEmployeesQuery } from '@/generated';

const CLOUD_NAME = 'dy39wvdh0';
const UPLOAD_PRESET = 'gxjou9af';

export const EmployeeDetails = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useGetEmployeesQuery();
  const [createEmployeeMutation] = useCreateEmployeeMutation();

  const employees = data?.getEmployees;

  const fileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setFile(event.target.files[0]);
      setLoading(true);

      const data = new FormData();
      data.append('file', event.target.files[0]);
      data.append('upload_preset', UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: data,
      });
      const resJson = await res.json();
      if (resJson.url) {
        formik.setFieldValue('employeeImg', resJson.url);
        setImageUrl(resJson.url);
      }
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      imageURL: imageUrl,
      department: Department.Software,
      jobTitle: [''],
      ladderLevel: '',
      salary: 0,
      dateOfEmployment: new Date(),
      employmentStatus: EmploymentStatus.FullTime,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      imageUrl: Yup.string().required('Upload image'),
      department: Yup.mixed().oneOf(['SOFTWARE', 'DESIGN', 'MARKETING', 'BACK_OFFICE']).required('Department is required'),
      jobTitle: Yup.array().of(Yup.string()).required('Job title is required'),
      salary: Yup.number().min(0, 'Salary must be positive').required('Salary is required'),
      dateOfEmployment: Yup.date().required('Date of employment is required'),
      employmentStatus: Yup.mixed().oneOf(['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'ARCHIVE']).required('Employment status is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form with values:', values);
        createEmployeeMutation({
          variables: {
            input: {
              ...values,
            },
          },
        });
        console.log('Employee created successfully:', data);
        resetForm();
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
  });
  const steps = [
    { title: 'Step 1', content: 'Хувийн мэдээлэл' },
    { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
    { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
  ];

  return (
    <div className="bg-[#F7F7F8] p-8 h-screen">
      <div className="bg-white rounded-xl pb-6 flex flex-col justify-between">
        <AddEmployee
          currentStep={currentStep}
          steps={steps}
          setCurrentStep={setCurrentStep}
          loading={loading}
          firstname={formik.values.firstname}
          lastname={formik.values.lastname}
          email={formik.values.email}
          handleChange={formik.handleChange}
          department={formik.values.department}
          jobTitle={formik.values.jobTitle}
          salary={formik.values.salary}
          employmentStatus={formik.values.employmentStatus}
          ladderLevel={formik.values.ladderLevel}
          hadlesubmit={formik.handleSubmit}
          imageURL={imageUrl}
          fileChangeHandler={fileChangeHandler}
        />
        <div className="pb-6">
          <TableDemo employees={employees as Employee[]} />
        </div>

        <PaginationDemo />
      </div>
    </div>
  );
};
