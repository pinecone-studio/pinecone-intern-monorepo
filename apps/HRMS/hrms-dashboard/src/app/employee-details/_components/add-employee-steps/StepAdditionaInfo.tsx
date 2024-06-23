import { Input } from '@/components/ui/input';

export const StepAdditionalInfo = ({ ladderLevel, handleChange }: { ladderLevel: string; handleChange: (_e: React.ChangeEvent<unknown>) => void }) => {
  return (
    <>
      <div data-testid="step-additional-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Мэрэгжлийн зэрэг'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="ladderLevel" value={ladderLevel} onChange={handleChange} />
        </div>
      </div>
    </>
  );
};
