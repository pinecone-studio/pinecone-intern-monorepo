import { ReactNode } from 'react';
import React from 'react';
import EmployeeDtailHeader from './_components/EmployeeDetailHeader';

const EmployeeDtailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col flex-1">
      <EmployeeDtailHeader></EmployeeDtailHeader>
      <div className=" ">{children}</div>
    </div>
  );
};
export default EmployeeDtailLayout;
