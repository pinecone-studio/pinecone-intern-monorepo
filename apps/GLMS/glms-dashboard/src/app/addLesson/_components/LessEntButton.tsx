import { WhiteArrow } from '@/app/icons';
import { Button } from '@/components/ui/button';

interface LessEntButtonProps {
  isFormValid: boolean;
  inputData: {
    title: string;
    details: string;
  };
  thumbnail: string;
}

export const LessEntButton: React.FC<LessEntButtonProps> = ({ isFormValid, inputData, thumbnail }) => {
  const handler = () => {
    console.log('data', inputData, thumbnail);
  };

  return (
    <div data-testid="continue button" className="flex justify-center pt-[124px]">
      <Button onClick={handler} className={`px-[62px] py-[28px] ${isFormValid ? 'bg-[#121316]' : 'bg-gray-900'} text-white`} disabled={!isFormValid}>
        <p className="pr-[33px] text-base font-semibold leading-6 tracking-tighter">Үргэлжлүүлэх</p>
        <WhiteArrow />
      </Button>
    </div>
  );
};
