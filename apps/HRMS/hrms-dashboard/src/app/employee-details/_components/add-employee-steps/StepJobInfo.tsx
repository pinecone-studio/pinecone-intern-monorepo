/* eslint-disable no-secrets/no-secrets */
import { Input } from '@/components/ui/input';
// import { ChangeEventHandler, FocusEventHandler, PropsWithChildren } from 'react';
import { inputTwo } from '../../constants';

// type CustomInputProps = {
//   label: string;
//   type: string;
//   placeholder?: string;
//   name: string;
//   value: string | number;
//   error?: boolean;
//   helperText?: string;
//   onChange?: ChangeEventHandler<HTMLInputElement> & ChangeEventHandler<HTMLSelectElement>;
//   onBlur?: FocusEventHandler<HTMLInputElement> & FocusEventHandler<HTMLSelectElement>;
// };

// export const StepTwo = (props: CustomInputProps & PropsWithChildren) => {
//   const { label, type, placeholder, name, value, helperText, onChange, onBlur } = props;
export const StepJobInfo = () => {
  return (
    <>
      {/* <p>{label}</p>
      <Input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} onBlur={onBlur} />
      <p className="text-error text-xs ml-2">{helperText}</p> */}
      <div data-testid="step-job-info">
        {inputTwo.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className=" text-[16px] font-normal ">{item.label}</label>
            <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type={item.type} placeholder={item.placeholder} name={item.name} value="" />
          </div>
        ))}
      </div>
    </>
  );
};
