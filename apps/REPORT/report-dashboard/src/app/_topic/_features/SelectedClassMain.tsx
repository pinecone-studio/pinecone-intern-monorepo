import { SelectedClassHeader } from '../_components';
import { SelectDashboard } from './SelectDashboard';

export const SelectedClassMain = () => {
  return (
    <div className="bg-[#F7F7F8]  ">
      <div className="container mx-auto">
        <div className="flex justify-between gap-4 h-[136px] items-end">
          <SelectedClassHeader text={'Selected Header'} day={'23.05.11 - 24.11.22'} />
        </div>
        <SelectDashboard />
      </div>
    </div>
  );
};
