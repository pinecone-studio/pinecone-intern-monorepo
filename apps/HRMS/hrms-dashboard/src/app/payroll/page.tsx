'use client';

import Link from 'next/link';
import { useHelloQueryFromPayrollServiceQuery } from '../../generated';
import { MonthlySalaries } from './delivery/_features';
import { PayrollPagination } from './delivery/_components/PayrollPagination';
import { PayrollButton } from './_components';

const PayrollPage = () => {
  const { data } = useHelloQueryFromPayrollServiceQuery();

  return (
    <div className="w-full bg-neutral-100 pt-[16px] pr-[16px] pl-[16px]">
      <div className="flex text-black font-bold gap-2">
        <Link href="/">
          <button>{'<-'}</button>
        </Link>
        <h1>Цалингийн түүх</h1>
      </div>
      {/* <h1>hello from Payroll Service Query {data?.helloQueryFromPayrollService}</h1> */}
      <MonthlySalaries />
      {/* <PayrollPagination /> */}
    </div>
  );
};

export default PayrollPage;
