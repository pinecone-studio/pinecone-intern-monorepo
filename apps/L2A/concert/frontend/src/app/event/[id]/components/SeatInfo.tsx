import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const SeatInfo = () => {
  const ticketOptions = [
    { type: 'Арын тасалбар', count: 123, price: "89'000₮", color: 'text-white' },
    { type: 'VIP тасалбар', count: 38, price: "129'000₮", color: 'text-blue-400' },
    { type: 'Энгийн тасалбар', count: 38, price: "159'000₮", color: 'text-pink-400' },
  ];
  return (
    <div className="space-y-6">
      <p className="text-white p-6">Тоглолт үзэх өдөрөө сонгоно уу.</p>
      <Select>
        <SelectTrigger className="w-full bg-white text-black dark:bg-zinc-800 dark:text-white border dark:border-zinc-700" data-cy="tag-trigger">
          <SelectValue placeholder="Өдөрөө сонгоно уу." />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-zinc-800 text-black dark:text-white border dark:border-zinc-700">
          <SelectItem value="day1" data-cy="tag-option">
            11 сарын 15
          </SelectItem>
          <SelectItem value="day2">11 сарын 16</SelectItem>
          <SelectItem value="day3">11 сарын 17</SelectItem>
          <SelectItem value="day4">11 сарын 18</SelectItem>
        </SelectContent>
      </Select>
      <div className="space-y-2">
        {ticketOptions.map((ticket, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 bg-gray-900 rounded border border-gray-700">
            <span className={`${ticket.color}`}>
              {ticket.type} ({ticket.count})
            </span>
            <span className="text-white">{ticket.price}</span>
          </div>
        ))}
      </div>
      <Button className="w-full bg-blue-400 hover:bg-blue-500 text-black font-semibold py-2 rounded" data-cy="submit day">
        Тасалбар захиалах
      </Button>
    </div>
  );
};

export default SeatInfo;
