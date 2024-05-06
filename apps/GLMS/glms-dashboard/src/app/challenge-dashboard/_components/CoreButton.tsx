'use client';

import { FaPlus } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

interface IButtonProps {
  label?: string;
  disabled?: boolean;
  btnType?: 'text' | 'icon';
  h?: number;
  w?: number;
  btnColor?: 'white' | 'black';
  icon?: 'plus' | 'delete';
  onClick?: () => void;
}

export const Button = ({ label, onClick, disabled, btnColor = 'black', icon, btnType = 'text', h = 8, w = 8 }: IButtonProps) => {
  const btnTypeStyle = btnType === 'text' ? 'px-4' : 'px-2';
  const btnColorStyle = btnColor === 'black' ? 'bg-[#121316] border-none text-white' : 'bg-white border-solid border border-[#D6D8DB] text-[#121316]';

  return (
    <button
      className={`flex items-center justify-center gap-2 text-[${h + 6}px] font-sans font-semibold rounded-[8px] h-${h} w-${w} px-2 ${btnTypeStyle} ${btnColorStyle} hover:opacity-90`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
      {icon === 'plus' && <FaPlus color="white" data-testid="plus-icon" />}
      {icon === 'delete' && <MdDeleteOutline color="#121316" size={15} data-testid="delete-icon" />}
    </button>
  );
};
