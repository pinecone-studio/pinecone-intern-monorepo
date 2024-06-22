import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StepJobInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepJobInfo';

describe('Stepper component', () => {
  it('Should renders step container ', () => {
    render(<StepJobInfo />);
    const stepContainer = screen.getByTestId('step-job-info');

    expect(stepContainer).toBeInTheDocument();
  });
});
