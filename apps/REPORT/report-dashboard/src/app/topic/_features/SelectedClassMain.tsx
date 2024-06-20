import { SelectedClassHeader } from '../_components/SelectedClassHeader';
import { SelectDashboard } from './SelectDashboard';

export const SelectedClassMain = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-between gap-4 h-[136px] items-end">
          <SelectedClassHeader text={'Class'} students={25} />
        </div>
        <SelectDashboard />
      </div>
    </div>
  );
};
