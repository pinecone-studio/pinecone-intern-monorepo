'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-2 w-[280px] relative">
      <DatePicker
        selected={selectedTime}
        onChange={(time) => setSelectedTime(time)}
        showTimeSelect
        showTimeSelectOnly // Зөвхөн цаг сонгох горим идэвхжүүлнэ
        timeIntervals={30} // 30 минутын интервал
        timeCaption="Цаг"
        dateFormat="HH:mm" // Зөвхөн цагийн формат
        placeholderText="Цаг"
        className="border rounded-md px-3 py-3 w-full text-sm bg-white border-[#E4E4E7] focus:outline-none text-black placeholder-[#71717A]"
      />

      <div className="absolute top-[14px] right-4 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};
