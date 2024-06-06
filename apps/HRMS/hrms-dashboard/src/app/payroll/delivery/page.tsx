'use client';

import Link from 'next/link';
// import { useHelloQueryFromPayrollServiceQuery } from '../../generated';
// import { PayrollMain } from './_features';
import { PayrollMain } from '../_features';
import { MonthSalary } from './_features/MonthSalary';

const SalaryPage = () => {
  // const { data } = useHelloQueryFromPayrollServiceQuery();

  return (
    <div>
      <h1>hello from HRMS dashboard Salary Page</h1>
      {/* <h1>hello from Payroll Service Query {data?.helloQueryFromPayrollService}</h1> */}
      <PayrollMain />
      <MonthSalary />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default SalaryPage;
