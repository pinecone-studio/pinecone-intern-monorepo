'use client';

import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  jobTitle: string;
  salary: number;
}

export interface GetAllEmployeesData {
  getAllEmployee: Employee[];
}

export const GET_ALL_EMPLOYEES = gql`
  query getAllEmployee {
    getAllEmployee {
      id
      firstname
      lastname
      email
      department
      jobTitle
      salary
    }
  }
`;

export const TableDemo = () => {
  const { loading, error, data } = useQuery<GetAllEmployeesData>(GET_ALL_EMPLOYEES);
  if (loading) return <p>Loading...</p>;
  if (error) {
    if (error.networkError) {
      console.error('Network Error:', error.networkError);
      return <p>Error: Network error occurred. Please check console for details.</p>;
    }
    console.error('GraphQL Error:', error);
    return <p>Error: An error occurred. Please check console for details.</p>;
  }

  const employees = data?.getAllEmployee ?? [];

  return (
    <Table className="mt-[120px]">
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
        {employees.map((employee, index) => (
          <TableRow data-testid={`TableContent-${index}`} key={employee.firstname}>
            <TableCell data-testid={`tableCell-1-${index}`} className="font-medium">
              {employee.lastname}
            </TableCell>
            <TableCell data-testid={`tableCell-2-${index}`}>{employee.jobTitle}</TableCell>
            <TableCell data-testid={`tableCell-3-${index}`}>{employee.email}</TableCell>
            <TableCell data-testid={`tableCell-4-${index}`}>{employee.department}</TableCell>
            <TableCell data-testid={`tableCell-5-${index}`} className="text-right">
              {employee.salary}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
