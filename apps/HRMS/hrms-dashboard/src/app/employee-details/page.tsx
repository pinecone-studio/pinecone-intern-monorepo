'use client';
import { useRouter } from 'next/navigation';
import { CreateEmployeeForm } from './_features/CreateEmployeeForm';

const EmployeeDetailsPage = () => {
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from HRMS dashboard Employee details Page</h1>
      <CreateEmployeeForm />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
  );
};

export default EmployeeDetailsPage;
