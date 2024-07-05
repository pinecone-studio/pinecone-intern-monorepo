import { WhiteArrow } from '@/app/icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CourseEntButtonProps {
  isFormValid: boolean;
  handleCreateMutation: () => void;
}

export const CourseEntButton: React.FC<CourseEntButtonProps> = ({ handleCreateMutation, isFormValid }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      handleCreateMutation();
      router.push('/');
    } catch (error) {
      console.error('Error during mutation or navigation:', error);
    }
  };

  return (
    <div data-testid="continue button" className="flex justify-center pt-[124px]">
      <Button onClick={handleClick} className={`px-[62px] py-[28px] ${isFormValid ? 'bg-[#121316]' : 'bg-gray-900'} text-white`} disabled={!isFormValid}>
        <p className="pr-[33px] text-base font-semibold leading-6 tracking-tighter">Үргэлжлүүлэх</p>
        <WhiteArrow />
      </Button>
    </div>
  );
};
