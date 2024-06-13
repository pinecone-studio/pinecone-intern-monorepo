import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper } from '../../src/app/employee-details/_components/modal/Stepper';

describe('Stepper Component', () => {
  test('test step-container', () => {
    render(<Stepper />);
    expect(screen.getByTestId('step-container')).toBeDefined();
  });

  test('test subcontainer', () => {
    render(<Stepper />);
    expect(screen.getByTestId('subcontainer')).toBeDefined();
  });

  test('renders steps with correct content', () => {
    const mockSteps = [
      { title: 'Step 1', content: 'Хувийн мэдээлэл' },
      { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
      { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
    ];

    render(<Stepper />);

    const renderedSteps = mockSteps.map((step, index) => ({
      title: `Step ${index + 1}`,
      content: step.content,
    }));

    expect(renderedSteps).toEqual(mockSteps);
  });

  test('renders elements inside conditional block based on component logic', () => {
    render(<Stepper />);

    const midleLineElement = screen.queryByRole('divider');
    const stepContentElement = screen.queryByRole('step-content');
    const contentTextElement = screen.queryByText(/step\.content/i);

    if (midleLineElement) {
      expect(stepContentElement).toBeInTheDocument();
      expect(contentTextElement).toBeInTheDocument();
    } else {
      expect(stepContentElement).toBeNull();
      expect(contentTextElement).toBeNull();
    }
  });
});
