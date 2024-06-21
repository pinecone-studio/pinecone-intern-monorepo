import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextAndBackButton } from '../../src/app/employee-details/_components/modal/NextAndBackButton';

const steps = [
  { title: 'Step 1', content: 'Хувийн мэдээлэл' },
  { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
  { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
];

const WrapperComponent = ({ initialStep }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  return (
    <>
      <NextAndBackButton steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div data-testid={`step-content-${currentStep}`}>{steps[currentStep].content}</div>
    </>
  );
};

test('NextAndBackButton component transitions correctly and renders appropriate content', () => {
  render(<WrapperComponent initialStep={0} />);

  expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
  expect(screen.getByText('Хувийн мэдээлэл')).toBeInTheDocument();
  expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId('next-button'));
  expect(screen.getByTestId('step-content-1')).toBeInTheDocument();
  expect(screen.getByText('Хөдөлмөр эрхлэлтийн мэдээлэл')).toBeInTheDocument();
  expect(screen.getByTestId('prev-button')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('next-button'));
  expect(screen.getByTestId('step-content-2')).toBeInTheDocument();
  expect(screen.getByText('Нэмэлт мэдээлэл')).toBeInTheDocument();
  expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
  expect(screen.getByText('Илгээх')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('prev-button'));
  expect(screen.getByTestId('step-content-1')).toBeInTheDocument();
  expect(screen.getByText('Хөдөлмөр эрхлэлтийн мэдээлэл')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('prev-button'));
  expect(screen.getByTestId('step-content-0')).toBeInTheDocument();
  expect(screen.getByText('Хувийн мэдээлэл')).toBeInTheDocument();
  expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
});
