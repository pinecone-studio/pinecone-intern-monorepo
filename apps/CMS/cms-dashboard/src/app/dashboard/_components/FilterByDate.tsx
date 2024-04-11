'use client';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '56px',
  width: 'fit-content',
  gap: '10px',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: '#D6D8DB',
  borderRadius: '8px',
  padding: '10px',
};

const dates = {
  color: '#3F4145',
  fontSize: '14px',
  fontWeight: '600',
};

const FilterByUsingCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges: any) => {
    setDate(ranges.selection);
  };

  const displayCalendar = () => {
    setIsOpen((preV) => !preV);
  };

  return (
    <Box sx={{ marginTop: '150px', marginLeft: '200px' }}>
      <Stack alignItems={'center'} flexDirection={'row'} sx={container}>
        <button id="calendar" data-testid="calendar-test-id" onClick={displayCalendar}>
          <CalendarTodayIcon />
        </button>

        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'fit-content', alignItems: 'center', padding: '5px', gap: '3px' }}>
          <Typography sx={dates}>{`${format(date.startDate, 'yyyy.MM.dd')}`}</Typography>
          <Typography sx={dates}>-</Typography>
          <Typography sx={dates}>{`${format(date.endDate, 'yyyy.MM.dd')}`}</Typography>
        </Stack>
      </Stack>

      {isOpen && (
        <Stack data-testid="date-range-picker">
          <DateRangePicker ranges={[date]} onChange={handleChange} />
        </Stack>
      )}
    </Box>
  );
};

export default FilterByUsingCalendar;
