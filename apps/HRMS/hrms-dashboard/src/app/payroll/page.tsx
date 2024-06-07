'use client';

import Link from 'next/link';
import { useHelloQueryFromPayrollServiceQuery } from '../../generated';
import { PayrollMain } from './_features';

const PayrollPage = () => {
  const { data } = useHelloQueryFromPayrollServiceQuery();

  return (
    <div className="bg-[#F7F7F8] w-full">
      <h1>hello from HRMS dashboard Payroll Page</h1>
      <h1>hello from Payroll Service Query {data?.helloQueryFromPayrollService}</h1>
      <div className='p-4 '>
       
        <PayrollMain />
      </div>

      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default PayrollPage;
