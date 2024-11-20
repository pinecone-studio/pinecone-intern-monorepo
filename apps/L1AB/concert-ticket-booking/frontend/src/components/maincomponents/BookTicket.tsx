'use client';

import { StageStyle } from './StageStyle';
import { Button } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa6';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoDotFill } from 'react-icons/go';
import { useState } from 'react';
import Link from 'next/link';

export const tickets = [
  { id: 1, name: 'Завсарын тасалбар', count: 38, price: '99’000₮', color: '#C772C4' },
  { id: 2, name: 'Арын тасалбар', count: 24, price: '89’000₮', color: '#D7D7F8' },
  { id: 3, name: 'Нүүрний тасалбар ', count: 15, price: '79’000₮', color: '#4651C9' },
];

export const BookTicket = () => {
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

  return (
    <div data-testid="Book-Ticket-Component">
      <nav className="flex items-center justify-between border-b-[2px] border-[#27272A] pb-8 px-12">
        <Link href={`/`}>
          <Button className="bg-[#1F1F1F] h-10 w-10 text-white">
            <FaArrowLeft />
          </Button>
        </Link>
        <p className="text-2xl font-semibold text-white">Тасалбар захиалах</p>
        <p></p>
      </nav>
      <div className=" flex justify-around items-center py-6">
        <div>
          <StageStyle />
        </div>
        <div className="bg-[#131313] rounded-2xl px-6 ">
          <div className="h-fit grid gap-2 py-6">
            <p className="opacity-50 text-white">Тоглолт үзэх өдрөө сонгоно уу.</p>
            <Select>
              <SelectTrigger className="w-[300px] text-[#FAFAFA] bg-[#27272A]">
                <SelectValue placeholder="Өдөр сонгох" className="text-[#FAFAFA] outline-none" />
              </SelectTrigger>
              <SelectContent className="bg-[#27272A] text-[#FAFAFA]">
                <SelectGroup>
                  <SelectItem value="apple" className="bg-[#27272A] text-[#FAFAFA] hover:bg-[#3A3A3D]">
                    Apple
                  </SelectItem>
                  <SelectItem value="banana" className="bg-[#27272A] text-[#FAFAFA] hover:bg-[#3A3A3D]">
                    Banana
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            {tickets.map((ticket, index) => (
              <div key={ticket.id} className="flex items-center py-4 justify-between gap-2 border-t-[2px] border-dashed border-[#27272A]">
                <div className="flex items-center">
                  <GoDotFill className="w-8 h-8 " style={{ color: ticket.color }} />
                  <div>
                    <p className="text-[12px] " style={{ color: ticket.color }}>
                      {ticket.name} ({ticket.count})
                    </p>
                    <p className="text-[16px] text-white">{ticket.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4  ">
                  <div className="px-4 py-2 rounded-xl border border-[#27272A] text-white bg-[#1F1F1F] cursor-pointer" onClick={() => decrementCount(index)}>
                    -
                  </div>
                  <p className="text-white"> {counts[index]}</p>
                  <div className="px-4 py-2 rounded-xl border border-[#27272A] text-white bg-[#1F1F1F] cursor-pointer" onClick={() => incrementCount(index)}>
                    +
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-fit grid gap-4 mt-6">
            <div className="flex justify-between text-[#A1A1AA]">
              <p>Энгийн тасалбар x 3</p>
              <p>267’000₮</p>
            </div>
            <div className="flex justify-between text-[#A1A1AA]">
              <p>VIP тасалбар x 2</p>
              <p>267’000₮</p>
            </div>
            <div className="flex justify-between ">
              <p className="text-[#A1A1AA]">Нийт төлөх дүн:</p>
              <p className="text-[20px] font-bold text-white">258’000₮</p>
            </div>
          </div>
          <Button className="bg-[#00B7F4] text-black w-full py-2 px-4 my-6">Тасалбар авах</Button>
        </div>
      </div>
    </div>
  );
};
