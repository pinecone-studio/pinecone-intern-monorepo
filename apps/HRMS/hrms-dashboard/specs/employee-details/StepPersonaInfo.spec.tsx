import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StepPersonalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepPersonaInfo';
import { Department, EmploymentStatus } from '../../src/generated';

describe('Stepper component', () => {
  it('Should render step container', () => {
    const mockNextStep = jest.fn();
    const mockChangeEmployee = jest.fn();
    const mockEmployeesInfo = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      imageURL: '',
      department: Department.Software,
      jobTitle: ['Developer'],
      ladderLevel: '1',
      salary: '50000',
      dateOfEmployment: new Date(),
      employmentStatus: EmploymentStatus.FullTime,
    };

    render(<StepPersonalInfo nextStep={mockNextStep} employeesInfo={mockEmployeesInfo} changeEmployee={mockChangeEmployee} />);

    const stepContainer = screen.getByTestId('step-personal-info');

    expect(stepContainer).toBeInTheDocument();
  });
});
