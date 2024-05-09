import { useGetJobTitlesQuery } from '@/generated';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';

export const FilterJobTitle = () => {
  const { data } = useGetJobTitlesQuery();
  const jobs = data?.getAllEmployee?.map((employee) => employee?.jobTitle).filter((value, index, currentValue) => currentValue.indexOf(value) === index);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobTitleQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    router.push(pathname + '?' + jobTitleQuery('jobTitle', selected));
  };

  return (
    <div className="rounded-xl border border-[#ECEDF0] overflow-hidden">
      <select
        data-cy="filterJob"
        className="flex bg-white w-fit justify-center items-center rounded-xl border-r-8 border-transparent py-2 px-3 text-sm font-semibold text-main"
        onChange={handleChange}
      >
        <option value="" className="gap-2 bg-white flex justify-between text-light" selected hidden>
          Мэргэжил
        </option>
        {jobs?.map((job, index) => (
          <option className="bg-error" key={index} value={job ?? ''}>
            {job}
          </option>
        ))}
      </select>
    </div>
  );
};
