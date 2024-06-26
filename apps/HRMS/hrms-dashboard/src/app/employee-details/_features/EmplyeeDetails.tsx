import PaginationDemo from '../_components/Pagination';
import { TableDemo } from '../_components/TableBoard';
import { AddEmployee } from '../_components/modal/AddEmployee';
import { EmployeePersonalinfo } from '../employee-detail/_components/EmployeePersonalinfo';

export const EmployeeDetails = () => {
  return (
    <div className="bg-[#F7F7F8] p-8 h-screen">
      <div className="bg-white  rounded-xl  pb-6 flex flex-col justify-between">
        <AddEmployee />
        <div className="pb-6">
          {' '}
          <TableDemo />
        </div>
        <EmployeePersonalinfo />
        <PaginationDemo />
      </div>
    </div>
  );
};
