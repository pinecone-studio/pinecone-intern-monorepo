import { SelectedClassHeader } from '@/app/topic/_components/SelectedClassHeader';
import { SelectDashboard } from '@/app/topic/_features/SelectDashboard';

export const SelectedClassMain = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-between gap-4 h-[136px] items-end">
          <SelectedClassHeader text={'Сурагч'} students={25} />
        </div>
        <SelectDashboard />
      </div>
    </div>
  );
};
