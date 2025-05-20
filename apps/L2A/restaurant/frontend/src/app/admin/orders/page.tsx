'use client';

import orderData from '@/app/admin/orders/_components/orders.json';
import OrderMainCard from '@/app/admin/orders/_components/OrderMainCard';
import OrderSecondCard from '@/app/admin/orders/_components/OrderSecondCard';
import OrderHeader from './_components/OrderHeader';

const Orders = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <OrderHeader />
      <div>
        {orderData.orders.map((ordersData) => (
          <OrderMainCard key={ordersData.orderNumber} order={ordersData} />
        ))}
      </div>
      <div>
        {orderData.orders.map((ordersData) => (
          <OrderSecondCard key={ordersData.orderNumber} order={ordersData} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
