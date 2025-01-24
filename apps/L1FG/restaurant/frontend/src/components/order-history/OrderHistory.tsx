import React from "react";
import Header from "../../components/common/Header";

const OrderHistory = () => {
  const orders = [
    { id: "#33998", status: "Бэлтгэгдэж буй", date: "24.10.19 15:25", amount: "42'800₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "27'450₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "18'900₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "21'900₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "24'200₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "19'750₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "18'900₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "21'900₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "24'200₮" },
    { id: "#33998", status: "Дууссан", date: "24.10.19 15:25", amount: "19'750₮" },
  ];

  return (
    <div className="min-h-[500px]:  text-white px-4 py-6">
 
    <Header/>

   
      <h1 className="text-center text-xl text-black mb-6">Захиалгын түүх</h1>

      <div className="flex-1 overflow-y-scroll px-4 py-4 space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white text-black p-4 rounded-lg shadow-md"
          >
            <div>
              <div className="flex gap-2 items-center">
                              <div className="text-sm font-bold">{order.id}</div>
              <div className="text-xs text-gray-500">{order.status}</div>
              </div>

              <div className="text-xs text-gray-400">{order.date}</div>
            </div>
            <div className="text-xl font-bold">{order.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
