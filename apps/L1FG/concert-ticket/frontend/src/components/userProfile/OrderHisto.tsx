import { Clock } from 'lucide-react';
import { DeleteButton } from './OrderDeletee';
import { useState } from 'react';

export const OrderHistory = () => {
  const [sendRequest, setSendRequest] = useState(true);
  const [, setStatus] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-[#131313] p-8 rounded-lg">
      <div className="flex justify-between items-center w-[777px] ">
        <div className="flex flex-row gap-4 font-thin">
          <div className="text-neutral-400 flex flex-row gap-2">
            Захиалгын дугаар: <p className="text-white">{6235473}</p>
          </div>
          <div className="text-white flex flex-row items-center gap-2">
            <Clock className="w-5 h-5"></Clock>
            <a>{'2024.10.21'}</a>
          </div>
        </div>
        <div data-testid="delete-status">
          {sendRequest ? (
            <DeleteButton
              onclick={() => {
                setSendRequest(false);
                setStatus(true);
              }}
            ></DeleteButton>
          ) : (
            <div data-testid="send-delete-request" className="text-white flex flex-row gap-2">
              <p className="text-neutral-500 font-thin">Төлөв:</p>
              <p>Цуцлах хүсэлт илгээсэн</p>
            </div>
          )}
        </div>
      </div>
      <div className="text-white flex flex-row justify-between border-[1px] border-dashed border-neutral-800 rounded-lg py-4 px-6">
        <div className="flex flex-row gap-2 items-center">
          <div className="rounded-full bg-[#D9D9D9] w-3 h-3"></div>
          <a className="text-[#D7D7F8]">Арын тасалбар</a>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-neutral-500 font-thin">
            {'89’000₮'} x {'2'}
          </p>
          <a className="text-lg font-thin">{1780000}</a>
        </div>
      </div>
      <div className="text-white flex flex-row justify-between border-[1px] border-dashed border-neutral-800 rounded-lg py-4 px-6">
        <div className="flex flex-row gap-2 items-center">
          <div className="rounded-full bg-[#4651C9] w-3 h-3"></div>
          <a className="text-[#4651C9]">Vip тасалбар</a>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-neutral-500 font-thin">
            {'15’0000₮'} x {'2'}
          </p>
          <a className="text-lg font-thin">{300000}</a>
        </div>
      </div>
    </div>
  );
};
