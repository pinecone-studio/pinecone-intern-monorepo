// ButtonGroup.tsx
import React from 'react';

interface ButtonGroupProps {
  selected: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (filter: string) => void;
}

const roomTypes = ['All rooms', '1 bed', '2 bed', 'Suite']; // Example room types

const ButtonGroup: React.FC<ButtonGroupProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {roomTypes.map((roomType,index) => (
        <button
          key={index}
          data-testid={`button-${index}`}
          className={`px-4 py-2 rounded text-sm ${
            selected === roomType ? 'bg-[#2563eb] text-white' : 'bg-[#f4f4f5] text-black'
          }`}
          onClick={() => onSelect(roomType)}
        >
          {roomType}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
