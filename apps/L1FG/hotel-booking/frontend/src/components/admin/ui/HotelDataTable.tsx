import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Star } from '../svg';

const invoices = [
  {
    invoice: '001',
    paymentStatus: 'Flower Hotel Ulaanbaatar',
    totalAmount: '8.4/10',
    paymentMethod: '5',
  },
];

export const HotelDataTable = () => {
  return (
    <Link href="/admin/hotel-detail" className="border border-[#E4E4E7] rounded-[6px] bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Star Rating</TableHead>
            <TableHead className="text-right">User Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Star />
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Link>
  );
};
