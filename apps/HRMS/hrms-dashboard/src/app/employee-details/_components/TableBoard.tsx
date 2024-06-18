import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export const invoices = [
  {
    name: 'Б. Наранцацралт',
    profession: 'UI/UX Дизайнер',
    state: 'Үндсэн',
    email: 'ganbat@gmail.com',
    phoneNumber: 88888888,
  },
  {
    name: 'М.Ганбат',
    profession: 'UI/UX Дизайнер',
    state: 'Үндсэн',
    email: 'ganbat@gmail.com',
    phoneNumber: 88888888,
  },
  {
    name: 'Д. Маралмаа',
    profession: 'UI/UX Дизайнер',
    state: 'Үндсэн',
    email: 'ganbat@gmail.com',
    phoneNumber: 88888888,
  },
  // Add other objects as needed
];

export const TableDemo = () => {
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
        {invoices.map((invoice, index) => (
          <TableRow data-testid={`TableContent-${index}`} key={invoice.name}>
            <TableCell data-testid={`tableCell-1-${index}`} className="font-medium">
              {invoice.name}
            </TableCell>
            <TableCell data-testid={`tableCell-2-${index}`}>{invoice.profession}</TableCell>
            <TableCell data-testid={`tableCell-3-${index}`}>{invoice.email}</TableCell>
            <TableCell data-testid={`tableCell-4-${index}`}>{invoice.phoneNumber}</TableCell>
            <TableCell data-testid={`tableCell-5-${index}`} className="text-right">
              {invoice.state}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
