import { SelectedClassHeader } from '@/app/topic/_components/SelectedClassHeader';
import { SelectDashboard } from '@/app/topic/_features/SelectDashboard';

export const SelectedClassMain = () => {
  return (
    <div className="bg-[#F7F7F8]  ">
      <div className="container mx-auto">
        <div className="flex justify-between gap-4 h-[136px] items-end">
          <SelectedClassHeader text={'Class'} students={25} />
        </div>
        <SelectDashboard />
      </div>
    </div>
  );
};
