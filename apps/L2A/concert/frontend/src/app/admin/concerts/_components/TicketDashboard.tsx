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

  const itemsPerPage = 5;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const totalPages = Math.ceil(concerts.length / itemsPerPage);

  const calculate = (concert: Concert): number => {
    return concert.seatData.reduce((prev, acc) => {
      const backseat = acc.seats.Backseat.availableTickets * acc.seats.Backseat.price;
      const VIP = acc.seats.VIP.availableTickets * acc.seats.VIP.price;
      const standard = acc.seats.Standard.availableTickets * acc.seats.Standard.price;
      return prev + backseat + VIP + standard;
    }, 0);
  };

  const getSeatTotals = (concert: Concert) => {
    return concert.seatData.reduce(
      (acc, curr) => {
        acc.VIP += curr.seats.VIP.availableTickets;
        acc.Standard += curr.seats.Standard.availableTickets;
        acc.Backseat += curr.seats.Backseat.availableTickets;
        return acc;
      },
      { VIP: 0, Standard: 0, Backseat: 0 }
    );
  };

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <Card className="overflow-x-auto rounded-xl shadow border border-gray-200">
        <table className="w-full text-left text-sm" data-testid="ticket-table">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
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
            {loading ? (
              <tr>
                <td colSpan={10} className="py-10 text-center">
                  <LoadingAnimation />
                </td>
              </tr>
            ) : (
              concerts.slice(start, end).map((row, idx) => {
                const seatTotals = getSeatTotals(row);
                const totalSeats = seatTotals.VIP + seatTotals.Standard + seatTotals.Backseat;

                return (
                  <tr key={row.id} className="border-t transition-colors hover:bg-gray-100" data-testid={`row-${idx}`}>
                    <td className="p-3">
                      <Button variant="ghost" size="icon" title="Онцлох">
                        {row.featured ? <FaStar className="text-yellow-500 drop-shadow-sm" /> : <FaRegStar className="text-gray-400 hover:text-yellow-400 transition" />}
                      </Button>
                    </td>
                    <td className="p-3 font-semibold">{row.title}</td>
                    <td className="p-3 truncate max-w-[150px]" title={row.artistName}>
                      {row.artistName}
                    </td>
                    <td className="p-3">{totalSeats}</td>
                    <td className="p-3">{seatTotals.VIP}</td>
                    <td className="p-3">{seatTotals.Standard}</td>
                    <td className="p-3">{seatTotals.Backseat}</td>
                    <td className="p-3">{row.seatData.length}</td>
                    <td className="p-3 font-semibold">{new Intl.NumberFormat('mn-MN').format(calculate(row))}₮</td>
                    <td className="p-3 flex gap-2">
                      <FeatureAnEvent idx={idx} id={row.id} row={row} />
                      <EditEventInfo concert={row} idx={idx} />
                      <DeleteConcertButton idx={idx} id={row.id} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Card>
      {!loading && (
        <div className="flex justify-center items-center mt-4 gap-4" data-testid="pagination">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Хуудас {page} / {totalPages}
          </span>
          <PaginationConcerts setPage={setPage} page={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default TicketDashboard;
