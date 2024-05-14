import { EmployeeSearch } from '../_components';
import { FilterJobTitle } from './FilterJobTitle';
import { FilterStatus } from './FilterStatus';

export const TableFilters = () => {
  return (
    <div className="w-full bg-white flex gap-2.5 flex-wrap ">
      <EmployeeSearch />
      <FilterJobTitle />
      <FilterStatus />
    </div>
  );
};
