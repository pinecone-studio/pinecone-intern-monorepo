import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Department, EmploymentStatus } from '@/generated';
import { useFormik } from 'formik';
import { LeftArrowIcon, RightArrowIcon } from '../Icons/ModalIcons';

type EmployeesInfoType = {
  firstname: string;
  lastname: string;
  email: string;
  imageURL: string;
  department: Department;
  jobTitle: string[];
  ladderLevel: string;
  salary: string;
  dateOfEmployment: Date;
  employmentStatus: EmploymentStatus;
};

export const StepJobInfo = ({
  nextStep,
  prevStep,
  employeesInfo,
  changeEmployee,
}: {
  nextStep: () => void;
  prevStep: () => void;
  employeesInfo: {
    firstname: string;
    lastname: string;
    email: string;
    imageURL: string;
    department: Department;
    jobTitle: string[];
    ladderLevel: string;
    salary: string;
    dateOfEmployment: Date;
    employmentStatus: EmploymentStatus;
  };
  changeEmployee: (_values: Partial<EmployeesInfoType>) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      department: employeesInfo.department,
      jobTitle: employeesInfo.jobTitle,
      salary: employeesInfo.salary,
      employmentStatus: employeesInfo.employmentStatus,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form with values:', values);
        changeEmployee(values);
        console.log('Employee created successfully:');
        resetForm();
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
  });

  const handleNext = () => {
    formik.handleSubmit();
    nextStep();
  };

  return (
    <div className="flex flex-col gap-10">
      <div data-testid="step-job-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Хэлтэс'}</label>
          <Select>
            <SelectTrigger className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]">
              <SelectValue placeholder="Хэлтэс" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={formik.values.department}>{Department.BackOffice}</SelectItem>
              <SelectItem value={formik.values.department}>{Department.Design}</SelectItem>
              <SelectItem value={formik.values.department}>{Department.Marketing}</SelectItem>
              <SelectItem value={formik.values.department}>{Department.Software}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Мэргэжил'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="jobTitle" value={formik.values.jobTitle} onChange={formik.handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Цалин'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="salary" value={formik.values.salary} onChange={formik.handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Ажлын цаг'}</label>
          <Select>
            <SelectTrigger className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]">
              <SelectValue placeholder="Ажлын цаг" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={formik.values.employmentStatus}>{EmploymentStatus.Archive}</SelectItem>
              <SelectItem value={formik.values.employmentStatus}>{EmploymentStatus.Contractor}</SelectItem>
              <SelectItem value={formik.values.employmentStatus}>{EmploymentStatus.FullTime}</SelectItem>
              <SelectItem value={formik.values.employmentStatus}>{EmploymentStatus.PartTime}</SelectItem>
              <SelectItem value={formik.values.employmentStatus}>{EmploymentStatus.Temporary}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between">
        <button data-testid="prev-button" onClick={prevStep} className="flex justify-center items-center h-12 w-12 rounded-full bg-[#F6F6F6]">
          <div className="flex w-6 h-6 items-center justify-center">
            <LeftArrowIcon />
          </div>
        </button>
        <button data-testid="next-button" onClick={handleNext} className="flex gap-1 items-center px-4 py-2 h-12 rounded-[8px] bg-[#D6D8DB]">
          <p className="text-[#A9ACAF] text-[16px] font-[600] leading-5 tracking-[-0.3px]">Дараах</p>
          <div className="w-6 h-6">
            <RightArrowIcon />
          </div>
        </button>
      </div>
    </div>
  );
};
