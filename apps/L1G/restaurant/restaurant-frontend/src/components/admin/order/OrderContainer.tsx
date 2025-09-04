'use client';
import { useGetFoodOrdersQuery } from '@/generated';
import { Toaster } from 'sonner';
import { OrderItem } from './OrderItem';

export const OrderContainer = () => {
  const { data, loading, error, refetch } = useGetFoodOrdersQuery();

  if (loading) return 'loading...';

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex sm:w-[600px] w-full h-fit flex-col gap-4 px-4">
      <Toaster position="bottom-right" />
      <h1 className="font-semibold text-[28px]">Захиалга</h1>

      <div className="flex flex-col gap-4 max-h-[1000px] overflow-scroll">
        {data?.getFoodOrders.length === 0 ? (
          <h1 data-testid="admin-empty-message" className="text-sm">
            Захиалга үүсээгүй байна.
          </h1>
        ) : (
          <>
            {data?.getFoodOrders.map((order) => (
              <OrderItem
                orderType={order.orderType}
                key={order.orderId}
                refetch={refetch}
                orderId={order.orderId}
                foodOrderItems={order.foodOrder as any}
                tableName={order!.table!.tableName}
                orderStatus={order.status}
                createdAt={order.createdAt as string}
                orderNumber={order.orderNumber}
                totalPrice={order.totalPrice}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
