import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextAndBackButton } from '../../src/app/employee-details/_components/modal/NextAndBackButton';

const steps = [
  { title: 'Step 1', content: 'Content 1' },
  { title: 'Step 2', content: 'Content 2' },
  { title: 'Step 3', content: 'Content 3' },
];

const WrapperComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return <NextAndBackButton steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />;
};

describe('NextAndBackButton Component', () => {
  it('should render the NextAndBackButton component', () => {
    render(<WrapperComponent />);
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
    expect(screen.getByTestId('body-button')).toBeInTheDocument();
  });
});
