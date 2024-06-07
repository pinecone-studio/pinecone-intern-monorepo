'use client';

import Link from 'next/link';
import { useHelloQueryFromPayrollServiceQuery } from '../../generated';
import { PayrollMain } from './_features';

const PayrollPage = () => {
  const { data } = useHelloQueryFromPayrollServiceQuery();

  return (
    <div>
      <h1>hello from HRMS dashboard Payroll Page</h1>
      <h1>hello from Payroll Service Query {data?.helloQueryFromPayrollService}</h1>
      <PayrollMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
      <Link href={'/employee-details'}>
        <button data-testid="button" className="text-black m-4 border rounded-xl p-2 hover:text-white hover:bg-black ease-in-out transition-all">
          button
        </button>
      </Link>
    </div>
  );
};

export default PayrollPage;
