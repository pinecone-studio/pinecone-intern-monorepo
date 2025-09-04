'use client';

import { useGetFoodOrdersByUserQuery } from '@/generated';
import { Logedinnav } from './sheets/Logedinnav';
import jwt from 'jsonwebtoken';
import { log } from 'node:console';

const OrdersHistory = () => {
  const token = localStorage.getItem('token');
  const userData = token ? jwt.decode((token || '') as string) : null;
  const user = userData as { user: { _id: string } } | null;
  const { data, error } = useGetFoodOrdersByUserQuery({
    variables: { input: { userId: String(user?.user._id) } },
  });
  console.log(localStorage);

  if (error) return <p>{error.message}</p>; // ✅ Error-г JSX дээр харуулж байна

  return (
    <div>
      <Logedinnav />
      <div className="text-center">
        <p className="font-medium text-[#441500] pt-5 text-[20px]">Захиалгын түүх</p>
        <div className="flex justify-center  pt-4">
          <div className="w-[345px] flex flex-col gap-4  justify-start rounded-md p-4">
            {data?.getFoodOrdersByUser?.length === 0 ? (
              <p>Захиалгаа олдсонгүй</p>
            ) : (
              data?.getFoodOrdersByUser?.map((order) => (
                <div key={order?.orderId} className="w-full border-[1px] rounded-md bg-muted p-4 ">
                  <div className="flex ">
                    <div className="flex items-center gap-4 ">
                      <p className="text-[#441500] font-bold text-[20px]">#{order?.orderNumber}</p>
                      <div className="w-[120px] h-[20px] border-[1px] bg-white rounded-md">
                        <p className="text-[12px]"> {order?.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-[10px] flex items-end">
                      {new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      }).format(order?.createdAt as any)}
                    </p>

                    <p>{order?.totalPrice}₮</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdersHistory;
