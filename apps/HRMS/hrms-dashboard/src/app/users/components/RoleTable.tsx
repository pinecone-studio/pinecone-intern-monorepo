'use client';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HrmsUser } from '@/generated';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import { Button } from '@/components/ui/button';

interface RoleTableProps {
  usersData: HrmsUser[];
  handleDelete: (id: string) => void;
}
const RoleTable: React.FC<RoleTableProps> = ({ usersData, handleDelete }) => {
return (
  <div data-testid="user-table">
    <Table className="px-6 overflow-hidden">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow className="bg-[#f7f7f8]">
          <TableHead className="w-[150px] rounded-tl-xl text-black">
            Name
          </TableHead>
          <TableHead className="w-[170px] h-[30px] text-black">
            Id
          </TableHead>
          <TableHead className="w-[170px] h-[30px] text-black">
            Roles
          </TableHead>
          <TableHead  className="w-[170px] rounded-tr-xl text-black">
            Email
          </TableHead>
          <TableHead  className="w-[5px] rounded-tr-xl text-black">
          Action
          </TableHead>
 
        </TableRow>
      </TableHeader>
      <TableBody>
     {usersData?.map((item, index) => (
      <TableRow key={index}>
      <TableCell >{item?.firstName}</TableCell>
      <TableCell >{item?._id}</TableCell>
      <TableCell >{item?.role}</TableCell>
      <TableCell >{item?.email}</TableCell>
      <TableCell>
            <Button data-testid="delete-user-button" aria-label="delete"  onClick={() => handleDelete(item?._id as string)} 
              className="border-none" variant={'outline'}>
              <DeleteIcon />
            </Button>
      </TableCell>
    </TableRow>
))}
      </TableBody>
      <TableFooter />
    </Table>
    </div>
    );
};

export default RoleTable;