import React from 'react';
import { render } from '@testing-library/react';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

describe('Stepper component', () => {
  test('renders without crashing', () => {
    render(<Stepper />);
  });

  test('renders step container', () => {
    const { getByTestId } = render(<Stepper />);
    const stepContainer = getByTestId('step-container');
    expect(stepContainer).toBeTruthy();
  });

  test('renders subcontainer', () => {
    const { getByTestId } = render(<Stepper />);
    const subcontainer = getByTestId('subcontainer');
    expect(subcontainer).toBeTruthy();
  });

  test('renders correct number of steps', () => {
    const { getAllByTestId } = render(<Stepper />);
    const steps = getAllByTestId('step-number');
    expect(steps.length).toBe(3); // Assuming each step has a data-testid="step-number"
  });

  test('renders step content correctly', () => {
    const { getByText } = render(<Stepper />);
    expect(getByText('Хувийн мэдээлэл')).toBeTruthy();
    expect(getByText('Хөдөлмөр эрхлэлтийн мэдээлэл')).toBeTruthy();
    expect(getByText('Нэмэлт мэдээлэл')).toBeTruthy();
  });

  test('renders step numbers correctly', () => {
    const { getAllByText } = render(<Stepper />);
    expect(getAllByText(/[1-3]/).length).toBe(3);
  });

  test('step numbers are within range', () => {
    const { getAllByText } = render(<Stepper />);
    const stepNumbers = getAllByText(/[1-3]/);
    stepNumbers.forEach((stepNumber) => {
      const number = Number(stepNumber.textContent);
      expect(number >= 1 && number <= 3).toBe(true);
    });
  });

  test('step content is correct', () => {
    const { getByText } = render(<Stepper />);
    const step1Content = getByText('Хувийн мэдээлэл');
    const step2Content = getByText('Хөдөлмөр эрхлэлтийн мэдээлэл');
    const step3Content = getByText('Нэмэлт мэдээлэл');
    expect(step1Content.textContent).toBe('Хувийн мэдээлэл');
    expect(step2Content.textContent).toBe('Хөдөлмөр эрхлэлтийн мэдээлэл');
    expect(step3Content.textContent).toBe('Нэмэлт мэдээлэл');
  });

  test('step styles are applied correctly', () => {
    const { getAllByTestId } = render(<Stepper />);
    const stepItems = getAllByTestId('step-item'); // Assuming each step item has a data-testid="step-item"
    stepItems.forEach((stepItem, index) => {
      const expectedClass = index === 0 ? 'bg-[#121316] text-white' : 'bg-[#ECEDF0] text-black';
      expect(stepItem.className).toContain(expectedClass);
    });
  });
});
