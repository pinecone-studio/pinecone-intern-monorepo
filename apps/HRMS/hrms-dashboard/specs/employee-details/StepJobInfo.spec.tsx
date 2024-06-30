import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StepJobInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepJobInfo';
import { Department, EmploymentStatus } from '../../src/generated';

describe('Stepper component', () => {
  it('Should render step container', () => {
    const mockNextStep = jest.fn();
    const mockPrevStep = jest.fn();
    const mockChangeEmployee = jest.fn();

    const mockEmployeeInfo = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      imageURL: 'http://example.com/john.jpg',
      department: Department.Software,
      jobTitle: ['Developer'],
      ladderLevel: 'Level 1',
      salary: '50000',
      dateOfEmployment: new Date('2020-01-01'),
      employmentStatus: EmploymentStatus.FullTime,
    };

    render(<StepJobInfo nextStep={mockNextStep} prevStep={mockPrevStep} employeesInfo={mockEmployeeInfo} changeEmployee={mockChangeEmployee} />);

    const stepContainer = screen.getByTestId('step-job-info');

    expect(stepContainer).toBeInTheDocument();
  });
});
