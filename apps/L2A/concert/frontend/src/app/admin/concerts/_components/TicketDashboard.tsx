'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Pencil, Trash } from 'lucide-react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Concert, useConcertsQuery } from '@/generated';
import LoadingText from '@/app/_components/LoadingText';
import { useState } from 'react';

const TicketDashboard = () => {
  const { data, loading, error } = useConcertsQuery();
  const [page, setPage] = useState(1);
  const concerts = data?.concerts?.filter((c): c is Concert => c !== null) ?? [];

  if (error) {
    return <div>{error.message}</div>;
  }
  const itemsPerPage = 5;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  if (loading) {
    return <LoadingText />;
  }

  const calculate = (concert: Concert): number => {
    const result = concert.seatData.reduce((prev, acc) => {
      const backseat = acc.seats.Backseat.availableTickets * acc.seats.Backseat.price;
      const VIP = acc.seats.VIP.availableTickets * acc.seats.VIP.price;
      const standard = acc.seats.Standard.availableTickets * acc.seats.Standard.price;
      return prev + backseat + VIP + standard;
    }, 0);

    return result;
  };
  console.log(concerts);
  return (
    <div className="p-4 w-3/4">
      <Card className="overflow-x-auto">
        <table className="w-full  text-left text-sm" data-testid="ticket-table">
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
              <tr key={row.id} className="border-t hover:bg-gray-50 transition" data-testid={`row-${idx}`}>
                <td className="p-3">
                  <Button variant="ghost" size="icon" title="Онцлох">
                    {row.featured ? <FaStar className="text-yellow-500" data-testid={`featured-icon-${idx}`} /> : <FaRegStar className="text-gray-500" data-testid={`featured-icon-${idx}`} />}
                  </Button>
                </td>
                <td className="p-3 font-semibold" data-testid={`title-${idx}`}>
                  {row.title}
                </td>
                <td className="p-3 truncate max-w-[150px]" data-testid={`artist-${idx}`}>
                  {row.artistName}
                </td>
                <td className="p-3" data-testid={`total-${idx}`}>
                  {row.seatData[0].seats.VIP.availableTickets + row.seatData[0].seats.Standard.availableTickets + row.seatData[0].seats.Backseat.availableTickets}
                </td>
                <td className="p-3" data-testid={`vip-${idx}`}>
                  {row.seatData[0].seats.VIP.availableTickets}
                </td>
                <td className="p-3" data-testid={`regular-${idx}`}>
                  {row.seatData[0].seats.Standard.availableTickets}
                </td>

                <td className="p-3" data-testid={`open-${idx}`}>
                  {row.seatData[0].seats.Backseat.availableTickets}
                </td>
                <td className="p-3" data-testid={`date-${idx}`}>
                  {row.seatData.length}
                </td>
                <td className="p-3 font-semibold" data-testid={`income-${idx}`}>
                  {calculate(row).toLocaleString()}
                </td>
                <td className="p-3 flex gap-2">
                  <Button variant="ghost" size="icon" title="Онцлох" data-testid={`favorite-btn-${idx}`}>
                    <Star className="h-4 w-4 hover:text-yellow-500" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Засах" data-testid={`edit-btn-${idx}`}>
                    <Pencil className="h-4 w-4 hover:text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Устгах" data-testid={`delete-btn-${idx}`}>
                    <Trash className="h-4 w-4 hover:text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex justify-center mt-4 gap-2" data-testid="pagination">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Button onClick={() => setPage(num)} key={num} variant="outline" className="w-8 h-8 p-0" data-testid={`page-btn-${num}`}>
            {num}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TicketDashboard;
