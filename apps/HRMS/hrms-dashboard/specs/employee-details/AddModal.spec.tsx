import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddModal } from '../../src/app/employee-details/_components/modal/AddModal';
import React from 'react';

jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepPersonaInfo', () => ({
  StepPersonalInfo: jest.fn(({ nextStep }) => <div onClick={nextStep}>StepPersonalInfo Component</div>),
}));
jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepJobInfo', () => ({
  StepJobInfo: jest.fn(({ nextStep }) => <div onClick={nextStep}>StepJobInfo Component</div>),
}));
jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepAdditionaInfo', () => ({
  StepAdditionalInfo: jest.fn(({ handleSubmitAI }) => <div onClick={handleSubmitAI}>StepAdditionalInfo Component</div>),
}));

describe('AddModal Component', () => {
  const defaultProps = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    jobTitle: ['Developer'],
    ladderLevel: 'L1',
    salary: '100000',
    fileChangeHandler: jest.fn(),
    onChangeHandler: jest.fn(),
    onSubmitHandler: jest.fn(),
    setValueFormik: jest.fn(),
    validEmail: 'valid@example.com',
    handleNextStepPI: jest.fn(),
    prevStep: jest.fn(),
    currentStep: 0,
    steps: [
      { title: 'Step 1', content: 'Content 1' },
      { title: 'Step 2', content: 'Content 2' },
      { title: 'Step 3', content: 'Content 3' },
    ],
    imageUrl: '',
    isModalOpen: true,
    handleOpenModal: jest.fn(),
    inputOne: [{ label: 'First Name', type: 'text', name: 'firstname', value: 'John', errorMessage: '' }],
    isValidPersonalInfo: true,
    handleNextStepJI: jest.fn(),
    handleSubmitAI: jest.fn(),
    isValidJobInfo: true,
    isValidAdditionalInfo: true,
  };

  it('renders the AddModal component correctly', () => {
    render(<AddModal {...defaultProps} />);

    expect(screen.getByTestId('modalContent')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent('Ажилтан нэмэх');

    expect(screen.getByText('StepPersonalInfo Component')).toBeInTheDocument();
  });

  it('renders the correct step component based on currentStep', () => {
    const { rerender } = render(<AddModal {...defaultProps} currentStep={0} />);
    expect(screen.getByText('StepPersonalInfo Component')).toBeInTheDocument();

    rerender(<AddModal {...defaultProps} currentStep={1} />);
    expect(screen.getByText('StepJobInfo Component')).toBeInTheDocument();

    rerender(<AddModal {...defaultProps} currentStep={2} />);
    expect(screen.getByText('StepAdditionalInfo Component')).toBeInTheDocument();
  });

  it('calls handleOpenModal when the button is clicked', () => {
    render(<AddModal {...defaultProps} isModalOpen={false} />);
    const button = screen.getByTestId('addEmployeeBtn');
    fireEvent.click(button);
    expect(defaultProps.handleOpenModal).toHaveBeenCalled();
  });

  it('calls handleNextStepPI when nextStep is triggered in StepPersonalInfo', () => {
    render(<AddModal {...defaultProps} currentStep={0} />);
    fireEvent.click(screen.getByText('StepPersonalInfo Component'));
    expect(defaultProps.handleNextStepPI).toHaveBeenCalled();
  });

  it('calls handleNextStepJI when nextStep is triggered in StepJobInfo', () => {
    render(<AddModal {...defaultProps} currentStep={1} />);
    fireEvent.click(screen.getByText('StepJobInfo Component'));
    expect(defaultProps.handleNextStepJI).toHaveBeenCalled();
  });

  it('calls handleSubmitAI when handleSubmitAI is triggered in StepAdditionalInfo', () => {
    render(<AddModal {...defaultProps} currentStep={2} />);
    fireEvent.click(screen.getByText('StepAdditionalInfo Component'));
    expect(defaultProps.handleSubmitAI).toHaveBeenCalled();
  });
});
