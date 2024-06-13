import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

describe('Stepper component', () => {
  test('renders without crashing', () => {
    render(<Stepper />);
  });

  test('renders step container', () => {
    render(<Stepper />);
    const stepContainer = screen.getByTestId('step-container');
    expect(stepContainer).toBeTruthy();
  });

  test('renders subcontainer', () => {
    render(<Stepper />);
    const subcontainer = screen.getByTestId('subcontainer');
    expect(subcontainer).toBeTruthy();
  });

  test('renders correct number of steps', () => {
    render(<Stepper />);
    const steps = screen.getAllByTestId('step-number');
    expect(steps.length).toBe(3);
  });

  test('renders step content correctly', () => {
    render(<Stepper />);
    const stepContents = screen.getAllByTestId('step-content');
    expect(stepContents[0].textContent).toBe('Хувийн мэдээлэл');
    expect(stepContents[1].textContent).toBe('Хөдөлмөр эрхлэлтийн мэдээлэл');
    expect(stepContents[2].textContent).toBe('Нэмэлт мэдээлэл');
  });

  test('renders step numbers correctly', () => {
    render(<Stepper />);
    const stepNumbers = screen.getAllByTestId('step-number');
    expect(stepNumbers[0].textContent).toBe('1');
    expect(stepNumbers[1].textContent).toBe('2');
    expect(stepNumbers[2].textContent).toBe('3');
  });

  test('progress bar style is correct for current step', () => {
    render(<Stepper />);
    const progressBar = document.querySelector('[data-testid="step-item-0"]') as HTMLDivElement;
    expect(progressBar).not.toBeNull();
    if (progressBar) {
      expect(progressBar.style.backgroundColor).toBe('');
      expect(progressBar.style.left).toBe('calc(50% + 18px)');
      expect(progressBar.style.width).toBe('calc(100% - 20px)');
    }
  });

  test('step content is rendered correctly', () => {
    render(<Stepper />);
    const stepContent = document.querySelector('[data-testid="step-content"]');
    expect(stepContent).not.toBeNull();
    if (stepContent) {
      expect(stepContent.textContent).toBe('Хувийн мэдээлэл');
    }
  });
});
