import { ReactNode } from 'react';
import React from 'react';
import EmployeeDetailHeader from './_components/EmployeeDetailHeader';

const EmployeeDtailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col flex-1">
      <EmployeeDetailHeader></EmployeeDetailHeader>
      <div className=" ">{children}</div>
    </div>
  );
};
export default EmployeeDtailLayout;
