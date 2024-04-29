'use client';
import { Modal, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { EmployeePagination } from '../_components';
import { EmployeesListTable } from './EmployeesListTable';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { perPage } from '../constants';

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

import { CreateEmployeeForm } from './CreateEmployeeForm';
import { useState } from 'react';

export const EmployeesList = () => {
  const [openNewEmployee, setOpenNewEmployee] = useState(false);
  const handleOpenNewEmployee = () => setOpenNewEmployee(true);
  const handleCloseNewEmployee = () => setOpenNewEmployee(false);
  return (
    <Stack p={4} width={'100%'} overflow={'scroll'}>
      <Stack p={3} bgcolor={'common.white'} width={'100%'}>
        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography data-cy="employeePageTitle" color={'primary.main'} fontSize={24} fontWeight={700}>
            Ажилчид
          </Typography>
          <Stack
            onClick={handleOpenNewEmployee}
            data-cy="addEmployeeBtn"
            flexDirection={'row'}
            alignItems={'center'}
            py={1}
            px={1.5}
            gap={0.5}
            borderRadius={'8px'}
            bgcolor={'primary.light'}
            color={'primary.main'}
            sx={{ cursor: 'pointer' }}
          >
            <Add color="inherit" fontSize="medium" />
            <Typography fontSize={14} fontWeight={600}>
              Ажилтан нэмэх
            </Typography>
          </Stack>
          <Modal open={openNewEmployee} onClose={handleCloseNewEmployee}>
            <Stack alignItems={'center'} justifyContent={'center'} width={'60%'} border={'0px'} position={'absolute'} top={'50%'} left={'50%'} sx={{ transform: 'translate(-50%,-50%)' }}>
              <CreateEmployeeForm handleCloseNewEmployee={handleCloseNewEmployee} />
            </Stack>
          </Modal>
        </Stack>
        <EmployeesListTable setPageCount={setPageCount} start={start} end={end} />
        <EmployeePagination data-cy="employee-pagination" pageCount={pageCount} handleClick={handleClick} searchPath={searchPath} />
      </Stack>
    </Stack>
  );
};
