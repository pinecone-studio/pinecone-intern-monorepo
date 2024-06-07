import { MonthlySalary } from '../_components/MonthlySalary';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRefetch } from '@/common/providers/RefetchProvider';
import { PayrollPagination } from '../_components';
import Link from 'next/link';
import ArrowBack from '@mui/icons-material/ArrowBack';

export const MonthlySalaries = () => {
  const { page, setPage, checked, setChecked } = useRefetch();

  const searchParams = useSearchParams();
  const searchPath: string | null = searchParams.get('search');
  const jobTitlePath: string | null = searchParams.get('jobTitle');
  const employmentStatusPath: string | null = searchParams.get('employmentStatus');

  const defaultValue = jobTitlePath || '';

  useEffect(() => {
    setChecked(1);
  }, [searchPath, jobTitlePath, employmentStatusPath]);

  return (
    <div className="w-full bg-neutral-100 pt-[16px] pr-[16px] pl-[16px]">
      <div className="flex text-black font-bold gap-2">
        <Link href="/">
          <div data-testid="back-button" className="cursor-pointer">
            <ArrowBack />
          </div>
        </Link>
        <h1>Цалингийн түүх</h1>
      </div>
      {/* <h1>hello from Payroll Service Query {data?.helloQueryFromPayrollService}</h1> */}
      <MonthlySalary setPage={setPage} checked={checked} defaultValue={defaultValue} />
      <PayrollPagination page={page} setChecked={setChecked} checked={checked} />
    </div>
  );
};
