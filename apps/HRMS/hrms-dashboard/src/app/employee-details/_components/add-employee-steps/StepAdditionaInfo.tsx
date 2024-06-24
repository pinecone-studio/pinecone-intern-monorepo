import { Input } from '@/components/ui/input';
import { inputThree } from '../../constants';

export const StepAdditionalInfo = () => {
  return (
    <>
      <div data-testid="step-additional-info" className="flex gap-4 flex-col">
        {inputThree.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className=" text-[16px] font-normal text-[#121316]">{item.label}</label>
            <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type={item.type} placeholder={item.placeholder} name={item.name} value="" />
          </div>
        ))}
      </div>
    </>
  );
};
