'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const ListPage = () => {
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z" />
            </svg>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center justify-between w-48 px-5 py-2 text-gray-300 bg-[#1a1a1a] border border-gray-700 rounded-xl">
            {selectedDate}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={openDropdown ? 'M19 15l-7-7-7 7' : 'M19 9l-7 7-7-7'} />
            </svg>
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
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-[#141414] rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-700">
              <Image src="https://contessa-project.eu/wp-content/uploads/2022/05/placeholder.gif" alt="" className="w-full h-full object-cover" width={425} height={370} />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-lg">Music of the Spheres</h3>
              <p className="text-sm text-gray-400 mb-1">Coldplay</p>
              <p className="font-semibold text-base">200,000₮</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>📅 10.31</span>
                <span>📍 UG ARENA</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
export default ListPage;
