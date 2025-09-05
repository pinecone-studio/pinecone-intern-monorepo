import OrderDetail from '@/components/home/OrderDetail';
import React from 'react';
import { Navbar } from '@/components/sheets/Navbar';

const page = () => {
  return (
    <div className=" max-w-sm mx-auto bg-white min-h-screen">
      <Navbar />
      <OrderDetail />
    </div>
  );
};

export default page;
