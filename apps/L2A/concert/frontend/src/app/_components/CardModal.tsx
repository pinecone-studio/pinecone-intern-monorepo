'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react'; // Importing a close icon from Lucide
import { useCreateTicketOrderMutation } from '@/generated';
import { Snackbar } from '@mui/material';

type Ticket = {
  type: string;
  count: number;
  price: number;
};

type Booking = {
  concertName: string;
  date: string;
  tickets: Ticket[];
  totalPrice: number;
};

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onClear: () => void;
};

export const CartModal = ({ isOpen, onClose, booking, onClear }: CartModalProps) => {
  const [createTicket, { loading, data }] = useCreateTicketOrderMutation();
  if (!isOpen) return null;

  const onSubmit = async () => {
    const bookingString = localStorage.getItem('booking');
    const booking = JSON.parse(bookingString!);
    const { concertId, seatDataId, tickets, userId, date, totalPrice } = booking;
    try {
      await createTicket({ variables: { input: { concertId, seatDataId, tickets, date, totalPrice, userId } } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl shadow-black/50 w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-zinc-700">
          <h2 className="text-2xl font-bold text-white">Миний тасалбарууд</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-800" aria-label="Close modal">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Түр хүлээнэ үү~" />
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!data} message="Амжилттай захиаллаа!" />
          {booking ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-zinc-400">Тоглолт</p>
                  <p className="text-lg font-bold text-white">{booking.concertName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-zinc-400">Огноо</p>
                  <p className="text-white font-medium">{booking.date}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-zinc-400">Тасалбарууд</p>
                  <div className="space-y-2">
                    {booking.tickets.map((ticket, index) => (
                      <div key={index} className="flex justify-between items-center bg-zinc-800/50 p-3 rounded-lg">
                        <span className="text-white">{ticket.type}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-zinc-300">
                            {ticket.count} × {ticket.price.toLocaleString('mn-MN')}₮
                          </span>
                          <span className="font-medium text-white">{(ticket.count * ticket.price).toLocaleString('mn-MN')}₮</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-700">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Нийт дүн:</span>
                  <span className="text-xl font-bold text-white" data-testid="grand-total">
                    {booking.totalPrice.toLocaleString('mn-MN')}₮
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={onClear} className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20">
                  Цэвэрлэх
                </Button>{' '}
                <Button onClick={onSubmit} variant="outline" className="flex-1 bg-green-700 text-white border-green-700 hover:bg-green-800 hover:text-white">
                  Худалдан авах
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-lg text-zinc-300">Тасалбар байхгүй байна</p>
              <Button onClick={onClose} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                Тоглолт харах
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
