'use client';
import { useAuth } from '@/app/_components/context/AuthContext';
import { Ticket, useUserTicketsQuery } from '@/generated';
import { Snackbar } from '@mui/material';
import React from 'react';

const formatPrice = (value: number) => value.toLocaleString() + '₮';
const formatDate = (timestamp: string) => new Date(Number(timestamp)).toLocaleString('mn-MN', { dateStyle: 'medium', timeStyle: 'short' });

const OrderHistory = () => {
  const { user } = useAuth();

  const { data, loading, error } = useUserTicketsQuery({
    variables: { userId: user?.id ?? '' },
    skip: !user,
  });

  const tickets = data?.userTickets?.filter((c): c is Ticket => c !== null) ?? [];

  return (
    <div className="bg-[#1c1c1e] text-white rounded-xl p-6 space-y-6" data-cy="order-card">
      {!user ? (
        <div data-cy="order-login-warning">Эхлээд нэвтэрнэ үү!</div>
      ) : (
        <>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Түр хүлээнэ үү!" />
          <Snackbar autoHideDuration={500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} message={error?.message} />

          <h2 className="text-2xl font-semibold" data-cy="order-title">
            🎟️ Захиалгын түүх
          </h2>

          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.id} className="bg-[#2c2c2e] rounded-lg p-4 shadow-lg space-y-4" data-cy={`ticket-${ticket.id}`}>
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold">{ticket.concert.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{ticket.concert.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Нээлт: {ticket.concert.doorOpen} | Эхлэх: {ticket.concert.musicStart}
                    </p>
                    <p className="text-xs text-gray-400">Захиалсан: {formatDate(ticket.createdAt)}</p>
                  </div>
                </div>

                {/* Ticket Types */}
                <div className="bg-[#3a3a3c] p-3 rounded space-y-2">
                  {Object.entries(ticket.ticket)
                    .filter(([type]) => type !== '__typename')
                    .map(([type, detail]: any) => (
                      <div key={type} className="flex justify-between text-sm" data-cy={`ticket-type-${type}`}>
                        <span className="text-white font-medium">{type}</span>
                        <span className="text-gray-300">
                          {detail.price.toLocaleString()}₮ × {detail.count} = {(detail.price * detail.count).toLocaleString()}₮
                        </span>
                      </div>
                    ))}
                </div>

                {/* Total */}
                <div className="text-right font-bold text-lg text-green-400" data-cy="ticket-total">
                  Нийт: {formatPrice(ticket.totalPrice)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400" data-cy="no-tickets-message">
              Тасалбарын түүх алга
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
