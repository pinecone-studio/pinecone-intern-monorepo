import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

const steps = [
  { title: 'Step 1', content: 'Content 1' },
  { title: 'Step 2', content: 'Content 2' },
  { title: 'Step 3', content: 'Content 3' },
];

describe('Stepper component', () => {
  it('Should render step container and subcontainer', () => {
    render(<Stepper currentStep={0} steps={steps} />);
    const stepContainer = screen.getByTestId('step-container');
    const subcontainer = screen.getByTestId('subcontainer');

    expect(stepContainer).toBeInTheDocument();
    expect(subcontainer).toBeInTheDocument();
  });

  it('Should render the step item with correct styles based on currentStep prop', () => {
    render(<Stepper currentStep={1} steps={steps} />);
    const stepItem = screen.getAllByTestId('step-item-0');

    expect(stepItem[0]).toHaveClass('absolute top-1/2 transform -translate-y-1/2 h-1');
  });
});
