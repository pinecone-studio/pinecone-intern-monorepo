import { Button } from '@/components/ui/button';
import { CircleCheckBig } from 'lucide-react';

const Fifth = () => {
  return (
    <div className="w-[320px] h-screen gap-[24px] text-center flex flex-col">
      <div data-testid="lucide-icon" className="flex items-center justify-center text-green-500">
        <CircleCheckBig width={48} height={48} />
      </div>
      <h1 className="text-[24px] font-semibold">Youre all set!</h1>
      <div className="text-[14px] text-[#71717A]">
        <p>
          Your account is all set. Youre ready to explore <br /> and connect
        </p>
      </div>
      <Button className="w-[127px] self-center h-[40px] bg-[#E11D48] rounded-3xl p-[8px] gap-[8px] hover:bg-red-700">Start Swipping!</Button>
    </div>
  );
};
export default Fifth;
