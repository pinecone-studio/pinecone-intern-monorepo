'use client';

import { fileManagement } from '@/file-management';
import { useRouter } from 'next/navigation';

export default async function Index() {
  const router = useRouter();

  const handleLeavingPageButton = () => {
    router.push('/leaving');
  };

  const handlePayrollPageButton = () => {
    router.push('/payroll');
  };
  const handleRecruitPageButton = () => {
    router.push('/recruiting');
  };

  const fileManagementLib = fileManagement();

  console.log(fileManagementLib);

  return (
    <div>
      <h1>hello from HRMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <button onClick={handleLeavingPageButton}>Go to Leaving page</button>
      <button onClick={handlePayrollPageButton}>Go to Payroll page</button>
      <button onClick={handleRecruitPageButton}>Go to Recruit page</button>
    </div>
  );
}
