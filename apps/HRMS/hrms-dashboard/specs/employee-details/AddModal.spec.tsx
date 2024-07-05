import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddModal } from '../../src/app/employee-details/_components/modal/AddModal';
import { Department, EmploymentStatus } from '../../src/generated';

// Mock the imported StepPersonalInfo and StepJobInfo components
jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepPersonaInfo', () => ({
  StepPersonalInfo: ({ nextStep }) => (
    <div>
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepJobInfo', () => ({
  StepJobInfo: ({ nextStep, prevStep }) => (
    <div>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  ),
}));

// Mock the imported StepAdditionalInfo component
jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepAdditionaInfo', () => ({
  StepAdditionalInfo: ({ prevStep, createData, fileChangeHandler }) => (
    <div>
      <button onClick={prevStep}>Back</button>
      <button onClick={createData}>Create</button>
      <input type="file" aria-label="Upload" onChange={fileChangeHandler} />
    </div>
  ),
}));

const mockChangeEmployee = jest.fn();
const mockCreateData = jest.fn();
const mockFileChangeHandler = jest.fn();
const mockNextStep = jest.fn();
const mockPrevStep = jest.fn();

const defaultProps = {
  currentStep: 0,
  steps: [
    { title: 'Personal Info', content: 'Step 1' },
    { title: 'Job Info', content: 'Step 2' },
    { title: 'Additional Info', content: 'Step 3' },
  ],
  nextStep: mockNextStep,
  prevStep: mockPrevStep,
  employeesInfo: {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    imageURL: '',
    department: Department.Software,
    jobTitle: ['Developer'],
    ladderLevel: 'Level 1',
    salary: '5000',
    dateOfEmployment: new Date(),
    employmentStatus: EmploymentStatus.FullTime,
  },
  changeEmployee: mockChangeEmployee,
  createData: mockCreateData,
  fileChangeHandler: mockFileChangeHandler,
  imageUrl: '',
};

describe('AddModal', () => {
  it('renders without crashing', () => {
    render(<AddModal {...defaultProps} />);
    expect(screen.getByTestId('addEmployeeBtn')).toBeInTheDocument();
  });

  it('opens the modal when the button is clicked', () => {
    render(<AddModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    expect(screen.getByTestId('modalContent')).toBeInTheDocument();
  });

  it('renders the title correctly', () => {
    render(<AddModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    expect(screen.getByTestId('title')).toHaveTextContent('Ажилтан нэмэх');
  });

  it('renders StepPersonalInfo when currentStep is 0', () => {
    render(<AddModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    expect(screen.getByTestId('StepPersonalInfo')).toBeInTheDocument();
  });

  it('renders StepJobInfo when currentStep is 1', () => {
    render(<AddModal {...defaultProps} currentStep={1} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    expect(screen.getByTestId('StepJobInfo')).toBeInTheDocument();
  });

  it('renders StepAdditionalInfo when currentStep is 2', () => {
    render(<AddModal {...defaultProps} currentStep={2} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    expect(screen.getByTestId('StepAdditionalInfo')).toBeInTheDocument();
  });

  it('calls nextStep when next button is clicked in StepPersonalInfo', () => {
    render(<AddModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    fireEvent.click(screen.getByText('Next'));
    expect(mockNextStep).toHaveBeenCalled();
  });

  it('calls prevStep when back button is clicked in StepJobInfo', () => {
    render(<AddModal {...defaultProps} currentStep={1} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    fireEvent.click(screen.getByText('Back'));
    expect(mockPrevStep).toHaveBeenCalled();
  });

  it('calls createData when create button is clicked in StepAdditionalInfo', () => {
    render(<AddModal {...defaultProps} currentStep={2} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    fireEvent.click(screen.getByText('Create'));
    expect(mockCreateData).toHaveBeenCalled();
  });

  it('calls fileChangeHandler when file input changes in StepAdditionalInfo', () => {
    render(<AddModal {...defaultProps} currentStep={2} />);
    fireEvent.click(screen.getByTestId('addEmployeeBtn'));
    const fileInput = screen.getByLabelText('Upload');
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockFileChangeHandler).toHaveBeenCalledWith(expect.any(Object));
  });
});
