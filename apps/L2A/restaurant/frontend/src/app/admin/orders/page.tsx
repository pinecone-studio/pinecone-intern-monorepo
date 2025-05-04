"use client";

import OrderMainCard from "@/app/admin/_features/OrderMainCard";
import orderData from "@/app/admin/_components/orders.json";

const Orders = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 gap-5">
      {orderData.orders.map((ordersData) => (
        <OrderMainCard key={ordersData.orderNumber} order={ordersData} />
      ))}
    </div>
  )
};

export default Orders;
