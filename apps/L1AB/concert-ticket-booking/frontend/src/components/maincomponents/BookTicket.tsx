'use client';
import { useGetEventByIdQuery } from '@/generated';
import { StageStyle } from './StageStyle';
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookTicketProps {
  id: string | string[];
}

export const BookTicket = ({ id }: BookTicketProps) => {
  const { data } = useGetEventByIdQuery({ variables: { id: id as string } });
  const eventDetails = data?.getEventById;
  // const [createBooking] = useCreateBookingTotalAmountMutation();
  const [counts, setCounts] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const incrementCount = (index: number) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      const venueQuantity = eventDetails?.venues[index].quantity || 0;
      if ((newCounts[index] || 0) < venueQuantity) {
        newCounts[index] = (newCounts[index] || 0) + 1;
        setError(null);
      } else {
        setError(`Үлдсэн ${venueQuantity}ш тасалбараас илүү тасалбар авах боломжгүй.`);
      }
      return newCounts;
    });
  };

  const decrementCount = (index: number) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = Math.max((newCounts[index] || 0) - 1, 0);
      setError(null);
      return newCounts;
    });
  };

  const calculateTotal = () => eventDetails?.venues.reduce((total, venue, index) => total + venue.price * (counts[index] || 0), 0) || 0;

  const router = useRouter();

  return (
    <div data-testid="Book-Ticket-Component">
      <nav className="flex items-center justify-between border-b-[2px] border-[#27272A] py-8 px-12">
        <Button className="bg-[#1F1F1F] h-10 w-10 text-white" data-testid="FaArrowLeftClick" onClick={() => router.push(`/events/${id}`)}>
          <FaArrowLeft />
        </Button>
        <p className="text-2xl font-semibold text-white">Тасалбар захиалах</p>
        <p></p>
      </nav>
      <div className="flex flex-wrap justify-around items-center py-6">
        <div>
          <StageStyle />
        </div>
        <div className="bg-[#131313] rounded-2xl px-6">
          <div className="h-fit grid gap-2 py-6">
            <p className="opacity-50 text-white">Тоглолт үзэх өдрөө сонгоно уу.</p>
            <Select>
              <SelectTrigger className="w-[345px] text-[#FAFAFA] bg-[#27272A] border-none">
                <SelectValue placeholder="Өдөр сонгох" className="text-[#FAFAFA] outline-none" />
              </SelectTrigger>
              <SelectContent className="bg-[#27272A] text-[#FAFAFA]">
                <SelectGroup>
                  {eventDetails?.eventDate.map((item, index) => (
                    <SelectItem key={index} value={item} className="bg-[#27272A] text-[#FAFAFA] hover:bg-[#3A3A3D]">
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            {eventDetails?.venues.map((venue, index) => {
              const colors = ['#D7D7F8', '#C772C4', '#4651C9'];
              const color = colors[index % colors.length];
              return (
                <div key={index} className="flex items-center py-4 justify-between gap-2 border-t-[2px] border-dashed border-[#27272A]">
                  <div className="flex items-center">
                    <GoDotFill className="w-8 h-8" style={{ color }} />
                    <div>
                      <p className="text-[12px]" style={{ color }}>
                        {venue.name} ({venue.quantity})
                      </p>
                      <p className="text-[16px] text-white">{venue.price.toLocaleString()}₮</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-xl border border-[#27272A] text-white bg-[#1F1F1F] cursor-pointer" data-testid="decrementCount" onClick={() => decrementCount(index)}>
                      -
                    </button>
                    <p className="text-white" data-testid={`ticket-count-${index}`}>
                      {counts[index] || 0}
                    </p>
                    <button className="px-4 py-2 rounded-xl border border-[#27272A] text-white bg-[#1F1F1F] cursor-pointer" data-testid="incrementCount" onClick={() => incrementCount(index)}>
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="h-fit grid gap-4 mt-6">
            {eventDetails?.venues.map(
              (venue, index) =>
                (counts[index] || 0) > 0 && (
                  <div key={index} className="flex justify-between text-[#A1A1AA]">
                    <p>
                      {venue.name} x {counts[index]}
                    </p>
                    <p>{(venue.price * counts[index]).toLocaleString()}₮</p>
                  </div>
                )
            )}
            <div className="flex justify-between">
              <p className="text-[#A1A1AA]">Нийт төлөх дүн:</p>
              <p className="text-[20px] font-bold text-white" data-testid="total-price">
                {calculateTotal().toLocaleString()}₮
              </p>
            </div>
          </div>
          <Button className="bg-[#00B7F4] text-black w-full py-2 px-4 my-6 hover:bg-[#6fcceb']" data-testid="book-ticket-button" onClick={() => router.push(`/order/${id}`)}>
            Тасалбар авах
          </Button>
        </div>
      </div>
    </div>
  );
};
