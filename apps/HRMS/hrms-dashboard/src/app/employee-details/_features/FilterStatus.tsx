import { useGetAllEmployeeQuery } from '@/generated';

export const FilterStatus = () => {
  const { data, loading } = useGetAllEmployeeQuery();
  const status = data?.getAllEmployee?.map((employee) => employee?.employmentStatus).filter((value, index, currentValue) => currentValue.indexOf(value) === index);

  return (
    <div className="w-fit rounded-xl border border-[#ECEDF0] overflow-hidden">
      <select className="flex bg-white w-fit justify-center items-center rounded-xl border-r-8 border-transparent py-2 px-3 text-sm font-semibold text-main">
        <option value="" className="gap-2 bg-white flex justify-between text-light" selected hidden>
          Төлөв
        </option>
        {!loading ? (
          status?.map((job, index) => (
            <option className="bg-error" key={index} value={job ?? ''}>
              {job}
            </option>
          ))
        ) : (
          <option className="loading loading-spinner loading-xs"></option>
        )}
      </select>
    </div>
  );
};
