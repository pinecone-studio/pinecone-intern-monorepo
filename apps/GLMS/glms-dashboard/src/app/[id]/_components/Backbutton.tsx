'use client';
import { ArrowBackIcon } from '../../../../public/assets/ArrowBackIcon';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button data-testid="prev-button-test-id" data-cy="prev-button-test-id" onClick={onClick} className="flex justify-center items-center rounded-[8px] gap-[2px] w-[99px] ease-in dark:text-[#dedede]">
      <ArrowBackIcon />
      Буцах
    </button>
  );
};

export default BackButton;
