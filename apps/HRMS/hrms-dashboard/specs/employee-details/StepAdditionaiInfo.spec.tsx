import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StepAdditionalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepAdditionaInfo';

describe('Stepper component', () => {
  it('Should renders step container ', () => {
    render(<StepAdditionalInfo />);
    const stepContainer = screen.getByTestId('step-additional-info');

    expect(stepContainer).toBeInTheDocument();
  });
});
