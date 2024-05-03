'use client';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  bgColor?: 'primary' | 'secondary';
  onClick?: () => void;
}

const CustomButton = ({ label, onClick, disabled, bgColor = 'primary' }: ButtonProps) => {
  const buttonBackground = bgColor === 'primary' ? 'btn bg-[#1c2024] text-white' : 'btn border-[#D6D8DB]  bg-[#D6D8DB] btn-outline text-[#121316] hover:bg-slate-300 hover:border-[#D6D8DB]';

  return (
    <button data-testid="btn"  className={`text-[18px] px-[20px] py-[16px] rounded-[8px] items-center  hover:bg-slate-700 ${buttonBackground}`} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};
export default CustomButton;