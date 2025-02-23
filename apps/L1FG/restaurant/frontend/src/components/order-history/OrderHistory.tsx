'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import { useGetOrdersForUserQuery } from '@/generated';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';

const OrderHistory = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;
      setUserId(parsedUser._id);
    } catch {
      toast.error('Та захиалгын түүх хархын тулд нэвтэрч орно уу!');
      router.push('/login');
    }
  }, []);

  const { data, loading } = useGetOrdersForUserQuery({
    variables: { userId: userId || '' },
    skip: !userId,
  });
  return (
    <div className="min-h-[500px] w-full container mx-auto">
      <Header />

      <h1 className="text-center text-xl pt-20 text-black mb-6">Захиалгын түүх</h1>

      <div className="flex-1 overflow-y-scroll px-4 py-4 space-y-4">
        {loading && <p className="text-center text-gray-500">Түр хүлээнэ үү...</p>}

        {data?.getOrdersForUser?.length
          ? data.getOrdersForUser
              .slice()
              .sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())
              .map((order, index, arr) => {
                const totalAmount = order?.items?.reduce((acc, item) => acc + (item?.price ?? 0) * (item?.quantity ?? 0), 0);
                return (
                  <AlertDialog key={order?._id}>
                    <AlertDialogTrigger asChild>
                      <div className="flex flex-col bg-white text-black p-4 rounded-lg border">
                        <div className="flex gap-2 items-center">
                          <p className="text-base font-bold text-[#441500]">#{arr.length - index}</p>
                          <p className="text-xs text-[#18181B] font-medium border rounded-xl px-2 bg-[#F4F4F5]">
                            {order?.status === 'Pending' && 'Хүлээгдэж буй'}
                            {order?.status === 'InProcess' && 'Бэлтгэгдэж буй'}
                            {order?.status === 'Ready' && 'Дууссан'}
                            {order?.status === 'Done' && 'Хүргэгдсэн'}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-[#3F4145]">
                            {new Date(order?.createdAt)
                              .toLocaleString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                              })
                              .replace(',', '')}
                          </p>
                          <p className="text-lg font-bold">{totalAmount}₮</p>
                        </div>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-5/6 rounded-md">
                      <AlertDialogHeader className="text-left">
                        <AlertDialogTitle className="text-[#441500] text-xl text-center">Захиалгын дэлгэрэнгүй</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs items-center">Захиалгын дугаар:</AlertDialogDescription>
                        <AlertDialogDescription className="pb-2 border-b text-black items-center flex">#{arr.length - index}</AlertDialogDescription>
                        <AlertDialogDescription className="text-xs">Захиалгын төлөв:</AlertDialogDescription>
                        <AlertDialogDescription className="pb-2 border-b text-black items-center flex">{order?.status}</AlertDialogDescription>
                        <AlertDialogDescription className="text-xs">Захиалсан огноо:</AlertDialogDescription>
                        <AlertDialogDescription className="pb-2 border-b text-black items-center flex">
                          {new Date(order?.createdAt)
                            .toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })
                            .replace(',', '')}
                        </AlertDialogDescription>
                        <AlertDialogDescription className="">Захиалга:</AlertDialogDescription>
                        <div className=" max-h-32 overflow-scroll flex flex-col gap-2">
                          {order?.items?.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <Image src={item?.imageUrl ?? '/default-image.png'} alt={item?.name ?? 'Unknown'} width={50} height={50} className=" w-24 h-24 rounded-lg" />
                              <div className="flex flex-col">
                                <p className="text-sm">{item?.name}</p>
                                <AlertDialogDescription className="text-black text-lg font-bold">{item?.price}₮</AlertDialogDescription>
                                <p>тоо: {item?.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <AlertDialogDescription>Нийт дүн: {totalAmount}₮</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction className="bg-[#441500]">Болсон</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                );
              })
          : !loading && <p className="text-center text-gray-500">Захиалга олдсонгүй.</p>}
      </div>
    </div>
  );
};

export default OrderHistory;
