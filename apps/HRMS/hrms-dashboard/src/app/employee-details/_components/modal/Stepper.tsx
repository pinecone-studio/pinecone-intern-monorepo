import React from 'react';

export const Stepper = () => {
  const currentStep = 0;
  const steps = [
    { title: 'Step 1', content: 'Хувийн мэдээлэл' },
    { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
    { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
  ];

  return (
    <div data-testid="step-container" className="max-w-xl w-[533px] mx-auto p-4">
      <div data-testid="subcontainer" className="relative flex justify-between items-center mb-[100px]">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex-1 relative items-center justify-center px-1">
              <div className={`flex items-center justify-center w-9 h-9 rounded-full mx-auto ${index <= currentStep ? 'bg-[#121316] text-white' : 'bg-[#ECEDF0] text-black'}`}>
                <p className="text-4 font-[600] leading-5 tracking-[-0.3px]">{index + 1}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 h-1 ${currentStep >= index + 1 ? 'bg-black' : 'bg-[#ECEDF0]'}`}
                  style={{ left: 'calc(50% + 18px)', width: 'calc(100% - 20px)' }}
                ></div>
              )}
              <div className="absolute flex justify-center items-center w-[100px] ml-[30px] mt-2">
                <p className="text-center text-wrap text-[#121316] text-[14px] font-[600] leading-4 tracking-[-0.2px]">{step.content}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};