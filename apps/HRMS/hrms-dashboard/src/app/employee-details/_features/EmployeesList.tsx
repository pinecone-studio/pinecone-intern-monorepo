'use client';
import { EmployeePagination } from '../_components';
import { EmployeesListTable } from './EmployeesListTable';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { perPage } from '../constants';
import { CreateEmployeeForm } from './CreateEmployeeForm';
import { AddIcon } from '../../../assets';

export const EmployeesList = () => {
  const [pageCount, setPageCount] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchPath: string | null = searchParams.get('employees');
  const start = (Number(searchPath) - 1) * perPage.limit;
  const end = Number(searchPath) * perPage.limit;
  const paginationFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleClick = (page: number) => {
    router.push(pathname + '?' + paginationFilter('employees', `${page}`));
  };

  const [openNewEmployee, setOpenNewEmployee] = useState(false);
  const handleOpenNewEmployee = () => setOpenNewEmployee(true);
  const handleCloseNewEmployee = () => setOpenNewEmployee(false);

  return (
    <>
      <main className="flex flex-col p-8 w-full">
        <div className="flex flex-col p-6 bg-white w-full">
          <div className="flex items-center justify-between">
            <p data-cy="employeePageTitle" className="text-main text-2xl font-bold">
              Ажилчид
            </p>
            <div onClick={handleOpenNewEmployee} data-cy="addEmployeeBtn" className="flex items-center py-2 px-3 gap-1 rounded-lg bg-light text-main cursor-pointer">
              <AddIcon/>
              <p className="text-sm font-semibold">Ажилтан нэмэх</p>
            </div>
            {openNewEmployee && (
              <>
                <div className="flex items-center justify-center w-[60%] rounded-2xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30 overflow-hidden">
                  <CreateEmployeeForm handleCloseNewEmployee={handleCloseNewEmployee} />
                </div>
                <div onClick={handleCloseNewEmployee} className='bg-[#00000080] h-full w-full fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'></div>
              </>
            )}
          </div>
          <EmployeesListTable setPageCount={setPageCount} start={start} end={end} />
          <EmployeePagination data-cy="employee-pagination" pageCount={pageCount} handleClick={handleClick} searchPath={searchPath} />
        </div>
      </main>
    </>
  );
};
