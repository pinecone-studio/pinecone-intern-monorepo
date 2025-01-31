'use client';

import { useState } from 'react';

import StandartTicket from './StandartTicket';
import RearTicket from './RearTicket';
import { TotalPrice } from './TicketPrice';
import VipTicket from './VipTicket';
import SelectDemo from './SelectDay';

type dataProps = {
  vip: number;
  rear: number;
  standart: number;
};
export const TicketReservation = ({ vip, rear, standart }: dataProps) => {
  const [standardCount, setStandardCount] = useState(0);
  const [rearCount, setRearCount] = useState(0);
  const [vipCount, setVipCount] = useState(0);

  const standardPrice = 99000;
  const rearPrice = 129000;
  const vipPrice = 159000;

  const standardRealCount = Math.max(0, standart - standardCount);
  const rearRealCount = Math.max(0, rear - rearCount);
  const vipRealCount = Math.max(0, vip - vipCount);

  const total = standardCount * standardPrice + rearCount * rearPrice + vipCount * vipPrice;
  const standartIncrement = () => {
    setStandardCount(Math.max(0, standardCount + 1));
  };
  const standartDecrement = () => {
    setStandardCount(Math.max(0, standardCount - 1));
  };
  return (
    <div className="w-[385px] mx-auto mt-[100px] h-fit bg-[#131313] rounded-xl p-[20px] flex-col items-center">
      <div className="">
        <p className="text-[#ababab]">Тогло үзэх өдрөө сонгоно уу.</p>
        <SelectDemo />
      </div>
      <div className="w-[345px] h-[255px] my-[5px]">
        <div className="border-dashed border-b-2 border-[#27272A] "></div>
        <div className="w-[345px] h-[72px] flex items-center justify-between">
          <div className="flex items-center  justify-items-center">
            <div className="w-[10px] h-[10px] bg-[#C772C4] rounded-full mr-[10px]"></div>
            <div>
              <p className="text-[#C772C4]" data-testid="standart-ticket">
                Энгийн тасалбар ({standardRealCount})
              </p>
              <p className="text-white" data-testid="standart-ticket-price">
                {standardPrice}₮
              </p>
            </div>
          </div>

          <StandartTicket standardCount={standardCount} Increment={standartIncrement} Decrement={standartDecrement} />
        </div>
        <p data-testid="standart-count" className={`${standardRealCount <= 0 ? 'block' : 'hidden'} text-red-500 text-[12px]`}>
          {standardCount}-ш тасалбар захиалах боломжгүй байна.
        </p>
        <div className="border-dashed border-b-2 border-[#27272A] "></div>
        <div className="w-[345px] h-[72px] flex items-center justify-between">
          <div className="flex items-center  justify-items-center">
            <div className="w-[10px] h-[10px] bg-[#D7D7F8] rounded-full mr-[10px]"></div>
            <div>
              <p className="text-[#D7D7F8]">Арын тасалбар ({rearRealCount})</p>
              <p datatest-id="backside-" className="text-white">
                {rearPrice}₮
              </p>
            </div>
          </div>

          <RearTicket rearCount={rearCount} Increment={() => setRearCount(Math.max(0, rearCount + 1))} Decrement={() => setRearCount(Math.max(0, rearCount - 1))} />
        </div>
        <p data-testid="rear-count" className={`${rearRealCount <= 0 ? 'block' : 'hidden'} text-red-500 text-[12px]`}>
          {rearCount}-ш тасалбар захиалах боломжгүй байна.
        </p>
        <div className="border-dashed border-b-2 border-[#27272A] "></div>
        <div className="w-[345px] h-[72px] flex items-center justify-between">
          <div className="flex items-center  justify-items-center">
            <div className="w-[10px] h-[10px] bg-[#4651C9] rounded-full mr-[10px]"></div>
            <div>
              <p className="text-[#4651C9]">VIP тасалбар ({vipRealCount})</p>
              <p className="text-white">{vipPrice}₮</p>
            </div>
          </div>

          <VipTicket vipCount={vipCount} Increment={() => setVipCount(Math.max(0, vipCount + 1))} Decrement={() => setVipCount(Math.max(0, vipCount - 1))} />
        </div>
        {/* <p data-testid="vip-count" className={`${vipRealCount <= 0 ? 'block' : 'hidden'} text-red-500 text-[12px]`}>
          {vipCount}-ш тасалбар захиалах боломжгүй байна.
        </p> */}
      </div>
      <TotalPrice standardCount={standardCount} standardPrice={standardPrice} rearCount={rearCount} rearPrice={rearPrice} vipCount={vipCount} vipPrice={vipPrice} total={total} />
    </div>
  );
};
