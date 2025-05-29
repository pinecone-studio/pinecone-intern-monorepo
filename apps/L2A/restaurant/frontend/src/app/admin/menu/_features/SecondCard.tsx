import { Card } from '@/components/ui/card';
import MenuManageTab from './MenuManageTab';
import MenuDialog from './MenuDialog';

const SecondCard = () => {
  return (
    <div>
      <Card data-testid="dialog" className="flex flex-col justify-center w-[600px] px-10 pt-10 mt-4 mb-10 pb-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl">Цэс удирдах</p>
          <MenuDialog />
        </div>
        <MenuManageTab />
      </Card>
    </div>
  );
};

export default SecondCard;