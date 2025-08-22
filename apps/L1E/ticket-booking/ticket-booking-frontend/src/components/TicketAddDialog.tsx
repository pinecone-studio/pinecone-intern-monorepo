'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TimePicker } from './TimePicker';

type TicketAddDialogType = {
  ticketAddDialog: boolean;
  setTicketAddDialog: (_value: boolean) => void;
};

export const TicketAddDialog = ({ ticketAddDialog, setTicketAddDialog }: TicketAddDialogType) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (_value: Date | null) => {
    setSelectedDate(_value);
  };

  return (
    <>
      {ticketAddDialog && (
        <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-30 overflow-scroll">
          <div className="w-[592px] h-fit py-9 px-6 text-black bg-white mx-auto border border-[#E4E4E7] rounded-lg space-y-8  overflow-scroll">
            <div className="space-y-6">
              {/* Title and close button */}
              <div className="relative">
                <h4 className="text-2xl font-semibold">Тасалбар нэмэх</h4>
                <button onClick={() => setTicketAddDialog(false)} className="absolute top-2 right-2 p-2 rounded-full bg-white hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div>
                {/* Event Name */}
                <div>
                  <h6 className="text-base font-medium mb-1">Тоглолтын нэр*</h6>
                  <input
                    type="text"
                    placeholder="Нэр оруулах"
                    className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
                  />
                </div>

                {/* File Input Section */}
                <label className="w-full h-[160px] mt-0 cursor-pointer">
                  <div className="w-full h-[160px] flex flex-col justify-center items-center bg-[#F4F4F5] border border-[#E4E4E7] rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-500 mb-2">
                      <path d="M10 4.16675V15.8334M4.16666 10.0001H15.8333" stroke="#2563EB" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm font-normal text-[#71717A]">Зураг оруулах</p>
                  </div>
                  <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }} className="w-full h-full cursor-pointer opacity-0 absolute top-0 left-0" />
                </label>
              </div>

              <div>
                <h6 className="text-base font-medium mb-1">Хөтөлбөрийн тухай*</h6>
                <textarea
                  placeholder="Дэлгэрэнгүй мэдээлэл"
                  className="py-2 px-3 placeholder:[#71717A] w-full h-20 focus:outline-none border border-[#E4E4E7] rounded-md placeholder:text-sm placeholder:font-normal"
                />
              </div>

              <div>
                <h6 className="text-base font-medium mb-2">Үндсэн артистын нэр*</h6>
                <input
                  type="text"
                  placeholder="Артистын нэр"
                  className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
                />
                <button className="flex gap-2 items-center py-2 px-4 rounded-md border border-[#E4E4E7]">
                  Бусад артист нэмэх
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3.33325V12.6666M3.33333 7.99992H12.6667" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <h6 className="text-base font-medium mb-2">Тоглолтын өдөр сонгох*</h6>
                <div className="flex flex-col gap-2 w-full relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Өдөр сонгох"
                    className="border rounded-md px-3 py-3 w-full text-sm bg-white border-[#E4E4E7] focus:outline-none text-black placeholder-[#71717A]"
                  />
                  <div className="absolute top-[14px] right-4 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M11.2005 1.56665C11.2186 1.56689 11.2336 1.58168 11.2337 1.59985V2.63306H13.3333C13.9408 2.63306 14.4329 3.12613 14.4329 3.73364V13.3333C14.4329 13.9407 13.9408 14.4329 13.3333 14.4329H2.66628C2.05894 14.4327 1.56667 13.9406 1.56667 13.3333V3.73364C1.56667 3.12626 2.05894 2.63327 2.66628 2.63306H4.76686V1.59985C4.76693 1.58151 4.7817 1.56665 4.80006 1.56665C4.8184 1.56669 4.8332 1.58153 4.83327 1.59985V2.63306H11.1663V1.59985C11.1663 1.58153 11.1821 1.56665 11.2005 1.56665ZM1.63307 13.3333C1.63307 13.9037 2.09574 14.3662 2.66628 14.3665H13.3333C13.9039 14.3665 14.3665 13.9039 14.3665 13.3333V5.89966H1.63307V13.3333ZM3.73366 12.2336C3.75189 12.2338 3.76686 12.2486 3.76686 12.2668C3.76676 12.285 3.75183 12.2999 3.73366 12.3C3.71534 12.3 3.70056 12.2851 3.70045 12.2668C3.70045 12.2485 3.71528 12.2336 3.73366 12.2336ZM5.86647 12.2336C5.88485 12.2336 5.89967 12.2485 5.89967 12.2668C5.89957 12.2851 5.88479 12.3 5.86647 12.3C5.84824 12.2999 5.83337 12.2851 5.83327 12.2668C5.83327 12.2485 5.84818 12.2337 5.86647 12.2336ZM8.00026 12.2336C8.01852 12.2338 8.03346 12.2485 8.03346 12.2668C8.03336 12.2851 8.01846 12.2999 8.00026 12.3C7.98194 12.3 7.96716 12.2851 7.96706 12.2668C7.96706 12.2485 7.98188 12.2336 8.00026 12.2336ZM10.1331 12.2336C10.1515 12.2336 10.1663 12.2485 10.1663 12.2668C10.1662 12.2851 10.1514 12.3 10.1331 12.3C10.1149 12.2999 10.1 12.2851 10.0999 12.2668C10.0999 12.2485 10.1148 12.2338 10.1331 12.2336ZM3.73366 10.0999C3.75183 10.1 3.76672 10.1149 3.76686 10.1331C3.76686 10.1514 3.75191 10.1661 3.73366 10.1663C3.71525 10.1663 3.70045 10.1515 3.70045 10.1331C3.7006 10.1148 3.71534 10.0999 3.73366 10.0999ZM5.86647 10.0999C5.88479 10.0999 5.89953 10.1148 5.89967 10.1331C5.89967 10.1515 5.88488 10.1663 5.86647 10.1663C5.84815 10.1662 5.83327 10.1514 5.83327 10.1331C5.83341 10.1148 5.84824 10.1 5.86647 10.0999ZM8.00026 10.0999C8.01846 10.1 8.03332 10.1149 8.03346 10.1331C8.03346 10.1514 8.01855 10.1661 8.00026 10.1663C7.98185 10.1663 7.96706 10.1515 7.96706 10.1331C7.9672 10.1148 7.98194 10.0999 8.00026 10.0999ZM10.1331 10.0999C10.1514 10.0999 10.1661 10.1148 10.1663 10.1331C10.1663 10.1515 10.1515 10.1663 10.1331 10.1663C10.1148 10.1661 10.0999 10.1514 10.0999 10.1331C10.1 10.1149 10.1149 10.1 10.1331 10.0999ZM12.2669 10.0999C12.2851 10.1 12.2999 10.1149 12.3001 10.1331C12.3001 10.1514 12.2852 10.1662 12.2669 10.1663C12.2485 10.1663 12.2337 10.1514 12.2337 10.1331C12.2338 10.1148 12.2486 10.0999 12.2669 10.0999ZM8.00026 7.96704C8.01855 7.96718 8.03346 7.98193 8.03346 8.00024C8.03332 8.01845 8.01846 8.03331 8.00026 8.03345C7.98194 8.03345 7.9672 8.01853 7.96706 8.00024C7.96706 7.98184 7.98185 7.96704 8.00026 7.96704ZM10.1331 7.96704C10.1515 7.96704 10.1663 7.98184 10.1663 8.00024C10.1661 8.01853 10.1514 8.03345 10.1331 8.03345C10.1149 8.03331 10.1 8.01844 10.0999 8.00024C10.0999 7.98193 10.1148 7.96718 10.1331 7.96704ZM12.2669 7.96704C12.2852 7.96715 12.3001 7.98193 12.3001 8.00024C12.2999 8.01844 12.2851 8.03334 12.2669 8.03345C12.2486 8.03345 12.2338 8.0185 12.2337 8.00024C12.2337 7.98186 12.2485 7.96704 12.2669 7.96704ZM2.66628 2.70044C2.09576 2.70065 1.63307 3.16308 1.63307 3.73364V5.83325H14.3665V3.73364C14.3665 3.16292 13.9039 2.70044 13.3333 2.70044H11.2337V3.73364C11.2335 3.75173 11.2185 3.7666 11.2005 3.76685C11.1822 3.76685 11.1664 3.75188 11.1663 3.73364V2.70044H4.83327V3.73364C4.83309 3.75188 4.81833 3.76681 4.80006 3.76685C4.78177 3.76685 4.76704 3.7519 4.76686 3.73364V2.70044H2.66628Z"
                        fill="#71717A"
                        stroke="#71717A"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <h6 className="text-base font-medium mb-2">Тоглолтын цаг сонгох*</h6>
                <TimePicker />
              </div>
            </div>

            <div>
              <h6 className="text-base font-medium mb-2">VIP*</h6>
              <input
                type="text"
                placeholder="Нийт тоо хэмжээ"
                className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
              />
              <input
                type="text"
                placeholder="Нэгжийн үнэ"
                className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
              />
            </div>
            <div>
              <h6 className="text-base font-medium mb-2">Regular*</h6>
              <input
                type="text"
                placeholder="Нийт тоо хэмжээ"
                className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
              />
              <input
                type="text"
                placeholder="Нэгжийн үнэ"
                className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
              />
            </div>

            <div>
              <h6 className="text-base font-medium mb-2">Задгай*</h6>
              <input
                type="text"
                placeholder="Нийт тоо хэмжээ"
                className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
              />
              <input
                type="text"
                placeholder="Нэгжийн үнэ"
                className="py-[10px] px-3 border border-[#E4E4E7] rounded-md focus:outline-none w-full placeholder-[#71717A] mb-2 placeholder:text-sm placeholder:font-normal"
              />

              <button className="bg-[#1D1F24] rounded-md w-full py-2 px-4 text-white">Үүсгэх</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


// sadfaskj