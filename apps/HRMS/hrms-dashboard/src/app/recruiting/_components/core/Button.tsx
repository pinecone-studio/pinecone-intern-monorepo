'use client';

import { FaPlus } from 'react-icons/fa';

interface IButtonProps {
  label: string;
  disabled?: boolean;
  href?: string;
  btnType?: 'contained' | 'outlined';
  onClick?: () => void;
  plusIcon?: boolean;
}

export const Button = ({ label, onClick, disabled, btnType = 'contained', plusIcon }: IButtonProps) => {
  const btnTypeStyle = btnType === 'contained' ? 'btn bg-[#121316] text-white' : 'btn btn-outline text-[#121316] border-[#D6D8DB]';

  return (
    <button className={`text-[14px] px-[14px] py-[10px] rounded-[8px] items-center gap-2 flex hover:bg-slate-700 ${btnTypeStyle}`} disabled={disabled} onClick={onClick}>
      {label}
      {plusIcon && <FaPlus color="white" />}
    </button>
  );
};
