'use client';
import { EmployeePagination } from './_components';

const EmployeeDetailsPage = () => {
  return (
    <div>
      <h1>hello from HRMS dashboard Employee details Page1</h1>
      <EmployeePagination />
      <button data-cy="Home-Page-Button">Go back to home page</button>
    </div>
  );
};

export default EmployeeDetailsPage;
