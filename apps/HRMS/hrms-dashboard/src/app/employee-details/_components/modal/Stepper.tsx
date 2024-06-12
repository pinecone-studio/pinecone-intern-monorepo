'use client';

import React, { useState } from 'react';
import { LeftArrowIcon, RightArrowIcon, RightArrowWhiteIcon } from '../Icons/ModalIcons';

export const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Step 1', content: 'Хувийн мэдээлэл' },
    { title: 'Step 2', content: 'Хөдөлмөр эрхлэлтийн мэдээлэл' },
    { title: 'Step 3', content: 'Нэмэлт мэдээлэл' },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-xl w-[533px] mx-auto p-4">
      <div className="relative flex justify-between items-center mb-[100px]">
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
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">{steps[currentStep].title}</h3>
        <p className="text-gray-600 mb-6">{steps[currentStep].content}</p>
        <div className="flex justify-between">
          {currentStep > 0 ? (
            <button onClick={prevStep} className={`flex justify-center items-center h-12 w-12 rounded-full bg-[#F6F6F6] ${currentStep === 0 ? 'cursor-not-allowed' : ''}`} disabled={currentStep === 0}>
              <div className="flex w-6 h-6 items-center justify-center">
                <LeftArrowIcon />
              </div>
            </button>
          ) : (
            <div></div>
          )}
          <div>
            {currentStep < steps.length - 1 ? (
              <button onClick={nextStep} className={`px-4 py-2 h-12 rounded-[8px] bg-[#D6D8DB] ${currentStep === steps.length - 1 ? 'cursor-not-allowed' : ''}`}>
                <div className="flex gap-1 items-center">
                  <div className="flex px-1 py-1/2">
                    <p className="text-[#A9ACAF] text-[16px] font-[600] leading-5 tracking-[-0.3px]">Дараах</p>
                  </div>
                  <div className="w-6 h-6">
                    <RightArrowIcon />
                  </div>
                </div>
              </button>
            ) : (
              <button>
                <div className="flex h-12 rounded-[8px] min-w-[80px] px-[16px] py-[12px] bg-[#121316] items-center">
                  <div className="px-2 py-1 flex">
                    <p className="text-[#FFF] text-[16px] font-[600] leading-5 tracking-[-0.3px] not-italic">Илгээх</p>
                  </div>
                  <div className="w-6 h-6">
                    <RightArrowWhiteIcon />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
