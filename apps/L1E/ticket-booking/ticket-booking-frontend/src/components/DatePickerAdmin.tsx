'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerAdminProps = {
  selectedDate: Date | null;
  onDateChange: (_date: Date | null) => void;
};

export const DatePickerAdmin = ({ selectedDate, onDateChange }: DatePickerAdminProps) => {
  const [internalDate, setInternalDate] = useState<Date | null>(selectedDate);

  return (
    <div className="flex flex-col gap-2 w-[280px] relative">
      <DatePicker
        selected={internalDate}
        onChange={(_date: Date | null) => {
          if (_date) {
            setInternalDate(_date);
            onDateChange(_date);
          }
        }}
        dateFormat="yyyy/MM/dd"
        placeholderText="Өдөр сонгох"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
