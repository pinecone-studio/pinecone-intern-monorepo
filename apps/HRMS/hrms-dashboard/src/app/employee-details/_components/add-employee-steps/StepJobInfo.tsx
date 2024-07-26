import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Department, EmploymentStatus } from '@/generated';
import { LeftArrowIcon, RightArrowWhiteIcon } from '../Icons/ModalIcons';

export const StepJobInfo = ({
  jobTitle,
  salary,
  onChangeHandler,
  setValueFormik,
  nextStep,
  prevStep,
  isValidJobInfo,
}: {
  jobTitle: string[];
  salary: string;
  onChangeHandler: (_event: React.ChangeEvent<unknown>) => void;
  setValueFormik: (_field: string, _value: unknown, _shouldValidate?: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  isValidJobInfo: boolean;
}) => {
  return (
    <div data-testid="job-info" className="flex flex-col">
      <div data-testid="step-job-info" className="flex gap-4 flex-col">
        <div cy-testid="select-one" className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Хэлтэс'}</label>
          <Select data-testid="department-select" onValueChange={(value) => setValueFormik('department', value)}>
            <SelectTrigger className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Department.BackOffice}>{Department.BackOffice}</SelectItem>
              <SelectItem value={Department.Design}>{Department.Design}</SelectItem>
              <SelectItem value={Department.Marketing}>{Department.Marketing}</SelectItem>
              <SelectItem value={Department.Software}>{Department.Software}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div data-testid="input-one" className="flex flex-col gap-1">
          <label htmlFor="jobTitle" className=" text-[16px] font-normal text-[#121316]">
            {'Мэргэжил'}
          </label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" id="jobTitle" name="jobTitle" value={jobTitle} onChange={onChangeHandler} />
        </div>
        <div data-testid="input-two" className="flex flex-col gap-1">
          <label htmlFor="salary" className=" text-[16px] font-normal text-[#121316]">
            {'Цалин'}
          </label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" id="salary" name="salary" value={salary} onChange={onChangeHandler} />
        </div>
        <div cy-testid="select-two" className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Ажлын цаг'}</label>
          <Select data-testid="status-select" onValueChange={(value) => setValueFormik('employmentStatus', value)}>
            <SelectTrigger className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EmploymentStatus.Archive}>{EmploymentStatus.Archive}</SelectItem>
              <SelectItem value={EmploymentStatus.Contractor}>{EmploymentStatus.Contractor}</SelectItem>
              <SelectItem value={EmploymentStatus.FullTime}>{EmploymentStatus.FullTime}</SelectItem>
              <SelectItem value={EmploymentStatus.PartTime}>{EmploymentStatus.PartTime}</SelectItem>
              <SelectItem value={EmploymentStatus.Temporary}>{EmploymentStatus.Temporary}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between mt-[48px]">
        <button data-testid="prev-button" onClick={prevStep} className="flex justify-center items-center h-12 w-12 rounded-full bg-[#F6F6F6]">
          <div className="flex w-6 h-6 items-center justify-center">
            <LeftArrowIcon />
          </div>
        </button>
        <button
          data-testid="next-button"
          onClick={nextStep}
          className={`flex gap-1 items-center px-4 py-2 h-12 rounded-[8px] bg-[#121316] ${isValidJobInfo ? 'opacity-50' : 'opacity-100'}`}
          disabled={isValidJobInfo}
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
