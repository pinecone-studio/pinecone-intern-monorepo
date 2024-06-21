import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

const currentStep = 0;
const steps = [
  { title: 'Step 1', content: 'Content 1' },
  { title: 'Step 2', content: 'Content 2' },
  { title: 'Step 3', content: 'Content 3' },
];

describe('Stepper component', () => {
  it('Should renders step container and subcontainer', () => {
    render(<Stepper currentStep={currentStep} steps={steps} />);
    const stepContainer = screen.getByTestId('step-container');

    expect(stepContainer).toBeInTheDocument();
  });
});
