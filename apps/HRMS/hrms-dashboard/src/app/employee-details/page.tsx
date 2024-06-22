import { Stepper } from './_components/modal/Stepper';
import { AddEmployee } from './_components/modal/AddEmployee';
import { TableDemo } from './_components/TableBoard';
import { PaginationDemo } from './_components/Pagination';

const EmployeeDetailsPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col items-center w-[1154px]">
        <AddEmployee />
        <TableDemo />
        <div>
          <Stepper currentStep={0} />
        </div>
      </div>

      <PaginationDemo />
    </div>
  );
};
export default EmployeeDetailsPage;
