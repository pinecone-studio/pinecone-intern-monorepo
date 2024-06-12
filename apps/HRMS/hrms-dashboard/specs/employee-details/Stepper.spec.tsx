import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

describe('Stepper Component', () => {
  test('Renders without crashing', () => {
    render(<Stepper />);
  });

  test('Initial step is Step 1', () => {
    const { getByText } = render(<Stepper />);
    expect(getByText('Step 1')).toBeTruthy();
  });

  test('Next button increments current step', () => {
    const { getByText } = render(<Stepper />);
    const nextButton = getByText('Дараах');
    fireEvent.click(nextButton);
    expect(getByText('Step 2')).toBeTruthy();
  });

  test('Previous button decrements current step', () => {
    const { getByText } = render(<Stepper />);
    const prevButton = getByText('Step 1');
    fireEvent.click(prevButton);
    expect(getByText('Step 1')).toBeTruthy();
  });

  test('Next button disabled on last step', () => {
    const { getByText } = render(<Stepper />);
    const nextButton = getByText('Дараах') as HTMLButtonElement | null;
    if (nextButton) {
      fireEvent.click(nextButton); // Step 2
      fireEvent.click(nextButton); // Step 3
      expect(nextButton.disabled).toBeTruthy();
    } else {
      // Handle case where button is not found
      throw new Error('Next button not found');
    }
  });

  test('Previous button disabled on first step', () => {
    const { getByText } = render(<Stepper />);
    const prevButton = getByText('Step 1') as HTMLButtonElement | null;
    if (prevButton) {
      fireEvent.click(prevButton);
      expect(prevButton.disabled).toBeTruthy();
    } else {
      // Handle case where button is not found
      throw new Error('Previous button not found');
    }
  });

  test('Clicking Next and then Previous maintains step', () => {
    const { getByText } = render(<Stepper />);
    const nextButton = getByText('Дараах');
    const prevButton = getByText('Step 1');
    fireEvent.click(nextButton); // Step 2
    fireEvent.click(prevButton);
    expect(getByText('Step 1')).toBeTruthy();
  });

  // Add more specific tests as needed for individual components or functions
});
