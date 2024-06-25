import { Input } from '@/components/ui/input';
import { FormikHelpers } from 'formik';

export const StepAdditionalInfo = ({
  ladderLevel,
  imageURL,
  handleChange,
  fileChangeHandler,
}: {
  imageURL: string;
  ladderLevel: string;
  handleChange: (_e: React.ChangeEvent<unknown>) => void;
  fileChangeHandler: FormikHelpers<string>['setFieldValue'];
}) => {
  return (
    <>
      <div data-testid="step-additional-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Мэрэгжлийн зэрэг'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="ladderLevel" value={ladderLevel} onChange={handleChange} />
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="file" onChange={fileChangeHandler} />
          <div style={{ backgroundImage: `URL(${imageURL})` }}></div>
        </div>
      </div>
    </>
  );
};
