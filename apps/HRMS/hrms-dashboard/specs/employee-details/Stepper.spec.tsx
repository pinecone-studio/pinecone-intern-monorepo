import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

test('renders Stepper component', () => {
  render(<Stepper />);

  const stepContainer = screen.getByTestId('step-container');
  expect(stepContainer).toBeInTheDocument();

  
  const steps = ['Хувийн мэдээлэл', 'Хөдөлмөр эрхлэлтийн мэдээлэл', 'Нэмэлт мэдээлэл'];

  steps.forEach((step, index) => {
  
    const stepNumber = screen.getByText((index + 1).toString());
    expect(stepNumber).toBeInTheDocument();

    const stepContent = screen.getByText(step);
    expect(stepContent).toBeInTheDocument();
  });
});
 