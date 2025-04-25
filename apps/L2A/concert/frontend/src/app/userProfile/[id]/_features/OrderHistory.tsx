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
    <div className="bg-[#1c1c1e] text-white rounded-xl p-6 space-y-4" data-cy="order-card">
      <h2 className="text-2xl font-semibold mb-4" data-cy="order-title">
        Захиалгын түүх
      </h2>
      <div className="flex justify-between items-center text-sm text-gray-300">
        <div className="space-x-2" data-cy="order-info">
          <span>Захиалгын дугаар:</span>
          <span className="text-white font-semibold" data-cy="order-id">
            #{orderId}
          </span>
          <span data-cy="order-date">📅 {date}</span>
        </div>
        {status && (
          <span className="bg-gray-800 text-xs px-3 py-1 rounded" data-cy="order-status">
            {status}
          </span>
        )}
      </div>
      <div className="border border-gray-700 rounded-md p-4 space-y-2" data-cy="ticket-list">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="flex justify-between items-center" data-cy={`ticket-${idx}`}>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${ticket.color}`} data-cy={`ticket-color-${idx}`}></span>
              <span className={`font-semibold ${ticket.color === 'text-blue-500' ? 'text-blue-500' : ''}`} data-cy={`ticket-name-${idx}`}>
                {ticket.name}
              </span>
            </div>
            <span data-cy={`ticket-amount-${idx}`}>
              {ticket.price.toLocaleString()}₮ × {ticket.quantity} = {(ticket.price * ticket.quantity).toLocaleString()}₮
            </span>
          </div>
        ))}
      </div>
      <div className="text-right font-bold text-lg" data-cy="total-price">
        Төлсөн дүн: {total.toLocaleString()}₮
      </div>
    </div>
  );
};

export default OrderHistory;
