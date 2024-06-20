import { Stepper } from './_components/modal/Stepper';
import { AddEmployee } from './_components/AddEmployee';
import { PaginationDemo } from './_components/Pagination';

const EmployeeDetailsPage = () => {
  return (
    <div>
      <div className="flex justify-center ">
        <AddEmployee />
      </div>
      <div>
        <Stepper currentStep={0} />
      </div>
      <PaginationDemo />
    </div>
  );
};
export default EmployeeDetailsPage;
