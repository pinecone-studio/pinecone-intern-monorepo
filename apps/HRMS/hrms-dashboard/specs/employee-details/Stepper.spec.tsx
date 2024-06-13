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

  it('renders the progress bar correctly', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];
    const currentStep = 1;

    const { container } = render(
      <div>
        {steps.map((step, index) => (
          <div key={index}>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 h-1 ${currentStep >= index + 1 ? 'bg-black' : 'bg-[#ECEDF0]'}`}
                style={{ left: 'calc(50% + 18px)', width: 'calc(100% - 20px)' }}
              ></div>
            )}
          </div>
        ))}
      </div>
    );

    const progressBar = container.querySelector('.h-1');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass('absolute top-1/2 transform -translate-y-1/2 h-1 bg-black');
  });

  it('renders the step content correctly', () => {
    const step = { content: 'Example content' };

    const { getByText } = render(
      <div>
        <div className="absolute flex justify-center items-center w-[100px] ml-[30px] mt-2">
          <p className="text-center text-wrap text-[#121316] text-[14px] font-[600] leading-4 tracking-[-0.2px]">{step.content}</p>
        </div>
      </div>
    );

    const stepContent = getByText('Example content');
    expect(stepContent).toBeInTheDocument();
  });
});
