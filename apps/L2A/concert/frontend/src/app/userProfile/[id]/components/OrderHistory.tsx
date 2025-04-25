'use client';

import React from 'react';

type Ticket = {
  name: string;
  price: number;
  quantity: number;
  color: string;
};

type OrderCardProps = {
  orderId: string;
  date: string;
  status?: string;
  tickets: Ticket[];
};

const OrderHistory = ({ orderId, date, status, tickets }: OrderCardProps) => {
  const total = tickets.reduce((sum, t) => sum + t.price * t.quantity, 0);

  return (
    <div className="bg-[#1c1c1e] text-white rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-300">
        <div className="space-x-2">
          <span>Захиалгын дугаар:</span>
          <span className="text-white font-semibold">#{orderId}</span>
          <span>📅 {date}</span>
        </div>
        {status ? <span className="bg-gray-800 text-xs px-3 py-1 rounded">{status}</span> : <button className="bg-gray-700 hover:bg-gray-600 text-sm px-4 py-1 rounded">Цуцлах</button>}
      </div>

      <div className="border border-gray-700 rounded-md p-4 space-y-2">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${ticket.color}`}></span>
              <span className={`font-semibold ${ticket.color === 'text-blue-500' ? 'text-blue-500' : ''}`}>{ticket.name}</span>
            </div>
            <span>
              {ticket.price.toLocaleString()}₮ × {ticket.quantity} = {(ticket.price * ticket.quantity).toLocaleString()}₮
            </span>
          </div>
        ))}
      </div>

      <div className="text-right font-bold text-lg">Төлсөн дүн: {total.toLocaleString()}₮</div>
    </div>
  );
};
export default OrderHistory;
