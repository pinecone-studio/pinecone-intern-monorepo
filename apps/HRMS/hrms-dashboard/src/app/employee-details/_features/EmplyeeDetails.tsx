'use client';

import { Employee, useGetEmployeesQuery } from '@/generated';
import PaginationDemo from '../_components/Pagination';
import { TableDemo } from '../_components/TableBoard';
import { AddEmployee } from '../_components/modal/AddEmployee';

export const EmployeeDetails = () => {
  const { data } = useGetEmployeesQuery();
  const employees = data?.getEmployees;

  return (
    <div className="bg-[#F7F7F8] p-8 h-screen">
      <div className="bg-white  rounded-xl  pb-6 flex flex-col justify-between">
        <AddEmployee />
        <div className="pb-6">
          <TableDemo employees={employees as Employee[]} />
        </div>
        <PaginationDemo />
      </div>
    </div>
  );
};
