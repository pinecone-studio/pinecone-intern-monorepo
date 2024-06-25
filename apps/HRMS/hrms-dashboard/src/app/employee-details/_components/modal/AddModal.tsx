'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { Stepper } from './Stepper';
import { NextAndBackButton } from './NextAndBackButton';
import { StepPersonalInfo } from '../add-employee-steps/StepPersonaInfo';
import { StepJobInfo } from '../add-employee-steps/StepJobInfo';
import { StepAdditionalInfo } from '../add-employee-steps/StepAdditionaInfo';
import { FormikHelpers } from 'formik';

type StepsType = { title: string; content: string }[];

export const AddModal = ({
  currentStep,
  steps,
  setCurrentStep,
  loading,
  firstname,
  lastname,
  email,
  imageURL,
  department,
  jobTitle,
  ladderLevel,
  salary,
  employmentStatus,
  handleChange,
  hadlesubmit,
  fileChangeHandler,
}: {
  firstname: string;
  lastname: string;
  email: string;
  imageURL: string;
  department: string;
  jobTitle: Array<string>;
  ladderLevel: string;
  salary: number;
  employmentStatus: string;
  loading: boolean;
  currentStep: number;
  steps: StepsType;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleChange: (_e: React.ChangeEvent<unknown>) => void;
  hadlesubmit: (_e: React.FormEvent<HTMLFormElement>) => void;
  fileChangeHandler: FormikHelpers<string>['setFieldValue'];
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
          {currentStep == 0 && <StepPersonalInfo firstname={firstname} lastname={lastname} email={email} handleChange={handleChange} />}
          {currentStep == 1 && <StepJobInfo department={department} jobTitle={jobTitle} salary={salary} employmentStatus={employmentStatus} handleChange={handleChange} />}
          {currentStep == 2 && <StepAdditionalInfo ladderLevel={ladderLevel} handleChange={handleChange} imageURL={imageURL} fileChangeHandler={fileChangeHandler} />}
          {loading && <p>Loading...</p>}
        </DialogHeader>
        <DialogFooter></DialogFooter>
        <NextAndBackButton steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} handleSubmit={hadlesubmit} />
      </DialogContent>
    </Dialog>
  );
};
