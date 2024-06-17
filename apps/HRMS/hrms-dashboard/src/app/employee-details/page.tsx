import { Stepper } from './_components/modal/Stepper';
import { AddEmployee } from './_components/AddEmployee';
import { ProjectHeader } from '../employee-details/_components/header/ProjectHeader';

const EmployeeDetailsPage = () => {
  return (
    <div>
      <ProjectHeader />
      <div className="flex justify-center ">
        <AddEmployee />
      </div>
      <div>
        <Stepper currentStep={0} />
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
