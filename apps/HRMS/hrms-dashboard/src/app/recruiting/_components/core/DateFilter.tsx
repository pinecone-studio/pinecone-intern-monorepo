import { useState } from 'react';

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute top-2.5 right-4 h-5 w-5 fill-[#3F4145]"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-labelledby="title-04 description-04"
        role="graphics-symbol"
      >
        <title id="title-04">Arrow Icon</title>
        <desc id="description-04">Arrow icon of the select list.</desc>
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  );
};
