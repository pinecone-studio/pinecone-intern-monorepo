'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { Stepper } from './Stepper';
import { StepPersonalInfo } from '../add-employee-steps/StepPersonaInfo';
import { StepJobInfo } from '../add-employee-steps/StepJobInfo';
import { StepAdditionalInfo } from '../add-employee-steps/StepAdditionaInfo';
import { Department, EmploymentStatus } from '@/generated';

type StepsType = { title: string; content: string }[];
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

export const AddModal = ({
  currentStep,
  steps,
  nextStep,
  prevStep,
  employeesInfo,
  changeEmployee,
  createData,
  fileChangeHandler,
  imageUrl,
}: {
  currentStep: number;
  steps: StepsType;
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
  createData: () => void;
  fileChangeHandler: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="addEmployeeBtn" variant={'secondary'} className="bg-[#F7F7F8] text-[#121316] hover:bg-gray-200 duration-600 ease-in-out h-9 px-4 py-2 ">
          <MdOutlineAdd data-testid="add-icon" className="w-5 h-5" />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modalContent" className="flex gap-10 flex-col sm:max-w-[620px] px-8">
        <DialogHeader>
          <DialogTitle data-testid="title">Ажилтан нэмэх</DialogTitle>

          <DialogDescription></DialogDescription>
          <Stepper currentStep={currentStep} steps={steps} />
          {currentStep == 0 && <StepPersonalInfo nextStep={nextStep} employeesInfo={employeesInfo} changeEmployee={changeEmployee} />}
          {currentStep == 1 && <StepJobInfo nextStep={nextStep} prevStep={prevStep} employeesInfo={employeesInfo} changeEmployee={changeEmployee} />}
          {currentStep == 2 && (
            <StepAdditionalInfo employeesInfo={employeesInfo} imageUrl={imageUrl} prevStep={prevStep} createData={createData} changeEmployee={changeEmployee} fileChangeHandler={fileChangeHandler} />
          )}
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
