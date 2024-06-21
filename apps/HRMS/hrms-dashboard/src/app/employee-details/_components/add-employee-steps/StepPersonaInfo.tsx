/* eslint-disable no-secrets/no-secrets */
import React from 'react';
import { Input } from '@/components/ui/input';
// import { ChangeEventHandler, FocusEventHandler, PropsWithChildren } from 'react';
import { inputOne } from '../../constants';

// interface CustomInputProps {
//   label: string;
//   type: string;
//   placeholder?: string;
//   name: string;
//   value: string | number;
//   defaultValue?: string | number;
//   error?: boolean;
//   helperText?: string;
//   onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
//   onBlur?: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
// }

// export const StepOne = (props: CustomInputProps & PropsWithChildren) => {
//   const { label, type, placeholder, name, value, helperText, onChange, onBlur } = props;

export const StepPersonalInfo = () => {
  return (
    <>
      <div data-testid="step-personal-info">
        {inputOne.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className=" text-[16px] font-normal ">{item.label}</label>
            <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type={item.type} placeholder={item.placeholder} name={item.name} value="" />
          </div>
        ))}
      </div>
    </>
  );
};
