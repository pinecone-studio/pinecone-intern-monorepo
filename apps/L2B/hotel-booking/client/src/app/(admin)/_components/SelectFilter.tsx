'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectFilterProps {
  placeholder: string;
  items: {
    item: string;
    value: string;
  }[];
  value?: string;
  onValueChange?: (_value: string) => void;
  dataTestId?: string;
  className?: string;
}

export const SelectFilter = ({ placeholder, items, value, onValueChange, dataTestId, className = 'w-[180px]' }: SelectFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = items.find((item) => item.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        data-testid={dataTestId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:border-blue-500 text-sm"
      >
        <span className={selectedItem ? 'text-gray-900' : 'text-gray-500'}>{selectedItem ? selectedItem.item : placeholder}</span>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} data-testid="select-overlay" />
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {items.map(({ item, value: itemValue }) => (
              <button
                key={itemValue}
                data-testid={`select-item-${itemValue}`}
                onClick={() => {
                  onValueChange?.(itemValue);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
