'use client';
import React, { ChangeEvent, useCallback } from 'react';
import { SearchSvg } from '../../../assets';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const EmployeeSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchPath: string | null = searchParams.get('search');
  const seacrhFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      router.push(pathname + '?' + seacrhFilter('search', e.target.value));
    }, 1000);
  };

  return (
    <div className="border flex gap-2 border-[#ECEDF0] p-1 rounded-lg min-w-[150px] md:min-w-[302px] justify-center items-center ">
      <div className="px-1">
        <SearchSvg />
      </div>
      <input data-testid="employee-search" type="text" defaultValue={searchPath!} onChange={handleChange} className="w-full outline-none bg-white" />
    </div>
  );
};
