"use client";
import { OrderCard } from "../_features/OrderCard";
import { OrderHeader } from "../_features/OrderHeader";
import { mockOrders } from "../_mock/Order"

const OrderPage = () => {
    return (
        <div className="flex flex-col items-center w-full mt-[50px]">
            <OrderHeader />
            {mockOrders.map((order) => (
                <OrderCard
                    key={order.orderNumber}
                    orderNumber={order.orderNumber}
                    table={order.table}
                    time={order.time}
                    items={order.items}
                    total={order.total}
                    status={order.status}
                />
            ))}
        </div>
    );
}
export default OrderPage;

