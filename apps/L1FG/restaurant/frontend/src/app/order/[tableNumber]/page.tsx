'use client';

import React from 'react';
import OrderPageComponent from '../../../components/order/OrderPageComponent';

const OrderPage = ({ params }: { params: { tableNumber: number } }) => {
  return (
    <div className="flex max-w-full justify-center">
      <OrderPageComponent tableNumber={params.tableNumber} />
    </div>
  );
};

export default OrderPage;
