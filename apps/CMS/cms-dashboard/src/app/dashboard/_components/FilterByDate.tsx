'use client';
import { useCallback, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

    const formmatedStartDate = format(rangeDate?.selection?.startDate?? new Date(), 'yyyy.MM.dd');
    const formmatedEndDate = format(rangeDate.selection.endDate ?? new Date(), 'yyyy.MM.dd');

    router.push(pathName + '?' + createQueryString(formmatedStartDate, formmatedEndDate));
  };

  const createQueryString = useCallback(
    (firstDate: string, lastDate: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('start-from', firstDate);
      params.set('to', lastDate);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <Stack position={'relative'}>
      <Stack width={'fit-content'} direction={'row'} justifyContent={'center'} alignItems={'center'} height={56} gap={'10px'} border={'2px solid #D6D8DB'} borderRadius={'8px'} padding={'10px'}>
        <Button data-testid="open-calendar-button-test-id" onClick={openCalendar} sx={{ color: '#3F4145' }}>
          <CalendarTodayIcon />
        </Button>
        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'5px'} gap={'3px'}>
          <Typography color="#3F4145" fontSize={14} fontWeight={600}>{`${format(startDate ?? new Date(), 'dd.MM.yyyy')}`}</Typography>
          <Typography color="#3F4145" fontSize={14} fontWeight={600}>
            -
          </Typography>
          <Typography color="#3F4145" fontSize={14} fontWeight={600}>{`${format(endDate ?? new Date(), 'dd.MM.yyyy')}`}</Typography>
        </Stack>
      </Stack>
      {open && (
        <Stack position={'absolute'} height={'100%'} right={0} top={'56px'}>
          <Stack>
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
            <Button data-testid="close-calendar-button-test-id" onClick={openCalendar} sx={{ color: '#3F4145', width: '100%' }}>
              Close
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
