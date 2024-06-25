import { BackIcon } from './SVG/BackIcon';

const EmployeeDtailHeader = () => {
  return (
    <div data-cy="employeeDetailHeader" className="flex w-full border-b-gray-400 border-[1px] h-[56px]">
      <button data-cy="headerIcon " className="flex justify-center items-center w-[50px] ">
        <BackIcon></BackIcon>
      </button>
      <div data-cy="Employee-Detail-children " className=" w-full flex justify-center items-center text-center">
        Ажилтны дэлгэрэнгүй
      </div>
    </div>
  );
};
export default EmployeeDtailHeader;
