'use client';
import { PayrollButton, PayrollModal } from '../_components';
import { ComboboxDemo } from '../../../shadcn/Combobox';
import { ComboboxDemo2 } from '../../../shadcn/Combobox2';

export const PayrollMain = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-[10px]">
          <ComboboxDemo />
          <ComboboxDemo2 />
        </div>
        <PayrollModal />
      </div>

      {/* <PayrollButton text={'Payroll button'} /> */}
    </div>
  );
};
