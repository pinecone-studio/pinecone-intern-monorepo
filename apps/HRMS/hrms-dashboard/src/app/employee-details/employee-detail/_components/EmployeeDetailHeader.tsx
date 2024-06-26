import Link from 'next/link';
import { BackIcon } from './SVG/BackIcon';

const EmployeeDetailHeader = () => {
  return (
    <div data-cy="employeeDetailHeader" data-testid="employeeDetailHeader" className="flex w-full border-b-gray-400 border-[1px] h-[56px]">
      <Link href={'./employee-details'}>
        <button data-cy="headerIcon " className="flex justify-center items-center w-[50px] h-full ">
          <BackIcon></BackIcon>
        </button>
      </Link>
      <div data-cy="Employee-Detail-children" className=" w-full flex justify-center items-center text-center">
        Ажилтны дэлгэрэнгүй
      </div>
    </div>
  );
};
export default EmployeeDetailHeader;
