import { Department } from '@/generated';

export const FilterStatus = () => {
  const status = Object.values(Department);

  return (
    <div className="w-fit rounded-xl border border-[#ECEDF0] overflow-hidden">
      <select data-cy="filterStatus" className="flex bg-white w-fit justify-center items-center rounded-xl border-r-8 border-transparent py-2 px-3 text-sm font-semibold text-main">
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
