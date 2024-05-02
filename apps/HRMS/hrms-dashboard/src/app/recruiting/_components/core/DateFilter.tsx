'use client';

import { useState } from 'react';
import { ArrowSvg } from '../../../asset/icons/ArrowSvg';

export const DateFilter = () => {
  const labels = ['4/30 - Мягмар', '5/1 - Лхагва', '5/2 - Пүрэв', '5/3 - Баасан'];
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedLabel(event.target.value);
  };

  return (
    <div className="relative my-6 w-44 opacity-100">
      <select
        value={selectedLabel}
        onChange={handleChange}
        className="relative inline-block h-10 w-full text-[#3F4145] font-semibold appearance-none rounded-lg border border-[#ECEDF0] bg-white px-4 text-slate-900 outline-none"
      >
        <option value="">Огноо</option>
        {labels.map((label, index) => (
          <option key={index} value={label}>
            {label}
          </option>
        ))}
      </select>
      <ArrowSvg />
    </div>
  );
};
