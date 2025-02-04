'use client';

/* eslint-disable */

import { OrderType, useGetOrdersQuery } from '@/generated';
import { Clock2, SlidersHorizontal, CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';
import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { format, isSameDay, parseISO } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { mn } from 'date-fns/locale';
import OrderStatusUpdate from './OrderStatusUpdate';

const AdminMainPageComp = () => {
  const { data: orderData } = useGetOrdersQuery();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const filteredOrders = orderData?.getOrders?.filter((order) => {
    if (!order || !order.createdAt || !date) return false;
    const matchesDate = isSameDay(parseISO(order.createdAt), date);
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    return matchesDate && matchesStatus;
  });

  return (
    date && (
      <div className="flex flex-col items-center bg-[#F4F4F5] w-[100vw] min-h-[91.4vh] py-14">
        <div className="flex w-[600px] justify-between mb-5">
          <div className="text-black font-poppins text-3xl font-semibold">Захиалга</div>
          <div className="flex gap-2">
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger data-testid="calendar-trig-button" asChild>
                <Button variant="outline" className="w-max border border-[#E4E4E7] justify-start gap-2">
                  <CalendarIcon color="black" size={16} />
                  {isSameDay(date, new Date()) ? <span className="text-[#18181B]">Өнөөдөр</span> : <span data-testid="formatted-date">{format(date, "L 'сарын' d", { locale: mn })}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar locale={mn} data-testid="calendar" mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            {/* Status Filter */}
            <Select onValueChange={setSelectedStatus}>
              <SelectTrigger data-testid="status-trigger-btn" className="gap-2">
                <SlidersHorizontal size={16} />
                <SelectValue placeholder="Төлөв" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem data-testid="t-belen-test" value="Ready">
                    Бэлэн
                  </SelectItem>
                  <SelectItem data-testid="t-pending-test" value="Pending">
                    Хүлээгдэж буй
                  </SelectItem>
                  <SelectItem data-testid="t-inpro-test" value="InProcess">
                    Хийгдэж буй
                  </SelectItem>
                  <SelectItem data-testid="t-done-test" value="Done">
                    Дууссан
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {filteredOrders?.length ? (
            filteredOrders.map((order) => {
              const totalPrice = order?.items
                ?.reduce((total, item) => total + (item?.price ?? 0) * (item?.quantity ?? 0), 0)
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, "'");

              return (
                <div key={order?._id} className="flex flex-col p-6 bg-white rounded-[8px] gap-4 w-[600px] border border-[#E4E4E7] shadow-sm">
                  <div className="flex justify-between">
                    <div className="text-2xl font-normal flex gap-2">
                      <div data-testid="order-table-num" className="text-[#3F4145]">
                        {order?.tableId}
                      </div>
                      <div className="text-[#1D1F24] ">#33999</div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Clock2 size={16} />
                      <div data-testid="date" className="text-base font-medium text-[#09090B] ">
                        {new Date(order?.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </div>
                    </div>
                  </div>

                  <div className="w-full border border-[#E4E4E7]"></div>

                  {order?.items?.map((item, index) => (
                    <div className="flex gap-6" key={index}>
                      <Image src={item?.imageUrl ?? '/default-image.jpg'} alt="food" width={87} height={87} className="rounded-xl w-[87px] h-[87px] object-cover" />
                      <div className="flex flex-col gap-2">
                        <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{item?.name}</div>
                        <div className="text-[#09090B] text-[18px] leading-[20px] font-bold">{item?.price}₮</div>
                        <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{item?.quantity}ш</div>
                      </div>
                    </div>
                  ))}

                  <div className="w-full border border-[#E4E4E7]"></div>

                  <div className="flex justify-between">
                    <div className="text-[#09090B] text-base font-normal">Нийлбэр дүн:</div>
                    <div className="text-[#09090B] text-xl font-bold" data-testid="total-price">
                      {totalPrice}₮
                    </div>
                  </div>

                  {order && order._id && typeof order._id === 'string' && <OrderStatusUpdate order={{ ...order, _id: order._id as string, status: order.status ?? '' }} />}
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-center">Огноогоор тохирсон захиалга байхгүй</div>
          )}
        </div>
      </div>
    )
  );
};

export default AdminMainPageComp;
