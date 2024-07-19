'use client';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RoleModal from './RoleModal';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import { Button } from '@/components/ui/button';

const RoleTable = () => {
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
          <TableHead data-testid="tableHead-4" className="w-[170px] text-black">
            Email
          </TableHead>
          <TableHead className="w-[20px] h-[30px] text-black"></TableHead>
          <TableHead className="w-[20px] h-[30px] rounded-tr-xl text-black"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>12345</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>
            <RoleModal />
          </TableCell>
          <TableCell>
            <Button aria-label="delete" className="border-none" variant={'outline'}>
              <DeleteIcon />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter />
    </Table>
  );
};

export default RoleTable;
