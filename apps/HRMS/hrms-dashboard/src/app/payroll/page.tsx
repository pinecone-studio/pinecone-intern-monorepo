'use client';

import Link from 'next/link';
import { useHelloQueryFromPayrollServiceQuery } from '../../generated';
import { PayrollMain } from './_features';
import { AdvanceSalary } from './_components';

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
      <AdvanceSalary/>
    </div>
  );
};

export default PayrollPage;
