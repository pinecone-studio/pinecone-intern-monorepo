'use client';

import React, { useState } from 'react';
import { DatePickerAdmin } from './DatePickerAdmin';
import { TicketAddDialog } from './TicketAddDialog';

export type TicketTabProps = {
  activeTab: 'ticket' | 'cancelRequest';
};

export const TicketTab = ({ activeTab }: TicketTabProps) => {
  const [ticketAddDialog, setTicketAddDialog] = useState(false);

  // Сонгогдсон огноо энд хадгалагдана
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      {activeTab === 'ticket' && (
        <div className="w-full h-full bg-[#F4F4F5] px-[200px] py-9 relative">
          <div className="mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h6 className="text-lg font-medium">Тасалбар</h6>
                <p className="text-[#71717A] text-sm font-normal">Идэвхитэй зарагдаж буй тасалбарууд</p>
              </div>
              <button onClick={() => setTicketAddDialog(true)} className="text-white bg-black rounded-md py-2 px-4 flex items-center gap-2">
                Тасалбар нэмэх
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clipPath="url(#clip0_8891_2033)">
                    <path
                      d="M7.99999 5.33337V10.6667M5.33333 8.00004H10.6667M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 7.99999 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8.00004C1.33333 4.31814 4.3181 1.33337 7.99999 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8891_2033">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            <hr />

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <input type="text" placeholder="Тасалбар хайх" className="border border-[#E4E4E7] rounded-md px-3 focus:outline-none" />
                <div className="flex gap-2 py-2 px-4 rounded-md bg-white border border-dashed border-[#E4E4E7] items-center overflow-x-scroll whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <g clipPath="url(#clip0_2226_4289)">
                      <path
                        d="M8 1.4353C11.6253 1.43535 14.5645 4.3744 14.5645 7.99976C14.5644 11.6251 11.6253 14.5642 8 14.5642C4.37465 14.5642 1.4356 11.6251 1.43555 7.99976C1.43555 4.37437 4.37461 1.4353 8 1.4353ZM8 1.44897C4.38197 1.44897 1.44922 4.38174 1.44922 7.99976C1.44927 11.6177 4.382 14.5505 8 14.5505C11.6179 14.5505 14.5507 11.6177 14.5508 7.99976C14.5508 4.38177 11.618 1.44903 8 1.44897ZM8 4.76636C8.01828 4.76636 8.03299 4.78133 8.0332 4.79956V7.96655H11.2002C11.2185 7.96666 11.2333 7.98146 11.2334 7.99976C11.2334 8.01814 11.2185 8.03285 11.2002 8.03296H8.0332V11.2C8.0332 11.2183 8.01838 11.2332 8 11.2332C7.98163 11.2331 7.9668 11.2183 7.9668 11.2V8.03296H4.7998C4.7815 8.03284 4.7666 8.01809 4.7666 7.99976C4.76671 7.98151 4.78157 7.96667 4.7998 7.96655H7.9668V4.79956C7.96701 4.78134 7.98174 4.76637 8 4.76636Z"
                        fill="#09090B"
                        stroke="#18181B"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2226_4289">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Уран бүтээлч
                  <div className="w-px h-full bg-[#E4E4E7]"></div>
                  <div className="flex gap-1 [&>*]:bg-[#F4F4F5] [&>*]:py-[2px] [&>*]:px-1 [&>*]:rounded">
                    <div>Davaidasha</div>
                    <div>Хурд</div>
                  </div>
                </div>
                <button className="flex gap-2 bg-white rounded-md py-2 px-3 items-center border border-[#E4E4E7]">
                  Цэвэрлэх
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path
                      d="M12.1762 3.76111L12.2133 3.7865C12.2576 3.83075 12.2576 3.90241 12.2133 3.94666L8.5141 7.64685L8.16058 8.00037L12.2133 12.0531C12.2576 12.0974 12.2576 12.1689 12.2133 12.2133C12.1691 12.2575 12.0974 12.2575 12.0532 12.2133L8.00043 8.16052L7.64691 8.51404L3.94672 12.2133C3.91345 12.2465 3.86465 12.2553 3.82367 12.2386L3.78656 12.2133C3.7533 12.1799 3.74526 12.1312 3.76215 12.0902L3.78656 12.0531L7.83929 8.00037L7.48578 7.64685L3.78656 3.94666C3.74235 3.90239 3.74232 3.83074 3.78656 3.7865C3.83079 3.74227 3.90244 3.74229 3.94672 3.7865L7.64691 7.48572L8.00043 7.83923L12.0532 3.7865C12.0863 3.75333 12.1353 3.74451 12.1762 3.76111Z"
                      fill="#09090B"
                      stroke="#18181B"
                    />
                  </svg>
                </button>
              </div>
              {/* Энд огноо сонгох хэсэг */}
              <DatePickerAdmin selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>

            <div className="bg-white rounded-md border border-[#E4E4E7]">
              <div className="flex justify-between items-center h-16 [&>*]:text-sm [&>*]:font-medium [&>*]:text-[#71717A] [&>*]:px-4">
                <div className="w-20">Онцлох</div>
                <div className="w-25">Тоглолтын нэр</div>
                <div className="w-[79px]">Артист</div>
                <div className="w-[95px]">Нийт тоо: 900</div>
                <div className="w-[72px]">VIP: 300</div>
                <div className="w-[92px]">Regular: 300</div>
                <div className="w-[92px]">Задгай: 300</div>
                <div className="w-[100px]">Тоглох өдрүүд</div>
                <div className="w-[100px]">Нийт ашиг</div>
                <div className="w-[82px]">Үйлдэл</div>
              </div>
              <div></div>
            </div>
          </div>

          <TicketAddDialog ticketAddDialog={ticketAddDialog} setTicketAddDialog={setTicketAddDialog} />
        </div>
      )}
    </>
  );
};
