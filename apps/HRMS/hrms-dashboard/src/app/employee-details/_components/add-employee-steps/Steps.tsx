'use client';
import React from 'react';
import { useFormik } from 'formik';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { inputOne, inputTwo, inputThree } from '../../constants';

export const Steps = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      salary: 0,
      ladderLevel: '',
      department: '',
      dateOfEmployment: '',
      employmentStatus: '',
    },
    onSubmit: (values) => {
      console.log('Values:', values);
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
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {inputOne.map((item, index) => (
          <StepOne key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ))}
        {inputTwo.map((item, index) => (
          <StepTwo key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ))}
        {inputThree.map((item, index) => (
          <StepThree key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ))}
        <button
          data-testid="create-employee-test-id"
          name="submitBtn"
          onClick={() => {
            formik.handleSubmit();
          }}
          className="bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
