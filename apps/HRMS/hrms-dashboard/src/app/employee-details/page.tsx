import { AddEmployee } from './_components/modal/AddEmployee';
import { TableDemo } from './_components/TableBoard';
import { PaginationDemo } from './_components/Pagination';

const EmployeeDetailsPage = () => {
  return (
    <div className="flex justify-center flex-col gap-6">
      <div className="flex justify-center flex-col items-center w-[1154px]">
        <AddEmployee />
        <TableDemo />
      </div>

      <PaginationDemo />
    </div>
  );
};
export default EmployeeDetailsPage;
