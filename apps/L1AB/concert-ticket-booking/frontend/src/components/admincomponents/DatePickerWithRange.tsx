'use client';
import { useState } from 'react';

interface DatePickerProps {
  value: string[];
  onChange: (_dates: string[]) => void;
}

export const DatePickerWithRange: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [date, setDate] = useState<Date>(value && value[0] ? new Date(value[0]) : new Date());

  const handleDateChange = (selectedDate: string) => {
    const newDate = new Date(selectedDate);
    setDate(newDate);
    onChange([newDate.toISOString().split('T')[0]]);
  };

  return (
    <div>
      <input className="dark:bg-white " data-testid="datepicker" type="date" value={date.toISOString().split('T')[0]} onChange={(e) => handleDateChange(e.target.value)} />
    </div>
  );
};
