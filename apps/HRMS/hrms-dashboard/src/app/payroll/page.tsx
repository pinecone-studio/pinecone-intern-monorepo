'use client';

import Link from 'next/link';
import { useHelloQueryFromPayrollServiceQuery } from '../../generated';
import { PayrollMain } from './_features';

const PayrollPage = () => {
  const { data } = useHelloQueryFromPayrollServiceQuery();

  return (
    <div className="bg-[#F7F7F8] w-full ">
      <div className="p-4 flex flex-col gap-6">
        <h1 data-testid="h1" className="text-2xl font-bold not-italic px-4">Цалингийн тооцоолол</h1>
        {/* <h1>hello from Payroll Service Query {data?.helloQueryFromPayrollService}</h1> */}
        <div className=" ">
          <PayrollMain />
        </div>

        <Link href="/">
          <button>Go back to home page</button>
        </Link>
      </div>
    </div>
  );
};

export default PayrollPage;
