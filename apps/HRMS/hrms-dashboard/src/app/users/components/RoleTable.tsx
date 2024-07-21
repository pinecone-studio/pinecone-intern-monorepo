'use client';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HrmsUser } from '@/generated';


const RoleTable = ({usersData}:{usersData: HrmsUser[]}) => {
return (
    <Table className="px-6 overflow-hidden">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow className="bg-[#f7f7f8]">
          <TableHead data-cy="tableHead-1" className="w-[150px] rounded-tl-xl text-black">
            Name
          </TableHead>
          <TableHead data-cy="tableHead-2" className="w-[170px] h-[30px] text-black">
            Id
          </TableHead>
          <TableHead data-cy="tableHead-3" className="w-[170px] h-[30px] text-black">
            Roles
          </TableHead>
          <TableHead data-cy="tableHead-4" className="w-[170px] rounded-tr-xl text-black">
            Email
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
     {usersData?.map((item, index) => (
      <TableRow key={index}>
      <TableCell data-cy="tableHead-1" >{item?.firstName}</TableCell>
      <TableCell data-cy="tableHead-2">{item?._id}</TableCell>
      <TableCell data-cy="tableHead-3">{item?.role}</TableCell>
      <TableCell data-cy="tableHead-4">{item?.email}</TableCell>
    </TableRow>
))}
      </TableBody>
      <TableFooter />
    </Table>
  );
};

export default RoleTable;