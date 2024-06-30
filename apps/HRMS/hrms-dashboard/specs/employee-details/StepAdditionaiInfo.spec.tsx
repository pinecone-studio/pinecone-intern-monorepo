import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StepAdditionalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepAdditionaInfo';
import { Department, EmploymentStatus } from '../../src/generated';

describe('Stepper component', () => {
  const mockEmployeesInfo = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    imageURL: '',
    department: Department.Software,
    jobTitle: ['Manager'],
    ladderLevel: '',
    salary: '50000',
    dateOfEmployment: new Date('2023-01-01'),
    employmentStatus: EmploymentStatus.FullTime,
  };

  const mockChangeEmployee = jest.fn();
  const mockCreateData = jest.fn();
  const mockFileChangeHandler = jest.fn();
  const mockImageUrl = 'http://example.com/image.jpg';
  const mockPrevStep = jest.fn();

  it('Should handle setting image URL', async () => {
    render(
      <StepAdditionalInfo
        prevStep={mockPrevStep}
        employeesInfo={mockEmployeesInfo}
        changeEmployee={mockChangeEmployee}
        createData={mockCreateData}
        fileChangeHandler={mockFileChangeHandler}
        imageUrl={mockImageUrl}
      />
    );

    expect(screen.getByTestId('additionalInfo')).toBeInTheDocument();
  });
});
