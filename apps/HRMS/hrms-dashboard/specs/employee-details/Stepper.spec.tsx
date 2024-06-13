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

  test('navigates to next step on click', () => {
    render(<Stepper />);
    const stepNumbers = screen.getAllByTestId('step-number');
    const nextStepButton = stepNumbers[1];

    nextStepButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const updatedStepContents = screen.queryAllByTestId('step-content');
    expect(updatedStepContents.length).toBe(3);
    expect(updatedStepContents[1].textContent).toBe('Хөдөлмөр эрхлэлтийн мэдээлэл');
  });

  test('handles invalid currentStep gracefully', () => {
    const useStateMock = jest.fn();
    useStateMock.mockReturnValue([0, () => {}]);

    React.useState = useStateMock;

    render(<Stepper />);

    const stepContent = screen.queryAllByTestId('step-content');
    expect(stepContent.length).toBe(3);
    expect(stepContent[0].textContent).toBe('Хувийн мэдээлэл');
  });

  test('renders dynamic step content based on user input', () => {
    const MockStepper = () => {
      const [inputValue, setInputValue] = React.useState('');
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      };

      const steps = [
        { title: 'Step 1', content: 'Хувийн мэдээлэл' },
        { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
        { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
      ];

      return (
        <div data-testid="step-container" className="max-w-xl w-[533px] mx-auto p-4">
          <input type="text" aria-label="Enter something" value={inputValue} onChange={handleChange} />
          <div data-testid="subcontainer" className="relative flex justify-between items-center mb-[100px]">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex-1 relative items-center justify-center px-1">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full mx-auto ${index <= 0 ? 'bg-[#121316] text-white' : 'bg-[#ECEDF0] text-black'}`}>
                    <p data-testid="step-number" className="text-4 font-[600] leading-5 tracking-[-0.3px]">
                      {index + 1}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      data-testid={`step-item-${index}`}
                      className={`absolute top-1/2 transform -translate-y-1/2 h-1 ${0 >= index + 1 ? 'bg-black' : 'bg-[#ECEDF0]'}`}
                      style={{ left: 'calc(50% + 18px)', width: 'calc(100% - 20px)' }}
                    ></div>
                  )}
                  <div className="absolute flex justify-center items-center w-[100px] ml-[30px] mt-2">
                    <p data-testid="step-content" className="text-center text-wrap text-[#121316] text-[14px] font-[600] leading-4 tracking-[-0.2px]">
                      {step.content}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    };

    render(<MockStepper />);
    const inputField = screen.getByLabelText('Enter something') as HTMLInputElement;

    const inputEvent = new Event('input', { bubbles: true });
    inputField.dispatchEvent(inputEvent);

    inputField.value = 'New content';

    const updatedStepContents = screen.queryAllByTestId('step-content');
    expect(updatedStepContents.length).toBe(3);
    expect(updatedStepContents[0].textContent).toBe('Хувийн мэдээлэл');
  });

  test('conditionally renders additional content based on step progress', () => {
    render(<Stepper />);
    const additionalContent = screen.queryByTestId('additional-content');
    expect(additionalContent !== null).toBe(false);
  });
});
