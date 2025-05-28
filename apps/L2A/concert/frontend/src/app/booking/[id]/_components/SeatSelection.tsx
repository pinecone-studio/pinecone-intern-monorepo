'use client';
import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Concert } from '@/generated';
import FormatDate from '@/app/_utils/format-date';
import { DateSelector } from '../../_utils/DataSelector';
import { TotalPriceBreakdown } from '../../_utils/TotalPriceBreakdown';
import { useBooking } from '@/app/_components/context/BookingContext';

type SeatInfoProps = {
  event: Concert;
};

type TicketOption = {
  type: string;
  count: number;
  price: number;
  formattedPrice: string;
  color: string;
  selected: number;
};

const extractDates = (seatData?: Concert['seatData']): string[] =>
  seatData && seatData.length > 0
    ? seatData
        .map((d) => d?.date)
        .filter((d): d is string => Boolean(d))
        .map((d) => FormatDate(d))
    : [];

const buildTicketOptions = (seat?: Concert['seatData'][0]): TicketOption[] => {
  if (!seat || !seat.seats) return [];

  const seatTypes = [
    { key: 'Backseat' as const, type: 'Арын тасалбар', color: 'text-white' },
    { key: 'Standard' as const, type: 'Энгийн тасалбар', color: 'text-pink-400' },
    { key: 'VIP' as const, type: 'VIP тасалбар', color: 'text-blue-400' },
  ];

  return seatTypes.reduce<TicketOption[]>((opts, { key, type, color }) => {
    const seatData = seat.seats[key];
    if (seatData?.price && seatData.availableTickets >= 0) {
      opts.push({
        type,
        count: seatData.availableTickets,
        price: seatData.price,
        formattedPrice: `${seatData.price.toLocaleString('mn-MN')}₮`,
        color,
        selected: 0,
      });
    }
    return opts;
  }, []);
};

const useSeatData = (seatData: Concert['seatData']) => {
  const dates = extractDates(seatData);
  const [selectedDay, setSelectedDay] = useState<string>(dates[0]);
  const selectedSeat = seatData.find((d) => d.date && FormatDate(d.date) === selectedDay);
  const [ticketOptions, setTicketOptions] = useState<TicketOption[]>(() => buildTicketOptions(selectedSeat));

  const incrementTicketQuantity = (_index: number) => setTicketOptions((prev) => prev.map((opt, i) => (i === _index ? { ...opt, selected: Math.min(opt.count, opt.selected + 1) } : opt)));

  const decrementTicketQuantity = (_index: number) => setTicketOptions((prev) => prev.map((opt, i) => (i === _index ? { ...opt, selected: Math.max(0, opt.selected - 1) } : opt)));

  return {
    dates,
    selectedDay,
    setSelectedDay,
    ticketOptions,
    selectedSeat,
    incrementTicketQuantity,
    decrementTicketQuantity,
  };
};

const TicketList: FC<{
  options: TicketOption[];
  incrementQuantity: (_index: number) => void;
  decrementQuantity: (_index: number) => void;
}> = ({ options, incrementQuantity, decrementQuantity }) =>
  options.length > 0 ? (
    <div data-testid="ticket-list" className="space-y-4">
      {options.map((t, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-black rounded-lg border-2 border-dashed border-gray-600">
          <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${t.color === 'text-white' ? 'bg-white' : t.color === 'text-pink-400' ? 'bg-pink-400' : 'bg-blue-400'}`} />
            <span className={`${t.color} text-sm`}>
              {t.type} ({t.count})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => decrementQuantity(i)} className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white" disabled={t.selected === 0}>
              -
            </button>
            <span className="text-white w-6 text-center">{t.selected}</span>
            <button onClick={() => incrementQuantity(i)} className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white" disabled={t.selected >= t.count}>
              +
            </button>
            <span className="text-white font-semibold text-sm">{t.formattedPrice}</span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p data-testid="no-options" className="text-gray-400">
      Энд тасалбарын сонголт байхгүй байна
    </p>
  );

const SeatSelection: FC<SeatInfoProps> = ({ event }) => {
  const { dates, selectedDay, setSelectedDay, ticketOptions, selectedSeat, incrementTicketQuantity, decrementTicketQuantity } = useSeatData(event?.seatData);

  const { setBooking } = useBooking();

  const saveBooking = () => {
    console.log(selectedSeat);
    console.log(selectedDay);

    setBooking({
      concertId: event.id,
      concertName: event.title,
      date: selectedDay,
      seatDataId: selectedSeat!.id,
      tickets: ticketOptions
        .filter((opt) => opt.selected > 0)
        .map((opt) => ({
          type: opt.type,
          count: opt.selected,
          price: opt.price,
        })),
      totalPrice: ticketOptions.reduce((sum, opt) => sum + opt.selected * opt.price, 0),
    });

    alert('Booking saved successfully!');
  };

  if (!event || !event.seatData || dates.length === 0) {
    return <div className="text-white p-6">Тасалбар дууссан!</div>;
  }

  return (
    <div className="space-y-6 mx-auto p-6 bg-zinc-900 rounded-lg">
      <p className="text-white text-lg">Тоглолт үзэх өдрөө сонгоно уу!</p>
      <DateSelector dates={dates} selected={selectedDay} onChange={setSelectedDay} />
      <TicketList options={ticketOptions} incrementQuantity={incrementTicketQuantity} decrementQuantity={decrementTicketQuantity} />
      <TotalPriceBreakdown options={ticketOptions} />
      <Button onClick={saveBooking} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed">
        Тасалбар авах
      </Button>
    </div>
  );
};
export default SeatSelection;
