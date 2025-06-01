'use client';
import { useAuth } from '@/app/_components/context/AuthContext';
import { Ticket, useUserTicketsQuery } from '@/generated';
import { Snackbar } from '@mui/material';
import React from 'react';
import OrderCard from './OrderCard';

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
            tickets.map((ticket) => <OrderCard key={ticket.id} ticket={ticket} />)
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
