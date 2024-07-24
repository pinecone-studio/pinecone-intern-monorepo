'use client';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RoleModal from './RoleModal';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import { useGetGlmsUsersQuery } from '@/generated';

const RoleTable = () => {
  const { data } = useGetGlmsUsersQuery();
  return (
    <Table className="px-6 overflow-hidden">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow data-testid="table-row" className="bg-[#f7f7f8]">
          <TableHead className="w-[200px] rounded-tl-xl text-black">Name</TableHead>
          <TableHead className="w-[240px] h-[30px] text-black">Id</TableHead>
          <TableHead className="w-[240px] h-[30px] text-black">Roles</TableHead>
          <TableHead className="w-[200px] text-black">Email</TableHead>
          <TableHead className=" w-[10px] text-black"></TableHead>
          <TableHead className="w-[20px] rounded-tr-xl text-black"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.getGlmsUsers?.map((e, index) => (
          <TableRow key={index}>
            <TableCell>{e?.firstName}</TableCell>
            <TableCell>{e?._id}</TableCell>
            <TableCell>{e?.roles}</TableCell>
            <TableCell>{e?.email}</TableCell>
            <TableCell>
              <RoleModal />
            </TableCell>
            <TableCell>
              <button aria-label="delete" className="border-none">
                <DeleteIcon />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter />
    </Table>
  );
};

export default RoleTable;
