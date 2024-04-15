'use client'
import { Box, Stack, Typography } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';

const FilterByUsingCalendar = () => {
  const [isOpen, setIsOpen] = useState(false)
  let startDate = new Date();
  let endDate = new Date();

  const displayCalendar = () => {
    setIsOpen((preV) => !preV);
  };

  const handleChange = (ranges:any) => {
    startDate = ranges.selection.startDate;
    endDate = ranges.selection.endDate;     
    console.log(startDate, "startDate");
    console.log(endDate, "endDate");    
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
            {`${format(startDate, 'dd.MM.yyyy')}`}
          </Typography>
          <Typography color="#3F4145" fontSize={14} fontWeight={600}>
            -
          </Typography>
          <Typography color="#3F4145" fontSize={14} fontWeight={600} data-testid="end-date">
            {`${format(endDate, 'dd.MM.yyyy')}`}
          </Typography>
        </Stack>
      </Stack>

      {isOpen && (
        <Stack data-testid="date-range-picker">
          <DateRangePicker ranges={[{ startDate, endDate, key: 'selection' }]} onChange={handleChange} />
        </Stack>
      )}
    </Box>
  );
};

export default FilterByUsingCalendar;
