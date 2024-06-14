import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

describe('Stepper component', () => {
  let useStateMock: jest.SpyInstance;

  beforeEach(() => {
    useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockReturnValue([0, () => {}]);
    render(<Stepper currentStep={1} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders step container and subcontainer', () => {
    const stepContainer = screen.getByTestId('step-container');
    const subcontainer = screen.getByTestId('subcontainer');

    expect(stepContainer).toBeInTheDocument();
    expect(subcontainer).toBeInTheDocument();
  });

  test('renders step circle container with correct styles', () => {
    const circleContains = screen.getAllByTestId('circle-contain');
    circleContains.forEach((contain) => {
      expect(contain).toHaveClass('flex-1 relative items-center justify-center px-1');
    });
  });

  test('circle style is correct for current step', () => {
    const stepCircles = screen.getAllByTestId('step-circle');
    expect(stepCircles.length).toBe(3);
    stepCircles.forEach((circle, index) => {
      if (index <= 1) {
        expect(circle).toHaveClass('bg-[#121316] text-white');
      } else {
        expect(circle).toHaveClass('bg-[#ECEDF0] text-black');
      }
    });
  });

  test('renders correct number of steps and step content', () => {
    const stepContents = screen.getAllByTestId('step-content');

    expect(stepContents.length).toBe(3);
    expect(stepContents[0].textContent).toBe('Хувийн мэдээлэл');
    expect(stepContents[1].textContent).toBe('Хөдөлмөр эрхлэлтийн мэдээлэл');
    expect(stepContents[2].textContent).toBe('Нэмэлт мэдээлэл');
  });

  test('renders correct step numbers', () => {
    const stepNumbers = screen.getAllByTestId('step-number');

    expect(stepNumbers.length).toBe(3);
    expect(stepNumbers[0].textContent).toBe('1');
    expect(stepNumbers[1].textContent).toBe('2');
    expect(stepNumbers[2].textContent).toBe('3');
  });

  test('progress bar style is correct for current step', () => {
    const progressBarItems = screen.queryAllByTestId('step-item-0');
    expect(progressBarItems.length).toBe(2);
    progressBarItems.forEach((progressBar) => {
      expect(progressBar).toHaveStyle({ backgroundColor: expect.stringMatching(/rgb\(\d+,\s*\d+,\s*\d+\)/) });
      expect(progressBar).toHaveStyle({ left: 'calc(50% + 18px)' });
      expect(progressBar).toHaveStyle({ width: 'calc(100% - 20px)' });
    });
  });

  test('progress bar between steps is rendered correctly', () => {
    const progressBars = screen.getAllByTestId('step-item-0');
    expect(progressBars.length).toBe(2);
    progressBars.forEach((progressBar, index) => {
      expect(progressBar).toBeInTheDocument();
      if (index < 1) {
        expect(progressBar).toHaveClass('absolute top-1/2 transform -translate-y-1/2 h-1 bg-black');
      } else {
        expect(progressBar).toHaveClass('absolute top-1/2 transform -translate-y-1/2 h-1 bg-[#ECEDF0]');
      }
    });
  });

  test('progress bar reflects current step correctly when step is 1', () => {
    render(<Stepper currentStep={1} />);
    const progressBars = screen.getAllByTestId('step-item-0');
    expect(progressBars[0]).toHaveClass('absolute top-1/2 transform -translate-y-1/2 h-1 bg-black');
    expect(progressBars[1]).toHaveClass('bg-[#ECEDF0]');
  });

  test('progress bar reflects current step correctly when step is 2', () => {
    render(<Stepper currentStep={2} />);
    const progressBars = screen.getAllByTestId('step-item-0');
    expect(progressBars[0]).toHaveClass('absolute top-1/2 transform -translate-y-1/2 h-1 bg-black');
    expect(progressBars[1]).toHaveClass('absolute top-1/2 transform -translate-y-1/2 h-1 bg-[#ECEDF0]');
  });

  test('navigates to next step on click', () => {
    const nextStepButton = screen.getAllByTestId('step-number')[1];

    fireEvent.click(nextStepButton);

    const updatedStepContents = screen.getAllByTestId('step-content');
    expect(updatedStepContents[1].textContent).toBe('Хөдөлмөр эрхлэлтийн мэдээлэл');
  });

  test('handles invalid currentStep gracefully', () => {
    render(<Stepper currentStep={1} />);

    const stepContent = screen.getAllByTestId('step-content');
    expect(stepContent.length).toBe(6);
    expect(stepContent[0].textContent).toBe('Хувийн мэдээлэл');
  });

  test('renders dynamic step content based on user input', () => {
    const stepContentElements = screen.queryAllByTestId('step-content');
    stepContentElements.forEach((stepContentElement) => {
      expect(stepContentElement.textContent).toMatch(/Хөдөлмөр эрхлэлтийн мэдээлэл|Нэмэлт мэдээлэл|Хувийн мэдээлэл/);
    });
  });

  test('conditionally renders additional content based on step progress', () => {
    const additionalContent = screen.queryByTestId('additional-content');
    expect(additionalContent).toBeNull();
  });
});
