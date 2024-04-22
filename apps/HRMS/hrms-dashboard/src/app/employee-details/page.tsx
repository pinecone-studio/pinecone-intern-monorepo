'use client';
import { useRouter } from 'next/navigation';
import { EmployeePagination } from './_components';

const EmployeeDetailsPage = () => {
  const router = useRouter();
  const handleNavigateToHomePageButton = () => router.push('/');

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
