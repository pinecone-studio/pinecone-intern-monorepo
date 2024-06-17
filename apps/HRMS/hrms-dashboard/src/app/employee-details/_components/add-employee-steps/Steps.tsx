'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { initialAddEmployeesInfo } from './AddEomlpoyeesValidation';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { inputOne, inputThree, inputTwo } from '../../constants';

export const Steps = () => {
  const [addEmployeesDetails, setAddEmployeesDetails] = useState(initialAddEmployeesInfo);
  console.log('addEmployeesDetails', addEmployeesDetails);
  const formik = useFormik({
    initialValues: initialAddEmployeesInfo,
    // validationSchema: addEmployeeSchema,
    onSubmit: (values) => {
      setAddEmployeesDetails({
        firstName: values.firstName as string,
        lastName: values.lastName as string,
        email: values.email as string,
        jobTitle: values.jobTitle as string,
        salary: values.salary as number,
        ladderLevel: values.ladderLevel as string,
        department: values.department as string,
        dateOfEmployment: values.dateOfEmployment as string,
        employmentStatus: values.employmentStatus as string,
      });
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
    <>
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

        <button className=" bg-green-600">Submit</button>
      </form>
    </>
  );
};
