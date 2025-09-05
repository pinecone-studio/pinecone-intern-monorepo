import OrderDetail from '@/components/home/OrderDetail';
import { Navbar } from '@/components/Navbar';
import React from 'react';

const page = () => {
  return (
    <div className=" max-w-sm mx-auto bg-white min-h-screen">
      <Navbar />
      <OrderDetail />
    </div>
  );
};

export default page;
