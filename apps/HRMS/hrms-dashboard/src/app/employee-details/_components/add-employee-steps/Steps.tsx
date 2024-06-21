'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { inputOne, inputThree, inputTwo } from '../../constants';

// import { useFormik } from 'formik';
// import { StepOne } from './StepOne';
// import { StepTwo } from './StepTwo';
// import { StepThree } from './StepThree';
// import { inputOne, inputTwo, inputThree } from '../../constants';

export const Steps = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '' as string,
  //     lastName: '' as string,
  //     email: '' as string,
  //     jobTitle: '' as string,
  //     salary: 0,
  //     ladderLevel: '' as string,
  //     department: '' as string,
  //     dateOfEmployment: '' as string,
  //     employmentStatus: '' as string,
  //   },
  //   onSubmit: async () => {},
  // });

  // const generateFormikProps = (name: keyof typeof formik.values) => ({
  //   name: name,
  //   value: formik.values[name],
  //   error: Boolean(formik.errors[name]),
  //   helperText: formik.errors[name],
  //   onChange: formik.handleChange,
  //   onBlur: formik.handleBlur,
  // });

  return (
    <div>
      {/* <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {inputOne.map((item, index) => (
          <StepOne key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ))}
        {inputTwo.map((item, index) => (
          <StepTwo key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ))}
        {inputThree.map((item, index) => (
          <StepThree key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ))}
        <button data-testid="create-employee-test-id" name="submitBtn" className="bg-green-600">
          Submit
        </button>
      </form> */}
      {inputOne.map((item, index) => (
        <div key={index}>
          <label>{item.label}</label>
          <Input type={item.type} placeholder={item.placeholder} name={item.name} value="" />
        </div>
      ))}
      {inputTwo.map((item, index) => (
        <div key={index}>
          <label>{item.label}</label>
          <Input type={item.type} placeholder={item.placeholder} name={item.name} value="" />
        </div>
      ))}
      {inputThree.map((item, index) => (
        <div key={index}>
          <label>{item.label}</label>
          <Input type={item.type} placeholder={item.placeholder} name={item.name} value="" />
        </div>
      ))}
    </div>
  );
};
