'use client';
import { Table, TableBody, TableCaption, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RoleTable = () => {
  return (
    <Table className="px-6">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow data-testid="" className="bg-[#f7f7f8]">
          <TableHead data-testid="tableHead-1" className="w-[150px] rounded-tl-xl text-black">
            Name
          </TableHead>
          <TableHead data-testid="tableHead-2" className="w-[170px] h-[30px] text-black">
            Id
          </TableHead>
          <TableHead data-testid="tableHead-3" className="w-[170px] h-[30px] text-black">
            Roles
          </TableHead>
          <TableHead data-testid="tableHead-4" className=" w-[170px] rounded-tr-xl text-black">
            Email
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody></TableBody>
      <TableFooter />
    </Table>
  );
};
export default RoleTable;
