'use client';
import { useRouter } from 'next/navigation';
import { EmployeePagination } from './_components';
import { Stack, Typography } from '@mui/material';
import { EmployeesListTable } from './_features/EmployeesListTable';

const EmployeeDetailsPage = () => {
  return (
    <div>
      <h1>hello from HRMS dashboard Employee details Page1</h1>
      <EmployeePagination />
      <button onClick={handleNavigateToHomePageButton} data-cy="Home-Page-Button">
        Go back to home page
      </button>
    </div>
  );
};

export default EmployeeDetailsPage;
