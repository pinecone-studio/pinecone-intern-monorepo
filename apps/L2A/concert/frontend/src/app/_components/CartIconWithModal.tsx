'use client';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartModal } from './CardModal';
import { useBooking } from './context/BookingContext';

export const CartIconWithModal = () => {
  const [showCart, setShowCart] = useState(false);
  const { booking, clearBooking } = useBooking();

  return (
    <>
      <button className="relative ml-[250px]" aria-label="Shopping Cart" onClick={() => setShowCart(true)}>
        <FaShoppingCart className="text-xl text-white" />
        {booking && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">!</span>}
      </button>
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} booking={booking} onClear={clearBooking} />
    </>
  );
};
