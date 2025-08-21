'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerAdminProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
};

export const DatePickerAdmin = ({ selectedDate, onDateChange }: DatePickerAdminProps) => {
  return (
    <div className="flex flex-col gap-2 w-[280px] relative">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="Өдөр сонгох"
        className="border rounded-md px-3 py-3 w-full text-sm bg-white border-[#E4E4E7] focus:outline-none text-black placeholder-[#71717A]"
      />
      <div className="absolute top-[14px] right-4 pointer-events-none">
        {/* Календрын жижиг дүрсийг энд SVG-р хийж болно */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
};
