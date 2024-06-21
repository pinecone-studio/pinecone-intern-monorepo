import { AddEmployee } from './_components/modal/AddEmployee';
import { PaginationDemo } from './_components/Pagination';

const EmployeeDetailsPage = () => {
  return (
    <div>
      <div className="flex justify-center ">
        <AddEmployee />
      </div>
      <PaginationDemo />
    </div>
  );
};
export default EmployeeDetailsPage;
