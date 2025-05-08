"use client";

import OrderMainCard from "@/app/admin/orders/_features/OrderMainCard";
import orderData from "@/app/admin/_components/orders.json";
import OrderSecondCard from "./_features/OrderSecondCard";
import OrderHeader from "./_features/OrderHeader";

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
  )
};
export default Orders;
