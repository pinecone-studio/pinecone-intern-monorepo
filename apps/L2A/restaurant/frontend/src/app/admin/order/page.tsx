"use client";

import orderData from "@/app/admin/order/_components/orderdata.json";
import MainCard from "@/app/admin/order/_features/MainCard";
import SecondCard from "@/app/admin/order/_features/SecondCard";
import Header from "./_features/Header";

const Order = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header/>
      <div>
        {orderData.orders.map((ordersData) => (
          <MainCard key={ordersData.orderNumber} order={ordersData} />
        ))}
      </div>
      <div>
        {orderData.orders.map((ordersData) => (
          <SecondCard key={ordersData.orderNumber} order={ordersData} />
        ))}
      </div>
    </div>
  )
};

export default Order;
