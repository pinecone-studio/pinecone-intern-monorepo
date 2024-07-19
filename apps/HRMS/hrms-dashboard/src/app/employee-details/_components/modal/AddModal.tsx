'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MdOutlineAdd } from 'react-icons/md';
import { Stepper } from './Stepper';
import { StepPersonalInfo } from '../add-employee-steps/StepPersonaInfo';
import { StepJobInfo } from '../add-employee-steps/StepJobInfo';
import { StepAdditionalInfo } from '../add-employee-steps/StepAdditionaInfo';
import { ReactNode } from 'react';

type StepsType = { title: string; content: string }[];
type InputOneType = { label: string; type: string; name: string; value: string | number | readonly string[] | undefined; errorMessage: ReactNode }[];

export const AddModal = ({
  firstname,
  lastname,
  email,
  jobTitle,
  ladderLevel,
  salary,
  fileChangeHandler,
  onChangeHandler,
  setValueFormik,
  validEmail,
  handleNextStepPI,
  prevStep,
  currentStep,
  steps,
  imageUrl,
  isModalOpen,
  handleOpenModal,
  inputOne,
  isValidPersonalInfo,
  handleNextStepJI,
  handleSubmitAI,
  isValidJobInfo,
  isValidAdditionalInfo,
}: {
  firstname: string;
  lastname: string;
  email: string;
  jobTitle: string[];
  ladderLevel: string;
  salary: string;
  fileChangeHandler: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHandler: (_event: React.ChangeEvent<unknown>) => void;
  onSubmitHandler: (_event?: React.FormEvent<HTMLFormElement>) => void;
  setValueFormik: (_field: string, _value: unknown, _shouldValidate?: boolean) => void;
  validEmail: string | undefined;
  handleNextStepPI: () => void;
  prevStep: () => void;
  currentStep: number;
  steps: StepsType;
  imageUrl: string;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  inputOne: InputOneType;
  isValidPersonalInfo: boolean;
  handleNextStepJI: () => void;
  handleSubmitAI: () => void;
  isValidJobInfo: boolean;
  isValidAdditionalInfo: boolean;
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenModal}>
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
          {currentStep == 0 && (
            <StepPersonalInfo
              firstname={firstname}
              lastname={lastname}
              email={email}
              onChangeHandler={onChangeHandler}
              validEmail={validEmail}
              nextStep={handleNextStepPI}
              inputOne={inputOne}
              isValidPersonalInfo={isValidPersonalInfo}
            />
          )}
          {currentStep == 1 && (
            <StepJobInfo
              jobTitle={jobTitle}
              salary={salary}
              onChangeHandler={onChangeHandler}
              setValueFormik={setValueFormik}
              nextStep={handleNextStepJI}
              prevStep={prevStep}
              isValidJobInfo={isValidJobInfo}
            />
          )}
          {currentStep == 2 && (
            <StepAdditionalInfo
              ladderLevel={ladderLevel}
              fileChangeHandler={fileChangeHandler}
              onChangeHandler={onChangeHandler}
              prevStep={prevStep}
              imageUrl={imageUrl}
              handleSubmitAI={handleSubmitAI}
              isValidAdditionalInfo={isValidAdditionalInfo}
            />
          )}
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
