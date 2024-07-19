import React, { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { RightArrowWhiteIcon } from '../Icons/ModalIcons';

type InputOneType = { label: string; type: string; name: string; value: string | number | readonly string[] | undefined; errorMessage: ReactNode }[];

export const StepPersonalInfo = ({
  onChangeHandler,
  nextStep,
  inputOne,
  isValidPersonalInfo,
}: {
  firstname: string;
  lastname: string;
  email: string;
  onChangeHandler: (_e: React.ChangeEvent<unknown>) => void;
  validEmail: string | undefined;
  nextStep: () => void;
  inputOne: InputOneType;
  isValidPersonalInfo: boolean;
}) => {
  return (
    <div data-testid="personal-info" className="flex flex-col ">
      <div data-testid="step-personal-info" className="flex gap-4 flex-col">
        {inputOne.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label htmlFor={item.name} className=" text-[16px] font-normal text-[#121316]">
              {item.label}
            </label>
            <Input data-testid={item.name} className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type={item.type} id={item.name} name={item.name} value={item.value} onChange={onChangeHandler} />
          </div>
        ))}
      </div>
      <div className="flex mt-[48px] justify-end">
        <button
          data-testid="next-button"
          onClick={nextStep}
          className={`flex gap-1 items-center px-4 py-2 h-12 rounded-[8px] bg-[#121316] ${isValidPersonalInfo ? 'opacity-50' : 'opacity-100'}`}
          disabled={isValidPersonalInfo}
        >
          <p className="text-white text-[16px] font-[600] leading-5 tracking-[-0.3px]">Дараах</p>
          <div className="w-6 h-6">
            <RightArrowWhiteIcon />
          </div>
        </button>
      </div>
    </div>
  );
};
