import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepPersonalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepPersonaInfo';

describe('StepPersonalInfo', () => {
  const mockOnChangeHandler = jest.fn();
  const mockNextStep = jest.fn();
  const inputOne = [
    { label: 'First Name', type: 'text', name: 'firstname', value: '', errorMessage: 'First name is required' },
    { label: 'Last Name', type: 'text', name: 'lastname', value: '', errorMessage: 'Last name is required' },
    { label: 'Email', type: 'email', name: 'email', value: '', errorMessage: 'Email is required' },
  ];

  it('renders correctly', () => {
    render(
      <StepPersonalInfo onChangeHandler={mockOnChangeHandler} nextStep={mockNextStep} inputOne={inputOne} isValidPersonalInfo={false} firstname={''} lastname={''} email={''} validEmail={undefined} />
    );

    expect(screen.getByTestId('personal-info')).toBeInTheDocument();
    expect(screen.getByTestId('step-personal-info')).toBeInTheDocument();
    inputOne.forEach((input) => {
      expect(screen.getByLabelText(input.label)).toBeInTheDocument();
    });
  });

  it('calls onChangeHandler when input value changes', () => {
    render(
      <StepPersonalInfo onChangeHandler={mockOnChangeHandler} nextStep={mockNextStep} inputOne={inputOne} isValidPersonalInfo={false} firstname={''} lastname={''} email={''} validEmail={undefined} />
    );

    const firstnameInput = screen.getByTestId('firstname');
    fireEvent.change(firstnameInput, { target: { value: 'John' } });

    expect(mockOnChangeHandler).toHaveBeenCalled();
  });

  it('calls nextStep when button is clicked', () => {
    render(
      <StepPersonalInfo onChangeHandler={mockOnChangeHandler} nextStep={mockNextStep} inputOne={inputOne} isValidPersonalInfo={false} firstname={''} lastname={''} email={''} validEmail={undefined} />
    );

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    expect(mockNextStep).toHaveBeenCalled();
  });

  it('disables button when isValidPersonalInfo is true', () => {
    render(
      <StepPersonalInfo onChangeHandler={mockOnChangeHandler} nextStep={mockNextStep} inputOne={inputOne} isValidPersonalInfo={true} firstname={''} lastname={''} email={''} validEmail={undefined} />
    );

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toBeDisabled();
  });

  it('enables button when isValidPersonalInfo is false', () => {
    render(
      <StepPersonalInfo onChangeHandler={mockOnChangeHandler} nextStep={mockNextStep} inputOne={inputOne} isValidPersonalInfo={false} firstname={''} lastname={''} email={''} validEmail={undefined} />
    );

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).not.toBeDisabled();
  });
});
