import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useGetConcertsQuery } from '@/generated';
import { ActionButtons } from './ActionButtons';

interface DateFormatOptions {
  month: '2-digit';
  day: '2-digit';
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  } as DateFormatOptions);
};
export const TableHeaders = () => (
  <TableHeader>
    <TableRow className="bg-gray-50">
      <TableHead className="text-left">Тоглолтын нэр</TableHead>
      <TableHead className="text-left">Артист</TableHead>
      <TableHead className="text-left">Нийт тоо</TableHead>
      <TableHead className="text-left">VIP</TableHead>
      <TableHead className="text-left">Regular</TableHead>
      <TableHead className="text-left">Задгай</TableHead>
      <TableHead className="text-left">Тоглох өдрүүд</TableHead>
      <TableHead className="text-left">Нийт ашиг</TableHead>
      <TableHead className="text-left">Үйлдэл</TableHead>
    </TableRow>
  </TableHeader>
);

interface Concert {
  _id: string;
  featured?: boolean;
  concertName: string;
  artistName: (string | null)[];
  concertDay?: string | null;
  concertPlan: string;
  concertTime: string;
  concertPhoto: string;
  vipTicket?: { quantity?: number | null; price?: number | null } | null;
  regularTicket?: { quantity?: number | null; price?: number | null } | null;
  standingAreaTicket?: { quantity?: number | null; price?: number | null } | null;
}

const calculateTotalQuantity = (concert: Concert): number => {
  return (concert.vipTicket?.quantity || 0) + (concert.regularTicket?.quantity || 0) + (concert.standingAreaTicket?.quantity || 0);
};

const calculateTotalPrice = (concert: Concert): number => {
  return (concert.regularTicket?.price || 0) + (concert.standingAreaTicket?.price || 0) + (concert.vipTicket?.price || 0);
};

export const ConcertRow = ({ concert }: { concert: Concert }) => (
  <TableRow className="border text-black hover:bg-gray-50">
    <TableCell className="font-bold">{concert.concertName}</TableCell>
    <TableCell>{concert.artistName.join(', ')}</TableCell>
    <TableCell>{calculateTotalQuantity(concert)}</TableCell>
    <TableCell>{concert.vipTicket?.quantity}</TableCell>
    <TableCell>{concert.regularTicket?.quantity}</TableCell>
    <TableCell>{concert.standingAreaTicket?.quantity}</TableCell>
    <TableCell>{concert.concertDay ? formatDate(concert.concertDay) : '-'}</TableCell>
    <TableCell>{calculateTotalPrice(concert)}₮</TableCell>
    <TableCell>
      <ActionButtons />
    </TableCell>
  </TableRow>
);
export const TablePagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (_page: number) => void }) => (
  <Pagination className="text-black ">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={() => onPageChange(Math.max(1, currentPage - 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
      </PaginationItem>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationItem key={page}>
          <PaginationLink className="border" onClick={() => onPageChange(page)} isActive={currentPage === page}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
const AdminTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, loading, error } = useGetConcertsQuery();

  if (loading) return <div className="loader items-center justify-center flex text-black"></div>;
  if (error) return <div>Error loading concerts</div>;

  const concerts = data?.getConcerts || [];
  const totalPages = Math.ceil(concerts.length / itemsPerPage);
  const currentConcerts = concerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="w-full border rounded-lg bg-white overflow-hidden ">
        <Table>
          <TableHeaders />
          <TableBody>
            {currentConcerts.map((concert) => (
              <ConcertRow key={concert._id} concert={concert} />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className=" px-4 py-3">
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default AdminTable;
