'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { inputOne, inputTwo, inputThree } from '../../constants';

export const Steps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [addEmployeesDetails, setAddEmployeesDetails] = useState({});
  console.log('addEmployeesDetails', addEmployeesDetails);
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
      setAddEmployeesDetails(values);

      console.log('Form submitted with:', values);
    },
    // validationSchema: addEmployeeSchema,
  });

  const generateFormikProps = (name: keyof typeof formik.values) => ({
    name: name,
    value: formik.values[name],
    error: Boolean(formik.errors[name]),
    helperText: formik.errors[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return inputOne.map((item, index) => (
          <StepOne key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ));
      case 1:
        return inputTwo.map((item, index) => (
          <StepTwo key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ));
      case 2:
        return inputThree.map((item, index) => (
          <StepThree key={index} label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
        ));
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {renderStep()}

        {/* Navigation buttons */}
        {currentStep > 0 && (
          <button type="button" onClick={prevStep}>
            Previous
          </button>
        )}
        {currentStep < 2 ? (
          <button type="button" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button type="submit" className="bg-green-600">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};
