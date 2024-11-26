'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';

interface OrderCheckoutProps {
  id: string | string[];
}
export const tickets = [
  { id: 2, name: 'Арын тасалбар', count: 8, price: 89000, color: '#D7D7F8' },
  { id: 1, name: 'Завсарын тасалбар', count: 2, price: 99000, color: '#C772C4' },
];
export const OrderCheckout = ({ id }: OrderCheckoutProps) => {
  const router = useRouter();
  const totalPrice = (ticket: { count: number; price: number }) => ticket.count * ticket.price;
  const grandTotal = tickets.reduce((sum, ticket) => sum + totalPrice(ticket), 0);
  return (
    <div className="h-[48rem]">
      <nav className="flex items-center justify-between border-b-[2px] border-[#27272A] py-8 px-12">
        <Button className="bg-[#1F1F1F] h-10 w-10 text-white" data-testid="BacktoPush" onClick={() => router.push(`/bookTicket/${id}`)}>
          <FaArrowLeft />
        </Button>
        <p className="text-2xl font-semibold text-white">Захиалга баталгаажуулах</p>
        <p></p>
      </nav>
      <div className="flex gap-8 px-28 py-[60px]">
        <div className="flex-1 bg-[#131313] p-8 rounded-md">
          <div className="w-full h-fit flex flex-col gap-6  ">
            <p className="font-bold text-2xl text-white">Захиалагчийн мэдээлэл</p>
            <div className="p-8 grid gap-6 text-[#FAFAFA] bg-[] rounded-xl">
              <div className="grid gap-2">
                <Label htmlFor="Утасны дугаар:" className="font-extralight">
                  Утасны дугаар:
                </Label>
                <Input
                  type="number"
                  placeholder="9900-0000"
                  className="px-3 py-1 border-[#27272A] bg-[#09090B]"
                  data-testid="OrderInput"
                  data-cy="Profile-Phone-Input"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.value.length > 8) {
                      target.value = target.value.slice(0, 8);
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Имэйл хаяг:" className="font-extralight">
                  Имэйл хаяг:
                </Label>
                <Input type="email" placeholder="name@example.com" className="px-3 py-1 border-[#27272A] bg-[#09090B]" data-cy="Profile-Email-Input" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[392px] bg-[#131313] p-6 rounded-md">
          <div className="flex gap-8">
            <p className="font-extralight text-white opacity-50 w-full">Бүтээгдэхүүний тоо</p>
            <p className="text-white font-semibold">x10</p>
          </div>
          <div>
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center py-4 justify-between gap-2 border-b-[2px] border-dashed border-[#27272A]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <GoDotFill className="w-8 h-8" style={{ color: ticket.color }} />
                    <p className="text-[12px]" style={{ color: ticket.color }}>
                      {ticket.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-[16px] text-white opacity-50">{ticket.price}₮</p>
                    <p className="text-white opacity-50"> x {ticket.count}</p>
                    <p className="text-white">{totalPrice(ticket).toLocaleString()}₮</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-4">
            <p className="text-[#A1A1AA]">Нийт төлөх дүн:</p>
            <p className="text-white text-xl font-semibold">{grandTotal}₮</p>
          </div>
          <Button className="w-full bg-[#00B7F4] hover:bg-[#6ad4f8] pt-2 px-4 text-black " data-testid="PaymentToPush" onClick={() => router.push(`/payment/${id}`)}>
            Үргэлжлүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
};
