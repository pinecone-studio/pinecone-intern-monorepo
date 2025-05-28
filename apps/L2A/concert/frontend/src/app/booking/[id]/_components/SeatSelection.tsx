'use client';
import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Concert } from '@/generated';
import FormatDate from '@/app/_utils/format-date';
import { DateSelector } from '../../_utils/DataSelector';
import { TotalPriceBreakdown } from '../../_utils/TotalPriceBreakdown';
import { useBooking } from '@/app/_components/context/BookingContext';
import { TicketList } from '../../_utils/TicketList';
import { useAuth } from '@/app/_components/context/AuthContext';

type SeatInfoProps = {
  event: Concert;
};

export type TicketOption = {
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

    opts.push({
      type,
      count: seatData.availableTickets,
      price: seatData.price,
      formattedPrice: `${seatData.price.toLocaleString('mn-MN')}₮`,
      color,
      selected: 0,
    });

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

const SeatSelection: FC<SeatInfoProps> = ({ event }) => {
  const { dates, selectedDay, setSelectedDay, ticketOptions, selectedSeat, incrementTicketQuantity, decrementTicketQuantity } = useSeatData(event?.seatData);
  const { setBooking } = useBooking();
  const { user } = useAuth();

  const saveBooking = () => {
    if (!user) {
      alert('Error: User ID is required to save booking.');
      return;
    }

    setBooking({
      userId: user.id,
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
      <Button
        data-testid="purchase-button"
        onClick={saveBooking}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Тасалбар авах
      </Button>
    </div>
  );
};

export default SeatSelection;
