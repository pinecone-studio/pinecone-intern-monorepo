'use client';
import { ArrowBackIcon } from '../../../../public/assets/ArrowBackIcon';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div data-testid="prev-button-test-id">
      <button onClick={onClick} className="flex justify-center items-center rounded-[8px] gap-[2px] w-[99px] ease-in">
        <ArrowBackIcon />
        <p>Сэдвүүд</p>
      </button>
    </div>
  );
};

export default BackButton;
