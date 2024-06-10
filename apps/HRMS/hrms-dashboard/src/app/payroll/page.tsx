'use client';

import Link from 'next/link';
import { useHelloQueryFromPayrollServiceQuery } from '../../generated';
import { PayrollMain } from './_features';
import { EmployeeData } from './_components/EmployeeData';

const PayrollPage = () => {
  const { data } = useHelloQueryFromPayrollServiceQuery();

  return (
    <div className="bg-[#F7F7F8] gap-6">
      <h1>hello from HRMS dashboard Payroll Page</h1>
      <h1>hello from Payroll Service Query {data?.helloQueryFromPayrollService}</h1>
      <PayrollMain />
      <EmployeeData />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default PayrollPage;
