'use client';
import { MonthlySalaries } from './delivery/_features';
import { RefetchProvider } from '@/common/providers/RefetchProvider';

const PayrollPage = () => {
  return (
    <RefetchProvider>
      <main className="bg-light w-full overflow-scroll relative">
        <MonthlySalaries />
      </main>
    </RefetchProvider>
  );
};

export default PayrollPage;
