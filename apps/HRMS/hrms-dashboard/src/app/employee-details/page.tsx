'use client';
import { EmployeePagination } from './_components';
import { AdditionalInformation } from './_features';

const EmployeeDetailsPage = () => {
  return (
    <div>
      <h1>hello from HRMS dashboard Employee details Page1</h1>
      <EmployeePagination />
      <AdditionalInformation phone={'98989898'} dependency={'father'} id="1" />
      <button data-cy="Home-Page-Button">Go back to home page</button>
    </div>
  );
};

export default EmployeeDetailsPage;
