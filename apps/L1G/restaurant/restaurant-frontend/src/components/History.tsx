'use client';
import { Navbar } from '@/components/Navbar';
import { useGetFoodOrdersByUserQuery } from '@/generated';

export default function OrdersHistory() {
  const { data, loading, error } = useGetFoodOrdersByUserQuery({
    variables: { input: { userId: '68b03cf9a1b630c331183254' } },
  });

  if (error) return <p>{error.message}</p>; // ✅ Error-г JSX дээр харуулж байна

  return (
    <div>
      <Navbar />
      <div className="text-center">
        <p className="font-medium text-[#441500] pt-5 text-[20px]">Захиалгын түүх</p>

        <div className="flex justify-center pt-4">
          <div className="w-[345px] bg-muted flex justify-start rounded-md p-4">
            {data?.getFoodOrdersByUser?.length === 0 ? (
              <p>Захиалгаа олдсонгүй</p>
            ) : (
              data?.getFoodOrdersByUser?.map((order) => (
                <div className="w-full">
                  <div key={order?.orderId} className="flex gap-">
                    <div className="flex items-center gap-4 ">
                      <p className="text-[#441500] font-bold text-[20px]">#{order?.orderNumber}</p>
                      <div className="w-[120px] h-[20px] border-[1px] bg-white rounded-md">
                        <p className="text-[12px]"> {order?.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-[10px] flex items-end">
                      {new Date().getFullYear()}/{new Date().getMonth() + 1}/{new Date().getDate()}
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
}
