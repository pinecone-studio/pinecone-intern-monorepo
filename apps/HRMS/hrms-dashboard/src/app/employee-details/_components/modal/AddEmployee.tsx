import { AddModal } from './AddModal';
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

export const AddEmployee = ({
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
    <div data-testid="container" className="flex justify-between py-5 px-6 items-center">
      <h1 className="text-2xl font-bold  ">Ажилчид</h1>
      <AddModal
        currentStep={currentStep}
        steps={steps}
        nextStep={nextStep}
        prevStep={prevStep}
        employeesInfo={employeesInfo}
        changeEmployee={changeEmployee}
        createData={createData}
        fileChangeHandler={fileChangeHandler}
        imageUrl={imageUrl}
      />
    </div>
  );
};
