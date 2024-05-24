'use client';
import { EmployeePagination } from '../_components';
import { EmployeesListTable } from './EmployeesListTable';
import { useEffect, useState } from 'react';
import { CreateEmployeeForm } from './CreateEmployeeForm';
import { AddIcon } from '../../../assets';
import { TableFilters } from './TableFilters';
import { useSearchParams } from 'next/navigation';
import { useRefetch } from '@/common/providers/RefetchProvider';

export const EmployeesList = () => {
  const { page, setPage, checked, setChecked } = useRefetch();

  const searchParams = useSearchParams();
  const searchPath: string | null = searchParams.get('search');
  const jobTitlePath: string | null = searchParams.get('jobTitle');
  const employmentStatusPath: string | null = searchParams.get('employmentStatus');

  const defaultValue = jobTitlePath || '';
  const [openNewEmployee, setOpenNewEmployee] = useState(false);
  const handleOpenNewEmployee = () => setOpenNewEmployee(true);
  const handleCloseNewEmployee = () => setOpenNewEmployee(false);

  useEffect(() => {
    setChecked(1);
  }, [searchPath, jobTitlePath, employmentStatusPath]);

  return (
    <>
      <main className="flex flex-col p-8 w-full">
        <div className="flex flex-col p-6 bg-white w-full rounded-xl">
          <div>
            <div className="flex items-center justify-between">
              <p data-cy="employeePageTitle" className="text-main text-2xl font-bold">
                Ажилчид
              </p>
              <div onClick={handleOpenNewEmployee} data-cy="addEmployeeBtn" className="flex items-center py-2 px-3 gap-1 rounded-lg bg-light text-main cursor-pointer">
                <AddIcon />
                <p className="text-sm font-semibold">Ажилтан нэмэх</p>
              </div>

              {openNewEmployee && (
                <>
                  <div
                    data-testid="create-employee"
                    className="flex items-center justify-center w-[60%] rounded-2xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30 overflow-hidden"
                  >
                    <CreateEmployeeForm handleCloseNewEmployee={handleCloseNewEmployee} />
                  </div>
                  <div onClick={handleCloseNewEmployee} className="bg-[#00000080] h-full w-full fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
                </>
              )}
            </div>
            <div className="flex gap-4 py-6">
              <TableFilters />
            </div>
            <EmployeesListTable setPage={setPage} checked={checked} defaultValue={defaultValue} />
          </div>
          <EmployeePagination page={page} setChecked={setChecked} checked={checked} />
        </div>
      </main>
    </>
  );
};
