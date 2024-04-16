'use client';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SortedDataByDate from './SortedDataByDate';
import { useGetAllArticlesQuery } from '../../../generated';

const FilterByUsingCalendar = () => {
  const { data, refetch } = useGetAllArticlesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setDate({
      ...date,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
    });
  };

  const displayCalendar = () => {
    setIsOpen((preV) => !preV);
  };

  return (
    <Box sx={{ marginTop: '150px', marginLeft: '200px' }}>
      <Stack
        alignItems={'center'}
        flexDirection={'row'}
        justifyContent={'center'}
        width={'fit-content'}
        sx={{
          height: '56px',
          gap: '10px',
          border: '2px solid #D6D8DB',
          borderRadius: '8px',
          padding: '10px',
        }}
      >
        <button id="calendar" data-testid="calendar-test-id" onClick={displayCalendar}>
          <CalendarTodayIcon />
        </button>

        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'5px'} gap={'3px'}>
          <Typography color="#3F4145" fontSize={14} fontWeight={600} data-testid="start-date">
            {`${format(date.startDate, 'dd.MM.yyyy')}`}
          </Typography>
          <Typography color="#3F4145" fontSize={14} fontWeight={600}>
            -
          </Typography>
          <Typography data-testid="end-date">{`${format(date.endDate, 'dd.MM.yyyy')}`}</Typography>
        </Stack>
      </Stack>

      {isOpen && (
        <Stack data-testid="date-range-picker">
          <DateRangePicker ranges={[date]} onChange={handleChange} />
        </Stack>
      )}
      <SortedDataByDate data={data} />
    </Box>
  );
};

export default FilterByUsingCalendar;
