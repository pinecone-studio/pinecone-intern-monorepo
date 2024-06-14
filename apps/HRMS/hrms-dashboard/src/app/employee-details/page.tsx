import { Stepper } from './_components/modal/Stepper';
import { AddEmployee } from './_components/AddEmployee';

const EmployeeDetailsPage = () => {
  return (
    <div>
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
