'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Ticket = {
  type: string;
  count: number;
  price: number;
};

type Booking = {
  concertId: string;
  concertName: string;
  date: string;
  seatDataId: string;
  tickets: Ticket[];
  totalPrice: number;
};

type BookingContextType = {
  booking: Booking | null;
  setBooking: (_booking: Booking | null) => void;
  clearBooking: () => void;
};

export const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const storedBooking = localStorage.getItem('booking');
    if (storedBooking) {
      setBooking(JSON.parse(storedBooking));
    }
  }, []);

  useEffect(() => {
    if (booking) {
      localStorage.setItem('booking', JSON.stringify(booking));
    } else {
      localStorage.removeItem('booking');
    }
  }, [booking]);

  const clearBooking = () => {
    setBooking(null);
  };

  return <BookingContext.Provider value={{ booking, setBooking, clearBooking }}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('Context must with in the BookingProvider');
  }
  return context;
};
