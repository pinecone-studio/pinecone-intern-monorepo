'use client';

import { SetStateAction } from 'react';
import { Search } from 'lucide-react';

type TicketFilterBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
};

const TicketFilterBar = ({ searchTerm, setSearchTerm }: TicketFilterBarProps) => {
  return (
    <div className="flex justify-start pt-4 pb-4 w-full max-w-7xl mx-auto" data-testid="ticket-filter-bar">
      <div className="flex items-center gap-2 w-full md:w-1/2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            data-testid="search-input"
            placeholder="Нэрээр хайх"
            aria-label="Хайлт хийх"
            className="pl-9 pr-3 py-2 w-full text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-100 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketFilterBar;
