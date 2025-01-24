import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

const invoices = [
  {
    invoice: '001',
    paymentStatus: 'Shagai Nyamdorj',
    totalAmount: '1 Adult',
    paymentMethod: 'Flower Hotel Ulaanbaatar',
  },
];

export const GuestDataTable = () => {
  return (
    <Link href="/admin/guests/info" className="border border-[#E4E4E7] rounded-[6px] bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead className="text-right">Guests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Link>
  );
};
