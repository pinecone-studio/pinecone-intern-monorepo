import { WhiteArrow } from '@/app/icons';
import { Button } from '@/components/ui/button';

interface LessEntButtonProps {
  isFormValid: boolean;
}

export const LessEntButton: React.FC<LessEntButtonProps> = ({ isFormValid }) => {
  return (
    <div className="flex justify-center pt-[124px]">
      <Button className={`px-[62px] py-[28px] ${isFormValid ? 'bg-[#121316]' : 'bg-gray-400'} text-white`} disabled={!isFormValid}>
        <p className="pr-[33px] text-base font-semibold leading-6 tracking-tighter">Үргэлжлүүлэх</p>
        <WhiteArrow />
      </Button>
    </div>
  );
};
