import React from 'react';
import { render } from '@testing-library/react';
import { Stepper } from '../../src/app/student/_components/Stepper';

describe('StepperComponent', () => {
  it('Renders the Stepper component with default props', () => {
    render(<Stepper currentStep={0} numberOfSteps={3} />);
    render(<Stepper currentStep={1} numberOfSteps={3} />);
    render(<Stepper currentStep={2} numberOfSteps={3} />);
  });
});
