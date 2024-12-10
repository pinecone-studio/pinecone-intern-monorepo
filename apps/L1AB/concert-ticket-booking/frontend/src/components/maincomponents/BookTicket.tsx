'use client';
import { useCreateBookingTotalAmountMutation, useGetEventByIdQuery, useGetMeQuery } from '@/generated';
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
  const { data: user } = useGetMeQuery();
  const [createBooking] = useCreateBookingTotalAmountMutation();
  const [counts, setCounts] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
  const handleBooking = async () => {
    const userId = user?.getMe?._id || '674811296dd8cdcbd2b60cbe';
    const status = 'Баталгаажаагүй';
    const venuesToBook = eventDetails?.venues.map((venue, index) => ({ name: venue.name, price: venue.price, quantity: counts[index] })).filter((venue) => venue.quantity > 0);
    const bookingInput = {
      input: {
        eventId: id as string,
        selectedDate: selectedDate,
        status: status,
        userId: userId,
        venues: venuesToBook,
      },
    };
    try {
      const result = await createBooking({ variables: { input: bookingInput.input } });
      router.push(`/order/${result.data?.createBookingTotalAmount?._id}`);
    } catch (err) {
      setError('Тасалбар захиалах явцад алдаа гарлаа.');
    }
  };
  const isButtonDisabled = () => {
    return !selectedDate || !counts.some((count) => count > 0);
  };
  const getButtonStyles = () => {
    const disabled = isButtonDisabled();
    return {
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };
  };
  return (
    <div data-testid="Book-Ticket-Component">
      <nav className="flex items-center justify-between border-b-[2px] dark:border-[#27272A] border-[#c6c6c6] py-8 px-12 max-sm:px-3 max-sm:justify-evenly  max-md:px-3 max-md:justify-evenly max-lg:px-3 max-lg:justify-evenly max-2xl:justify-between">
        <Button className="bg-[#1F1F1F] h-10 w-10 text-white" data-testid="FaArrowLeftClick" onClick={() => router.push(`/events/${id}`)}>
          <FaArrowLeft />
        </Button>
        <p className="text-2xl font-semibold dark:text-white text-black max-sm:text-xl">Тасалбар захиалах</p>
        <p></p>
      </nav>
      <div className="flex flex-wrap justify-around items-center py-6 max-md:grid  max-lg:grid  max-lg:gap-12  ">
        <StageStyle   venue={eventDetails?.venues} />
        <div className="dark:bg-[#131313] bg-[#f2f2f2] rounded-2xl px-6 max-sm:px-3  max-md:px-3">
          <div className="h-fit grid gap-2 py-6">
            <p className="opacity-50 dark:text-white text-black">Тоглолт үзэх өдрөө сонгоно уу.</p>
            <Select value={selectedDate ?? undefined} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-[345px] dark:text-[#FAFAFA] dark:bg-[#27272A] bg-white text-black border-none" data-testid="SelectTrigger">
                <SelectValue placeholder="Өдөр сонгох" className="text-[#FAFAFA] outline-none" />
              </SelectTrigger>
              <SelectContent className="bg-[#27272A] text-[#FAFAFA]">
                <SelectGroup>
                  {eventDetails?.eventDate.map((item, index) => (
                    <SelectItem key={index} value={item} className="bg-[#27272A] text-[#FAFAFA] hover:bg-[#3A3A3D]" data-testid="option">
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {eventDetails?.venues.map((venue, index) => {
            const colors = ['#D7D7F8', '#C772C4', '#4651C9'];
            const color = colors[index % colors.length];
            return (
              <div key={index} className="flex items-center py-4 justify-between gap-2 border-t-[2px] border-dashed dark:border-[#27272A] border-[#c6c6c6]">
                <div className="flex items-center">
                  <GoDotFill className="w-8 h-8" style={{ color }} />
                  <div>
                    <p className="text-[12px]" style={{ color }}>
                      {venue.name} ({venue.quantity})
                    </p>
                    <p className="text-[16px] dark:text-white text-black">{venue.price.toLocaleString()}₮</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 rounded-xl border dark:border-[#27272A] dark:text-white text-black dark:bg-[#1F1F1F] bg-white cursor-pointer" data-testid="decrementCount" onClick={() => decrementCount(index)}>
                    -
                  </button>
                  <p className="dark:text-white text-black" data-testid={`ticket-count-${index}`}>
                    {counts[index] || 0}
                  </p>
                  <button className="px-4 py-2 rounded-xl border dark:border-[#27272A] dark:text-white text-black dark:bg-[#1F1F1F] bg-white cursor-pointer" data-testid="incrementCount" onClick={() => incrementCount(index)}>
                    +
                  </button>
                </div>
              </div>
            );
          })}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="h-fit grid gap-4 mt-6">
            {eventDetails?.venues.map(
              (venue, index) =>
                (counts[index] || 0) > 0 && (
                  <div key={index} className="flex justify-between dark:text-[#A1A1AA] text-black opacity-50">
                    <p>
                      {venue.name} x {counts[index]}
                    </p>
                    <p>{(venue.price * counts[index]).toLocaleString()}₮</p>
                  </div>
                )
            )}
            <div className="flex justify-between">
              <p className="dark:text-[#A1A1AA] text-black opacity-50">Нийт төлөх дүн:</p>
              <p className="text-[20px] font-bold dark:text-white text-black" data-testid="total-price">
                {calculateTotal().toLocaleString()}₮
              </p>
            </div>
          </div>
          <Button className="bg-[#00B7F4] text-black w-full py-2 px-4 my-6 hover:bg-[#6fcceb]" data-testid="Orderpush" onClick={handleBooking} disabled={isButtonDisabled()} style={getButtonStyles()}>
            Тасалбар авах
          </Button>
        </div>
      </div>
    </div>
  );
};
