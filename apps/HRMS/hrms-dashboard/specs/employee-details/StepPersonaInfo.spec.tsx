import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StepPersonalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepPersonaInfo';

describe('Stepper component', () => {
  it('Should renders step container ', () => {
    render(<StepPersonalInfo />);
    const stepContainer = screen.getByTestId('step-personal-info');

    expect(stepContainer).toBeInTheDocument();
  });
});
