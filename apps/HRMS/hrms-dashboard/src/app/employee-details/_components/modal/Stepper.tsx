import React from 'react';

type StepsType = { title: string; content: string }[];

export const Stepper = ({ currentStep, steps }: { currentStep: number; steps: StepsType }) => {
  return (
    <div data-testid="step-container" className="max-w-xl w-[533px] mx-auto ">
      <div data-testid="subcontainer" className="relative flex justify-between items-center mb-[100px]">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div data-testid="circle-contain" className="flex-1 relative items-center justify-center px-1">
              <div
                data-testid="step-circle"
                className="flex items-center justify-center w-9 h-9 rounded-full mx-auto"
                style={{ backgroundColor: index <= currentStep ? '#121316' : '#ECEDF0', color: index <= currentStep ? 'white' : 'black' }}
              >
                <p data-testid="step-number" className="text-4 font-[600] leading-5 tracking-[-0.3px]">
                  {index + 1}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div
                  data-testid="step-item-0"
                  className="absolute top-1/2 transform -translate-y-1/2 h-1"
                  style={{ left: 'calc(50% + 18px)', width: 'calc(100% - 20px)', backgroundColor: currentStep >= index + 1 ? 'black' : '#ECEDF0' }}
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
