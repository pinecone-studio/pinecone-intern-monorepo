import { Input } from '@/components/ui/input';

export const StepJobInfo = ({
  department,
  jobTitle,
  salary,
  employmentStatus,
  handleChange,
}: {
  department: string;
  jobTitle: string[];
  salary: number;
  employmentStatus: string;
  handleChange: (_e: React.ChangeEvent<unknown>) => void;
}) => {
  return (
    <>
      <div data-testid="step-job-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Хэлтэс'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="department" value={department} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Мэргэжил'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="jobTitle" value={jobTitle} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Цалин'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="salary" value={salary} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Ажлын цаг'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="employmentStatus" value={employmentStatus} onChange={handleChange} />
        </div>
      </div>
    </>
  );
};
