'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Pencil, Trash } from 'lucide-react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const initialData = [
  {
    title: 'Хайртай аав',
    artist: 'Болдбаатар, Чул...',
    vip: 50,
    regular: 120,
    open: 64,
    date: '10/23',
    income: "316'000'000₮",
    featured: true,
  },
  {
    title: 'Уурд мєнх',
    artist: 'Davaidasha',
    vip: 40,
    regular: 100,
    open: 94,
    date: '10/23',
    income: "316'000'000₮",
    featured: false,
  },
  {
    title: 'Only you',
    artist: 'Sally',
    vip: 30,
    regular: 80,
    open: 124,
    date: '10/23',
    income: "316'000'000₮",
    featured: true,
  },
];

const TicketDashboard = () => {
  const [tickets, setTickets] = useState(initialData);

  const handleDelete = (index: number) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
  };
  const toggleFeatured = (index: number) => {
    const updated = [...tickets];
    updated[index].featured = !updated[index].featured;
    setTickets(updated);
  };

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
              <th className="p-3">Regular</th>
              <th className="p-3">Задгай</th>
              <th className="p-3">Тоглох өдрүүд</th>
              <th className="p-3">Нийт ашиг</th>
              <th className="p-3">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((row, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50 transition" data-testid={`row-${idx}`}>
                <td className="p-3">
                  <Button variant="ghost" size="icon" onClick={() => toggleFeatured(idx)} title="Онцлох" data-testid={`feature-btn-${idx}`}>
                    {row.featured ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-500" />}
                  </Button>
                </td>
                <td className="p-3 font-semibold" data-testid={`title-${idx}`}>
                  {row.title}
                </td>
                <td className="p-3 truncate max-w-[150px]" data-testid={`artist-${idx}`}>
                  {row.artist}
                </td>
                <td className="p-3" data-testid={`total-${idx}`}>
                  {row.vip + row.regular + row.open}
                </td>
                <td className="p-3" data-testid={`vip-${idx}`}>
                  {row.vip}
                </td>
                <td className="p-3" data-testid={`regular-${idx}`}>
                  {row.regular}
                </td>
                <td className="p-3" data-testid={`open-${idx}`}>
                  {row.open}
                </td>
                <td className="p-3" data-testid={`date-${idx}`}>
                  {row.date}
                </td>
                <td className="p-3 font-semibold" data-testid={`income-${idx}`}>
                  {row.income}
                </td>
                <td className="p-3 flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleFeatured(idx)} title="Онцлох" data-testid={`favorite-btn-${idx}`}>
                    <Star className="h-4 w-4 hover:text-yellow-500" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Засах" data-testid={`edit-btn-${idx}`}>
                    <Pencil className="h-4 w-4 hover:text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(idx)} title="Устгах" data-testid={`delete-btn-${idx}`}>
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
          <Button key={num} variant="outline" className="w-8 h-8 p-0" data-testid={`page-btn-${num}`}>
            {num}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TicketDashboard;
