import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddModal } from '../../src/app/employee-details/_components/modal/AddModal';
import '@testing-library/jest-dom';
import { Department, EmploymentStatus } from '../../src/generated';

// eslint-disable-next-line react/display-name
jest.mock('../add-employee-steps/StepPersonalInfo', () => () => <div data-testid="StepPersonalInfo">StepPersonalInfo</div>);
// eslint-disable-next-line react/display-name
jest.mock('../add-employee-steps/StepJobInfo', () => () => <div data-testid="StepJobInfo">StepJobInfo</div>);
// eslint-disable-next-line react/display-name
jest.mock('../add-employee-steps/StepAdditionalInfo', () => () => <div data-testid="StepAdditionalInfo">StepAdditionalInfo</div>);

describe('AddModal', () => {
  const mockSteps = [
    { title: 'Personal Info', content: 'Step 1 content' },
    { title: 'Job Info', content: 'Step 2 content' },
    { title: 'Additional Info', content: 'Step 3 content' },
  ];

  const mockEmployeeInfo = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    imageURL: 'http://example.com/image.jpg',
    department: Department.Software,
    jobTitle: ['Manager'],
    ladderLevel: 'Level 1',
    salary: '50000',
    dateOfEmployment: new Date(),
    employmentStatus: EmploymentStatus.FullTime,
  };

  const mockNextStep = jest.fn();
  const mockPrevStep = jest.fn();
  const mockChangeEmployee = jest.fn();
  const mockCreateData = jest.fn();
  const mockFileChangeHandler = jest.fn();
  const mockImageUrl = 'http://example.com/image.jpg';

  test('renders all steps correctly', () => {
    render(
      <AddModal
        currentStep={0}
        steps={mockSteps}
        nextStep={mockNextStep}
        prevStep={mockPrevStep}
        employeesInfo={mockEmployeeInfo}
        changeEmployee={mockChangeEmployee}
        createData={mockCreateData}
        fileChangeHandler={mockFileChangeHandler}
        imageUrl={mockImageUrl}
      />
    );

    expect(screen.getByTestId('StepPersonalInfo')).toBeInTheDocument();
    expect(screen.queryByTestId('StepJobInfo')).toBeNull();
    expect(screen.queryByTestId('StepAdditionalInfo')).toBeNull();

    render(
      <AddModal
        currentStep={1}
        steps={mockSteps}
        nextStep={mockNextStep}
        prevStep={mockPrevStep}
        employeesInfo={mockEmployeeInfo}
        changeEmployee={mockChangeEmployee}
        createData={mockCreateData}
        fileChangeHandler={mockFileChangeHandler}
        imageUrl={mockImageUrl}
      />
    );

    expect(screen.queryByTestId('StepPersonalInfo')).toBeNull();
    expect(screen.getByTestId('StepJobInfo')).toBeInTheDocument();
    expect(screen.queryByTestId('StepAdditionalInfo')).toBeNull();

    render(
      <AddModal
        currentStep={2}
        steps={mockSteps}
        nextStep={mockNextStep}
        prevStep={mockPrevStep}
        employeesInfo={mockEmployeeInfo}
        changeEmployee={mockChangeEmployee}
        createData={mockCreateData}
        fileChangeHandler={mockFileChangeHandler}
        imageUrl={mockImageUrl}
      />
    );

    expect(screen.queryByTestId('StepPersonalInfo')).toBeNull();
    expect(screen.queryByTestId('StepJobInfo')).toBeNull();
    expect(screen.getByTestId('StepAdditionalInfo')).toBeInTheDocument();
  });
});
