'use client';

import React, { FC } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Concert } from '@/generated';
import FormatDate from '@/app/_utils/FormatDate';

type SeatInfoProps = {
  eventData: Concert;
};

type TicketOption = {
  type: string;
  count: number;
  price: string;
  color: string;
};

export function extractDates(seatData?: Concert['seatData']): string[] {
  if (!seatData || seatData.length === 0) return [];
  return seatData
    .map((d) => d?.date)
    .filter((d): d is string => Boolean(d))
    .map((d) => FormatDate(d));
}

export function buildTicketOptions(seat?: Concert['seatData'][0]): TicketOption[] {
  if (!seat || !seat.seats) return [];

  const seatTypes: Array<{
    key: 'Backseat' | 'Standard' | 'VIP';
    type: string;
    color: string;
  }> = [
    { key: 'Backseat', type: 'Арын тасалбар', color: 'text-white' },
    { key: 'Standard', type: 'Энгийн тасалбар', color: 'text-pink-400' },
    { key: 'VIP', type: 'VIP тасалбар', color: 'text-blue-400' },
  ];

  return seatTypes.reduce<TicketOption[]>((opts, { key, type, color }) => {
    const seatData = seat.seats[key];
    if (seatData?.price && seatData.availableTickets >= 0) {
      opts.push({
        type,
        count: seatData.availableTickets,
        price: `${seatData.price.toLocaleString('mn-MN')}₮`,
        color,
      });
    }
    return opts;
  }, []);
}

export function useSeatData(seatData?: Concert['seatData']) {
  const dates = extractDates(seatData);
  const [selectedDay, setSelectedDay] = React.useState<string | undefined>(dates[0]);
  const selectedSeat = seatData?.find((d) => d?.date && FormatDate(d.date) === selectedDay) ?? null;
  const ticketOptions = buildTicketOptions(selectedSeat);

  return { dates, selectedDay, setSelectedDay, ticketOptions };
}

export const DateSelector: FC<{
  dates: string[];
  selected?: string;
  onChange: (_day: string | undefined) => void;
}> = ({ dates, selected, onChange }) => {
  if (dates.length === 0) {
    return <p>Боломжтой өдөр байхгүй</p>;
  }

  return (
    <Select value={selected} onValueChange={onChange} aria-label="Select event date">
      <SelectTrigger className="w-full bg-white text-black dark:bg-zinc-800 dark:text-white border dark:border-zinc-700">
        <SelectValue placeholder="Тоглоомын өдрийг сонгоно уу" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-zinc-800 text-black dark:text-white border dark:border-zinc-700">
        {dates.map((d) => (
          <SelectItem key={d} value={d}>
            {d}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const TicketList: FC<{ options: TicketOption[] }> = ({ options }) => (
  <div className="space-y-4">
    {options.length > 0 ? (
      options.map((t, i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-black rounded-lg border-2 border-dashed border-gray-600">
          <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${t.color === 'text-white' ? 'bg-white' : t.color === 'text-pink-400' ? 'bg-pink-400' : 'bg-blue-400'}`}></span>
            <span className={t.color}>
              {t.type} ({t.count})
            </span>
          </div>
          <span className="text-white font-semibold">{t.price}</span>
        </div>
      ))
    ) : (
      <p className="text-gray-400">Энд тасалбарын сонголт байхгүй байна</p>
    )}
  </div>
);

const SeatInfo: FC<SeatInfoProps> = ({ eventData }) => {
  const { dates, selectedDay, setSelectedDay, ticketOptions } = useSeatData(eventData?.seatData);
  const isDisabled = !selectedDay || ticketOptions.length === 0;

  if (!eventData || !eventData.seatData || dates.length === 0) {
    return <div className="text-white p-6">No ticket information available</div>;
  }

  return (
    <div className="space-y-6 mx-auto">
      <p className="text-white text-lg">Тоглолт үзэх өдрөө сонгоно уу.</p>
      <DateSelector dates={dates} selected={selectedDay} onChange={setSelectedDay} />
      <TicketList options={ticketOptions} />
      <Button disabled={isDisabled} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded disabled:bg-gray-600 disabled:cursor-not-allowed">
        Тасалбар захиалах
      </Button>
    </div>
  );
};

export default SeatInfo;
