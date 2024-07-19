import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepAdditionalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepAdditionaInfo';

describe('StepAdditionalInfo Component', () => {
  const mockFileChangeHandler = jest.fn();
  const mockOnChangeHandler = jest.fn();
  const mockOnSubmitHandler = jest.fn();
  const mockPrevStep = jest.fn();

  const renderComponent = (props) => render(<StepAdditionalInfo {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    renderComponent({
      ladderLevel: '',
      fileChangeHandler: mockFileChangeHandler,
      onChangeHandler: mockOnChangeHandler,
      prevStep: mockPrevStep,
      imageUrl: '',
      handleSubmitAI: mockOnSubmitHandler,
      isValidAdditionalInfo: false,
    });

    expect(screen.getByTestId('additional-info')).toBeInTheDocument();
  });

  test('button has correct class when isValidAdditionalInfo is false', () => {
    renderComponent({
      ladderLevel: '',
      fileChangeHandler: mockFileChangeHandler,
      onChangeHandler: mockOnChangeHandler,
      prevStep: mockPrevStep,
      imageUrl: '',
      handleSubmitAI: mockOnSubmitHandler,
      isValidAdditionalInfo: false,
    });

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveClass('opacity-100');
  });

  test('button has correct class when isValidAdditionalInfo is true', () => {
    renderComponent({
      ladderLevel: '',
      fileChangeHandler: mockFileChangeHandler,
      onChangeHandler: mockOnChangeHandler,
      prevStep: mockPrevStep,
      imageUrl: '',
      handleSubmitAI: mockOnSubmitHandler,
      isValidAdditionalInfo: true,
    });

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveClass('opacity-50');
  });
});
