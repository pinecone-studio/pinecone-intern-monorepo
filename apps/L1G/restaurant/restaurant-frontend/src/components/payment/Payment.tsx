'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import React, { useState } from 'react';
const Payment = () => {
  const [method, setMethod] = useState('');
  const [orderType, setOrderType] = useState('takeaway');
  return (
    <div className="flex flex-col bg-[#F7F7F8] w-full h-full justify-center gap-[40px]">
      <div className="w-full h-[40px] flex justify-end items-center">
        <X />
      </div>
      <div className="flex flex-col gap-[30px] w-full items-center justify-center">
        <p className="text-[20px] w-[240px] h-[100px] items-center justify-center text-center">Төлбөрийн хэрэгслээ сонгоно уу</p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={'Авч явах'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="takeaway">Авч явах</SelectItem>
            <SelectItem value="dine_in">Эндээ идэх</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full h-fit gap-[20px] items-center justify-center">
        <div className="w-[100px] h-[100px] rounded-xl bg-white flex justify-center items-center">Qpay</div>
        <div className="w-[100px] h-[100px] rounded-xl bg-white flex justify-center items-center">Qpay</div>
        <div className="w-[100px] h-[100px] rounded-xl  bg-white flex justify-center items-center">Qpay</div>
      </div>
      <div className="w-full h-fit ">
        <div className="flex w-full h-[20px] items-center justify-center">
          <p className="text-[12px] text-[#8B8E95] w-full">Захиалгын нийт дүн:</p>
          <p className="text-[16px] w-full">53,000₮</p>
        </div>
        <div className="flex w-full h-[20px] items-center justify-center">
          <p className="text-[12px] text-[#8B8E95] w-full">Захиалгын нийт дүн:</p>
          <p className="text-[16px] w-full">53,000₮</p>
        </div>
        <div className="flex w-full h-[20px] items-center justify-center">
          <p className="text-[12px] text-[#8B8E95] w-full">Захиалгын нийт дүн:</p>
          <p className="text-[16px] w-full">53,000₮</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
