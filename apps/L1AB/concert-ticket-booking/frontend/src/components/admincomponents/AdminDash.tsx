'use client';
import { useState } from 'react';
import { AddEventComponent } from './AddEventComponent';
import { AdminDashboard } from './AdminDashboard';
import { AdminSearcher } from './AdminDashboardSearcher';

export const AdminDash = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <div data-testid="Admin-Dash" className="admin-dash py-9">
      <div className="flex justify-between w-full text-center text-black h-fit">
        <div className="flex flex-col items-start gap-[1px ]">
          <h3 className="text-lg">Тасалбар</h3>
          <p className="text-sm text-[#71717A]">Идэвхитэй зарагдаж буй тасалбарууд</p>
        </div>
        <AddEventComponent />
      </div>
      <div className="border-t-[1px] my-6"></div>

      <AdminSearcher setSearchValue={setSearchValue} setSelectedValues={setSelectedValues} selectedValues={selectedValues} date={date} setDate={setDate} />

      <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} eventStatus={''} />
    </div>
  );
};
