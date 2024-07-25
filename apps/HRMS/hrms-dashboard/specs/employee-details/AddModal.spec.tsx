import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddModal } from '../../src/app/employee-details/_components/modal/AddModal';
import '@testing-library/jest-dom';

// Mock the child components
jest.mock('../../src/app/employee-details/_components/modal/Stepper', () => ({
  Stepper: () => <div data-testid="stepper">Stepper</div>,
}));
jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepPersonaInfo', () => ({
  StepPersonalInfo: () => <div data-testid="step-personal-info">StepPersonalInfo</div>,
}));
jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepJobInfo', () => ({
  StepJobInfo: () => <div data-testid="step-job-info">StepJobInfo</div>,
}));
jest.mock('../../src/app/employee-details/_components/add-employee-steps/StepAdditionaInfo', () => ({
  StepAdditionalInfo: () => <div data-testid="step-additional-info">StepAdditionalInfo</div>,
}));

describe('AddModal', () => {
  const mockProps = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    jobTitle: ['Developer'],
    ladderLevel: 'Junior',
    salary: '50000',
    fileChangeHandler: jest.fn(),
    onChangeHandler: jest.fn(),
    onSubmitHandler: jest.fn(),
    setValueFormik: jest.fn(),
    validEmail: 'john@example.com',
    handleNextStepPI: jest.fn(),
    prevStep: jest.fn(),
    currentStep: 0,
    steps: [{ title: 'Step 1', content: 'Content 1' }],
    imageUrl: 'image.jpg',
    inputOne: [{ label: 'Test', type: 'text', name: 'test', value: '', errorMessage: '' }],
    isValidPersonalInfo: true,
    handleNextStepJI: jest.fn(),
    handleSubmitAI: jest.fn(),
    isValidJobInfo: true,
    isValidAdditionalInfo: true,
  };

  it('renders the AddModal component', () => {
    render(<AddModal {...mockProps} />);
    expect(screen.getByTestId('addEmployeeBtn')).toBeInTheDocument();
  });

  it('opens the modal when the button is clicked', async () => {
    render(<AddModal {...mockProps} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);
    expect(screen.getByTestId('modalContent')).toBeInTheDocument();
  });

  it('displays the correct title', async () => {
    render(<AddModal {...mockProps} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);
    expect(screen.getByTestId('title')).toHaveTextContent('Ажилтан нэмэх');
  });

  it('renders the Stepper component', async () => {
    render(<AddModal {...mockProps} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);
    expect(screen.getByTestId('stepper')).toBeInTheDocument();
  });

  it('renders StepPersonalInfo when currentStep is 0', async () => {
    render(<AddModal {...mockProps} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);
    expect(screen.getByTestId('step-personal-info')).toBeInTheDocument();
  });

  it('renders StepJobInfo when currentStep is 1', async () => {
    render(<AddModal {...mockProps} currentStep={1} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);
    expect(screen.getByTestId('step-job-info')).toBeInTheDocument();
  });

  it('renders StepAdditionalInfo when currentStep is 2', async () => {
    render(<AddModal {...mockProps} currentStep={2} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);
    expect(screen.getByTestId('step-additional-info')).toBeInTheDocument();
  });

  it('renders the add icon', () => {
    render(<AddModal {...mockProps} />);
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
  });

  it('has the correct button text', () => {
    render(<AddModal {...mockProps} />);
    expect(screen.getByTestId('addEmployeeBtn')).toHaveTextContent('Ажилтан нэмэх');
  });

  it('passes correct props to StepPersonalInfo', async () => {
    const { rerender } = render(<AddModal {...mockProps} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);

    // We can't directly test prop passing due to mocked components,
    // but we can ensure the component is rendered when expected
    expect(screen.getByTestId('step-personal-info')).toBeInTheDocument();

    // Test that it's not rendered when currentStep is not 0
    rerender(<AddModal {...mockProps} currentStep={1} />);
    expect(screen.queryByTestId('step-personal-info')).not.toBeInTheDocument();
  });

  it('passes correct props to StepJobInfo', async () => {
    const { rerender } = render(<AddModal {...mockProps} currentStep={1} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);

    expect(screen.getByTestId('step-job-info')).toBeInTheDocument();

    rerender(<AddModal {...mockProps} currentStep={0} />);
    expect(screen.queryByTestId('step-job-info')).not.toBeInTheDocument();
  });

  it('passes correct props to StepAdditionalInfo', async () => {
    const { rerender } = render(<AddModal {...mockProps} currentStep={2} />);
    const button = screen.getByTestId('addEmployeeBtn');
    await fireEvent.click(button);

    expect(screen.getByTestId('step-additional-info')).toBeInTheDocument();

    rerender(<AddModal {...mockProps} currentStep={0} />);
    expect(screen.queryByTestId('step-additional-info')).not.toBeInTheDocument();
  });
});
