'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee } from '@/generated';
import { useRouter } from 'next/navigation';

export const TableDemo = ({ employees }: { employees: Employee[] }) => {
  const { push } = useRouter();

  const addToDetails = (employee: Employee) => {
    sessionStorage.setItem('employeeDetails', JSON.stringify(employee));
    push('/employee-details/employee-detail');
  };

  return (
    <Table className="px-6">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow data-testid="content" className="bg-[#F7F7F8]">
          <TableHead data-testid="tableHead-1" className="w-[251px] rounded-tl-xl">
            Ажилтан
          </TableHead>
          <TableHead data-testid="tableHead-2" className="w-[251px]">
            Мэргэжил
          </TableHead>
          <TableHead data-testid="tableHead-3" className="w-[251px]">
            И-Мэй
          </TableHead>
          <TableHead data-testid="tableHead-4" className="w-[198px]">
            Утасны дугаар
          </TableHead>
          <TableHead data-testid="tableHead-5" className="text-right w-[154px] rounded-tr-xl">
            Төлөв
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees?.map((employee, index) => (
          <TableRow data-testid={`TableContent-${index}`} key={employee.firstname}>
            <TableCell data-testid={`tableCell-1-${index}`} className="font-medium">
              <div className="flex gap-3 justify-start items-center">
                <div className="flex w-[40px] h-[40px] rounded-full" style={{ backgroundImage: `URL(${employee.imageURL})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                {employee.firstname}
              </div>
            </TableCell>
            <TableCell data-testid={`tableCell-2-${index}`}>{employee.jobTitle}</TableCell>
            <TableCell data-testid={`tableCell-3-${index}`}>{employee.email}</TableCell>
            <TableCell data-testid={`tableCell-4-${index}`}>{employee.department}</TableCell>
            <TableCell data-testid={`tableCell-5-${index}`} className="text-right">
              {employee.employmentStatus}
            </TableCell>
            <TableCell>
              <Button onClick={() => addToDetails(employee)}>edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
