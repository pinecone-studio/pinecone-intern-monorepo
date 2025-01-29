'use client';

import { useGetOrdersQuery } from '@/generated';
import { Calendar, Clock2, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const AdminMainPageComp = () => {
  const { data: orderData } = useGetOrdersQuery();

  return (
    <div className="flex flex-col items-center bg-[#F4F4F5] w-[100vw] min-h-[91.4vh] py-14">
      <div className="flex w-[600px] justify-between mb-5">
        <div className="text-black font-poppins text-3xl font-semibold">Захиалга</div>
        <div className="flex gap-2">
          <button className="font-medium text-sm flex items-center px-4 py-2 bg-white border border-[#E4E4E7] rounded-[6px] gap-2">
            <Calendar size={16} />
            <span>Өнөөдөр</span>
          </button>
          <button className="font-medium text-sm flex items-center px-4 py-2 bg-white border border-[#E4E4E7] rounded-[6px] gap-2">
            <SlidersHorizontal size={16} />
            <span>Төлөв</span>
          </button>
        </div>
      </div>

      {
        <div className="space-y-4">
          {orderData?.getOrders
            ?.slice()
            .reverse()
            .map((order) => {
              if (!order) return null;

              const totalPrice = order.items
                ?.reduce((total, item) => total + (item?.price ?? 0) * (item?.quantity ?? 0), 0)
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, "'");

              return (
                <div key={order._id} className="flex flex-col p-6 bg-white rounded-[8px] gap-4 w-[600px] border border-[#E4E4E7] shadow-sm">
                  <div className="flex justify-between">
                    <div className=" text-2xl font-normal flex gap-2">
                      <div className="text-[#3F4145]">{order?.tableId} </div>
                      <div className="text-[#1D1F24] ">#33999 </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Clock2 size={16} />
                      <div data-testid="date" className="text-base font-medium text-[#09090B] ">
                        {new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </div>
                    </div>
                  </div>

                  <div className="w-full border border-[#E4E4E7] "></div>

                  {order?.items?.map((item, index) => (
                    <div className="flex gap-6" key={index}>
                      <Image src="/user.jpeg" alt="food" width={87} height={87} className="rounded-xl" />
                      <div className="flex flex-col gap-2 ">
                        <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{item?.name} </div>
                        <div className="text-[#09090B] text-[18px] leading-[20px] font-bold">{item?.price}₮</div>
                        <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{item?.quantity}ш</div>
                      </div>
                    </div>
                  ))}

                  <div className="w-full border border-[#E4E4E7] "></div>

                  <div className="flex justify-between">
                    <div className="text-[#09090B] text-base font-normal ">Нийлбэр дүн:</div>
                    <div className="text-[#09090B] text-xl font-bold " data-testid="total-price">
                      {totalPrice}₮
                    </div>
                  </div>

                  <div className="w-full flex justify-end mt-2 gap-2">
                    <Select>
                      <SelectTrigger data-testid="select-button" className="w-[180px]">
                        <SelectValue placeholder="Хүлээгдэж буй" className="placeholder-[#09090B] " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem data-testid="belen-test" value="done">
                            Бэлэн
                          </SelectItem>
                          <SelectItem data-testid="pending-test" value="pending">
                            Хүлээгдэж буй
                          </SelectItem>
                          <SelectItem data-testid="inpro-test" value="inprocess">
                            Хийгдэж буй
                          </SelectItem>
                          <SelectItem data-testid="done-test" value="ended">
                            Дууссан
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button className="px-4 py-2">Хадгалах</Button>
                  </div>
                </div>
              );
            })}
        </div>
      }
    </div>
  );
};

export default AdminMainPageComp;
