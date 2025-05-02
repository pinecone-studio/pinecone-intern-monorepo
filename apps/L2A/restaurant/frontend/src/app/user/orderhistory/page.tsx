import { OrderStatusCard } from "./_components/OrderStatusCard";
import type { OrderStatus } from "./_components/OrderStatusCard";

const orders: {
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  totalPrice: number;
}[] = [
  {
    orderId: "33998",
    status: "done", 
    timestamp: "2025-04-29 15:25",
    totalPrice: 27450,
  },
  {
    orderId: "33999",
    status: "preparing",
    timestamp: "2025-04-29 15:30",
    totalPrice: 19800,
  },
];
const Page = () => {
  return (
    <div className="flex flex-col items-center w-full px-5">
      <p className="text-[#441500] text-xl py-8">Захиалгын түүх</p>
      <div className="flex flex-col gap-4 w-full">
        {orders.map((order) => (
          <OrderStatusCard
            key={order.orderId}
            orderId={order.orderId}
            status={order.status}
            timestamp={order.timestamp}
            totalPrice={order.totalPrice}
          />
        ))}
      </div>
    </div>
  );
};
export default Page;