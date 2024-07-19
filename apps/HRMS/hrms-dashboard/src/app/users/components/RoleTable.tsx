'use client';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HrmsUser } from '@/generated';


const RoleTable = ({usersData}:{usersData: HrmsUser[]}) => {
return (
    <Table className="px-6">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow data-testid="table-row" className="bg-[#f7f7f8]">
          <TableHead data-testid="tableHead-1" className="w-[150px] rounded-tl-xl text-black">
            Name
          </TableHead>
          <TableHead data-testid="tableHead-2" className="w-[170px] h-[30px] text-black">
            Id
          </TableHead>
          <TableHead data-testid="tableHead-3" className="w-[170px] h-[30px] text-black">
            Roles
          </TableHead>
          <TableHead data-testid="tableHead-4" className="w-[170px] rounded-tr-xl text-black">
            Email
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
     {usersData?.map((item, index) => {
      return <TableRow key={index}>
      <TableCell>{item?.firstName}</TableCell>
      <TableCell>{item?._id}</TableCell>
      <TableCell>{item?.role}</TableCell>
      <TableCell>{item?.email}</TableCell>
    </TableRow>
     })}
      </TableBody>
      <TableFooter />
    </Table>
  );
};

export default RoleTable;