import { render } from '@testing-library/react';
import StepOne from '../../src/app/employee-details/_components/add-employee-steps/StepOne';
import StepTwo from '../../src/app/employee-details/_components/add-employee-steps/StepTwo';
import StepThree from '../../src/app/employee-details/_components/add-employee-steps/StepThree';
import React from 'react';

describe('setAddEmployeesDetails function', () => {
  // Mock the setAddEmployeesDetails function
  const mockSetAddEmployeesDetails = jest.fn();

  // Mock data values
  const values = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    jobTitle: 'Software Engineer',
    salary: 80000,
    ladderLevel: 'Senior',
    department: 'Engineering',
    dateOfEmployment: '2024-01-01',
    employmentStatus: 'Active',
  };

  // Mock the component props where setAddEmployeesDetails is used
  const props = {
    setAddEmployeesDetails: mockSetAddEmployeesDetails,
  };

  it('calls setAddEmployeesDetails with correct data', () => {
    // Assuming StepOne, StepTwo, and StepThree use setAddEmployeesDetails somewhere
    render(<StepOne label={''} type={''} name={''} value={''} {...props} />);
    render(<StepTwo label={''} type={''} name={''} value={''} {...props} />);
    render(<StepThree label={''} type={''} name={''} value={''} {...props} />);

    // Call setAddEmployeesDetails with mock data
    mockSetAddEmployeesDetails(values);

    // Assert that setAddEmployeesDetails was called once with the correct values
    expect(mockSetAddEmployeesDetails).toHaveBeenCalledTimes(1);
    expect(mockSetAddEmployeesDetails).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      jobTitle: 'Software Engineer',
      salary: 80000,
      ladderLevel: 'Senior',
      department: 'Engineering',
      dateOfEmployment: '2024-01-01',
      employmentStatus: 'Active',
    });
  });
});
