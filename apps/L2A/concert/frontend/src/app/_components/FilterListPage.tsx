'use client';

import { useEffect, useRef, useState } from 'react';
import ListCards from './ListCards';
import SearchIcon from '../_assets/SearchIcon';
import ChevronIcon from '../_assets/ChevronIcon';

const FilterListPage = () => {
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('Өдөр сонгох');
  const [openDropdown, setOpenDropdown] = useState(false);
  const dates = ['2025-05-05', '2025-05-06', '2025-05-07', '2025-05-08', '2025-05-09'];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex flex-wrap items-center gap-4 px-8 py-6 border-b border-gray-800">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Хайлт"
            className="w-full px-5 py-2 pr-10 text-gray-300 bg-[#101010] border border-gray-700 rounded-xl focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white">
            <SearchIcon />
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center justify-between w-48 px-5 py-2 text-gray-300 bg-[#1a1a1a] border border-gray-700 rounded-xl">
            {selectedDate}
            <ChevronIcon />
          </button>
          {openDropdown && (
            <ul className="absolute z-10 w-48 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-lg">
              {dates.map((date) => (
                <li
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setOpenDropdown(false);
                  }}
                  className="px-5 py-2 text-gray-300 hover:bg-gray-800 cursor-pointer"
                >
                  {date}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ListCards />
    </div>
  );
};
export default FilterListPage;
