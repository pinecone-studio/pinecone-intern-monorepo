'use client';
import { EmployeesList } from './_features/EmployeesList';
import { RefetchProvider } from '../../common/providers/RefetchProvider';

const EmployeeDetailsPage = () => {
  return (
    <RefetchProvider>
      <main className="bg-light w-full overflow-scroll relative">
        <EmployeesList />
      </main>
    </RefetchProvider>
  );
};

export default EmployeeDetailsPage;
