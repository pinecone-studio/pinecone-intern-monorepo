'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetEmployeesQuery } from '@/generated';
import { Plus } from 'lucide-react';

const AdminHome = () => {
  const { data } = useGetEmployeesQuery({ variables: { input: 'Lead' } });
  const employees = data?.getEmployees;

  console.log(employees);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-medium">Нийт ажилчид</h2>
        <div className="flex items-center gap-4">
          <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
            <Plus className="mr-2 h-4 w-4" />
            Шинэ ажилтан бүртгэх
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Нэр, Овог</TableHead>
              <TableHead>Албан тушаал</TableHead>
              <TableHead>Имэйл</TableHead>
              <TableHead>Ажилд орсон огноо</TableHead>
              <TableHead className="text-center">Зайнаас ажилласан өдөр</TableHead>
              <TableHead className="text-center">Чөлөө авсан цаг</TableHead>
              <TableHead className="text-center">Цалинтай чөлөө авсан өдөр</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Select</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees?.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee?.username}</TableCell>
                <TableCell>{employee?.jobTitle}</TableCell>
                <TableCell>{employee?.email}</TableCell>
                <TableCell>{employee?.createdAt}</TableCell>
                <TableCell className="text-center">{employee?.remoteLimit} өдөр</TableCell>
                <TableCell className="text-center">{employee?.freeLimit} цаг</TableCell>
                <TableCell className="text-center">{employee?.paidLeaveLimit} өдөр</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-500">1-20 ажилтан харуулж байна (Нийт: 46)</div>
        <div className="text-sm text-gray-500">©2024 Copyright</div>
      </div>
    </div>
  );
};

export default AdminHome;
