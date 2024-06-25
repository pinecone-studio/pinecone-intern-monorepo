import { FormikHelpers } from 'formik';
import { AddModal } from './AddModal';

type StepsType = { title: string; content: string }[];

export const AddEmployee = ({
  currentStep,
  steps,
  setCurrentStep,
  firstname,
  lastname,
  email,
  handleChange,
  department,
  jobTitle,
  salary,
  imageURL,
  employmentStatus,
  ladderLevel,
  loading,
  hadlesubmit,
  fileChangeHandler,
}: {
  loading: boolean;
  currentStep: number;
  steps: StepsType;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  firstname: string;
  lastname: string;
  email: string;
  handleChange: (_e: React.ChangeEvent<unknown>) => void;
  imageURL: string;
  department: string;
  jobTitle: string[];
  salary: number;
  employmentStatus: string;
  ladderLevel: string;
  hadlesubmit: (_e: React.FormEvent<HTMLFormElement>) => void;
  fileChangeHandler: FormikHelpers<string>['setFieldValue'];
}) => {
  return (
    <div data-testid="container" className="flex justify-between py-5 px-6 items-center">
      <h1 className="text-2xl font-bold  ">Ажилчид</h1>
      <AddModal
        currentStep={currentStep}
        steps={steps}
        setCurrentStep={setCurrentStep}
        loading={loading}
        firstname={firstname}
        lastname={lastname}
        email={email}
        imageURL={imageURL}
        department={department}
        jobTitle={jobTitle}
        ladderLevel={ladderLevel}
        salary={salary}
        employmentStatus={employmentStatus}
        handleChange={handleChange}
        hadlesubmit={hadlesubmit}
        fileChangeHandler={fileChangeHandler}
      />
    </div>
  );
};
