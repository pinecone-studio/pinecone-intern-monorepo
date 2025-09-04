'use client';

import { useGetFoodOrdersByUserQuery } from '@/generated';
import { decode } from 'jsonwebtoken';
import { Navbar } from './sheets/Navbar';
const OrdersHistory = () => {
  const token = localStorage.getItem('token');
  const user = decode(token!) as any;
  if (!token)
    return (
      <div>
        <Navbar />
        <div className="text-center">
          <p className="font-medium text-[#441500] pt-5 text-[20px]">Захиалгын түүх</p>
          <div className="flex justify-center  pt-4 px-4"> Та нэвтрэнэ үү!</div>
        </div>
      </div>
    );

  const { data, error } = useGetFoodOrdersByUserQuery({
    variables: { input: { userId: user?.user._id } },
  });

  if (error) return <p>{error.message}</p>; // ✅ Error-г JSX дээр харуулж байна

  return (
    <div>
      <Navbar />
      <div className="text-center">
        <p className="font-medium text-[#441500] pt-5 text-[20px]">Захиалгын түүх</p>
        <div className="flex justify-center  pt-4 px-4">
          <div className="w-full flex flex-col gap-4  justify-start rounded-xl">
            {data?.getFoodOrdersByUser?.length === 0 ? (
              <p>Захиалгаа олдсонгүй</p>
            ) : (
              data?.getFoodOrdersByUser?.map((order) => (
                <div key={order?.orderId} className="w-full rounded-xl bg-muted p-4 ">
                  <div className="flex ">
                    <div className="flex items-center gap-4 ">
                      <p className="text-[#441500] font-bold text-[20px]">#{order?.orderNumber}</p>
                      <div className="w-[120px] h-[20px] border-[1px] bg-white rounded-lg">
                        <p className="text-[12px]"> {order?.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-[12px] flex items-end">
                      {new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      }).format(order?.createdAt as any)}
                    </p>

                    <p className=" font-semibold">{order?.totalPrice}₮</p>
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
