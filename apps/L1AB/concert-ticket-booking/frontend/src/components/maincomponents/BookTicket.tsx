'use client';

import { StageStyle } from './StageStyle';
import { Button } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookTicketProps {
  _id: string | string[];
}

export const tickets = [
  { id: 1, name: 'Завсарын тасалбар', count: 38, price: 99000, color: '#C772C4' },
  { id: 2, name: 'Арын тасалбар', count: 24, price: 89000, color: '#D7D7F8' },
  { id: 3, name: 'Нүүрний тасалбар ', count: 15, price: 79000, color: '#4651C9' },
];

export const BookTicket = ({ _id }: BookTicketProps) => {
  const [counts, setCounts] = useState<number[]>(tickets.map(() => 0));

  const incrementCount = (index: number) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] += 1;
      return newCounts;
    });
  };

  const decrementCount = (index: number) => {
    setCounts((prevCounts) => prevCounts.map((count, i) => (i === index ? Math.max(count - 1, 0) : count)));
  };

  const calculateTotal = () => tickets.reduce((total, ticket, index) => total + ticket.price * counts[index], 0);

  const router = useRouter();

  return (
    <div data-testid="Book-Ticket-Component">
      <nav className="flex items-center justify-between border-b-[2px] border-[#27272A] pb-8 px-12">
        <Button className="bg-[#1F1F1F] h-10 w-10 text-white" data-testid="FaArrowLeftClick" onClick={() => router.push(`/events/${_id}`)}>
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
          </div>
          <div>
            {tickets.map((ticket, index) => (
              <div key={ticket.id} className="flex items-center py-4 justify-between gap-2 border-t-[2px] border-dashed border-[#27272A]">
                <div className="flex items-center">
                  <GoDotFill className="w-8 h-8" style={{ color: ticket.color }} />
                  <div>
                    <p className="text-[12px]" style={{ color: ticket.color }}>
                      {ticket.name} ({ticket.count})
                    </p>
                    <p className="text-[16px] text-white">{ticket.price.toLocaleString()}₮</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 rounded-xl border border-[#27272A] text-white bg-[#1F1F1F] cursor-pointer" data-testid="decrementCount" onClick={() => decrementCount(index)}>
                    -
                  </button>
                  <p className="text-white">{counts[index]}</p>
                  <button className="px-4 py-2 rounded-xl border border-[#27272A] text-white bg-[#1F1F1F] cursor-pointer" data-testid="incrementCount" onClick={() => incrementCount(index)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="h-fit grid gap-4 mt-6">
            {tickets.map(
              (ticket, index) =>
                counts[index] > 0 && (
                  <div key={ticket.id} className="flex justify-between text-[#A1A1AA]">
                    <p>
                      {ticket.name} x {counts[index]}
                    </p>
                    <p>{(ticket.price * counts[index]).toLocaleString()}₮</p>
                  </div>
                )
            )}
            <div className="flex justify-between">
              <p className="text-[#A1A1AA]">Нийт төлөх дүн:</p>
              <p className="text-[20px] font-bold text-white">{calculateTotal().toLocaleString()}₮</p>
            </div>
          </div>
          <Button className="bg-[#00B7F4] text-black w-full py-2 px-4 my-6 hover:bg-[#6fcceb]">Тасалбар авах</Button>
        </div>
      </div>
    </div>
  );
};
