'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Concert, useConcertsQuery } from '@/generated';
import { useState } from 'react';
import DeleteConcertButton from './DeleteConcert';
import FeatureAnEvent from './FeatureAnEvent';
import EditEventInfo from '../_featured/EditEventInfo';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import PaginationConcerts from '../_featured/ConcertsPagination';

type TicketDashboardProps = {
  searchTerm: string;
};

const TicketDashboard = ({ searchTerm }: TicketDashboardProps) => {
  const { data, loading, error } = useConcertsQuery();
  const [page, setPage] = useState(1);

  const concerts = (data?.concerts ?? [])
    .filter((c): c is Concert => !!c && !!c.title && !!c.artistName)
    .filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.artistName.toLowerCase().includes(searchTerm.toLowerCase()));
  if (error) return <div>{error.message}</div>;
  if (loading) return <LoadingAnimation />;

  const itemsPerPage = 5;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  
  if (loading) {
    return <LoadingAnimation />;
  }
  const totalPages = Math.ceil(concerts.length / itemsPerPage);
  const calculate = (concert: Concert): number => {
    return concert.seatData.reduce((prev, acc) => {
      const backseat = acc.seats.Backseat.availableTickets * acc.seats.Backseat.price;
      const VIP = acc.seats.VIP.availableTickets * acc.seats.VIP.price;
      const standard = acc.seats.Standard.availableTickets * acc.seats.Standard.price;
      return prev + backseat + VIP + standard;
    }, 0);
  };

  return (
    <div className="p-4 w-3/4">
      <Card className="overflow-x-auto">
        <table className="w-full text-left text-sm" data-testid="ticket-table">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Онцлох</th>
              <th className="p-3">Тоглолтын нэр</th>
              <th className="p-3">Артист</th>
              <th className="p-3">Нийт тоо</th>
              <th className="p-3">VIP</th>
              <th className="p-3">Стандарт</th>
              <th className="p-3">Арын суудал</th>
              <th className="p-3">Тоглох өдрүүд</th>
              <th className="p-3">Нийт ашиг</th>
              <th className="p-3">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {concerts.slice(start, end).map((row, idx) => (
              <tr key={row?.id} className="border-t hover:bg-gray-50 transition" data-testid={`row-${idx}`}>
                <td className="p-3">
                  <Button variant="ghost" size="icon" title="Онцлох">
                    {row?.featured ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-500" />}
                  </Button>
                </td>
                <td className="p-3 font-semibold">{row?.title}</td>
                <td className="p-3 truncate max-w-[150px]">{row?.artistName}</td>
                <td className="p-3">{row.seatData[0].seats.VIP.availableTickets + row.seatData[0].seats.Standard.availableTickets + row.seatData[0].seats.Backseat.availableTickets}</td>
                <td className="p-3">{row.seatData[0].seats.VIP.availableTickets}</td>
                <td className="p-3">{row.seatData[0].seats.Standard.availableTickets}</td>
                <td className="p-3">{row.seatData[0].seats.Backseat.availableTickets}</td>
                <td className="p-3">{row.seatData.length}</td>
                <td className="p-3 font-semibold">{calculate(row).toLocaleString()}</td>
                <td className="p-3 flex gap-2">
                  <FeatureAnEvent idx={idx} id={row.id} />
                  <EditEventInfo concert={row} idx={idx} />
                  <DeleteConcertButton idx={idx} id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="flex justify-center mt-4 gap-2" data-testid="pagination">
        <PaginationConcerts setPage={setPage} page={page} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default TicketDashboard;
