'use client';
import { useCallback, useState } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const FilterByDate = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const openCalendar = () => setOpen((prev) => !prev);

  const handleDateChange = (rangeDate: RangeKeyDict) => {
    setStartDate(rangeDate.selection.startDate);
    setEndDate(rangeDate.selection.endDate);

    const formmatedStartDate = format(rangeDate?.selection?.startDate ?? new Date(), 'yyyy.MM.dd');
    const formmatedEndDate = format(rangeDate.selection.endDate ?? new Date(), 'yyyy.MM.dd');

    router.push(pathName + '?' + createQueryString(formmatedStartDate, formmatedEndDate));
  };

  const createQueryString = useCallback(
    (firstDate: string, lastDate: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('startDate', firstDate);
      params.set('endDate', lastDate);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <section data-cy="filter-by-date-cy-id" className="relative bg-white overflow-hidden rounded-[12px] border">
      <div className="w-fit flex flex-row justify-center items-center h-[56px] gap-4 border border-solid  p-[10px] px-6" style={{ borderColor: '#D6D8DB' }}>
        <button data-testid="open-calendar-button-test-id" onClick={openCalendar} style={{ color: '#3F4145' }}>
          &#128467;
        </button>
        <div className="flex-row flex justify-between items-center p-[5px] gap-[3px]">
          <h5 className="text-[#3F4145] text-sm font-semibold">{`${format(startDate ?? new Date(), 'dd.MM.yyyy')}`}</h5>
          <h5 className="text-[#3F4145] text-sm font-semibold">-</h5>
          <h5 className="text-[#3F4145] text-sm font-semibold">{`${format(endDate ?? new Date(), 'dd.MM.yyyy')}`}</h5>
        </div>
      </div>
      {open && (
        <div className="absolute h-full right-0 top-[56px] z-[5]">
          <div>
            <DateRangePicker
              retainEndDateOnFirstSelection
              startDatePlaceholder="Start date"
              endDatePlaceholder="End date"
              ranges={[
                {
                  startDate: startDate,
                  endDate: endDate,
                  key: 'selection',
                },
              ]}
              onChange={handleDateChange}
            />
            <button data-testid="close-calendar-button-test-id" onClick={openCalendar} style={{ color: '#3F4145', width: '100%' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
