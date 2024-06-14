import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

describe('Stepper component', () => {
  it('Should renders step container and subcontainer', () => {
    render(<Stepper currentStep={1} />);
    const stepContainer = screen.getByTestId('step-container');
    const subcontainer = screen.getByTestId('subcontainer');

    expect(stepContainer).toBeInTheDocument();
    expect(subcontainer).toBeInTheDocument();
  });
});
