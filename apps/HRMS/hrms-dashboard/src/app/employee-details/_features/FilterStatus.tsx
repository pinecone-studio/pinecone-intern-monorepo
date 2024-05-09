import { EmploymentStatus } from '@/generated';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';

export const FilterStatus = () => {
  const status = Object.values(EmploymentStatus);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const employmentStatusQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const defaultValue = searchParams.get('employmentStatus');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    router.push(pathname + '?' + employmentStatusQuery('employmentStatus', selected));
  };

  return (
    <div className="w-fit rounded-xl border border-[#ECEDF0] overflow-hidden">
      <select
        data-cy="filterStatus"
        className="flex bg-white w-fit justify-center items-center rounded-xl border-r-8 border-transparent py-2 px-3 text-sm font-semibold text-main"
        onChange={handleChange}
        defaultValue={defaultValue || ''}
      >
        <option value="" className="gap-2 bg-white flex justify-between text-light" selected hidden>
          Төлөв
        </option>
        {status?.map((job, index) => (
          <option className="bg-error" key={index} value={job}>
            {job}
          </option>
        ))}
      </select>
    </div>
  );
};
