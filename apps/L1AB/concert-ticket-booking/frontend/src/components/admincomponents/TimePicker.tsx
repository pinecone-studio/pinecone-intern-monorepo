"use client"
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TimePicker = () => {
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');

  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const minutes = ['00', '10', '20', '30', '40', '50'];

  const handleHourChange = (value: string) => setHour(value);
  const handleMinuteChange = (value: string) => setMinute(value);

  return (
    <div className="flex items-center gap-2">
      <div className="w-1/3">
        <Select value={hour} onValueChange={handleHourChange}>
          <SelectTrigger className="w-full" data-testid="time-picker">
            <SelectValue placeholder="Цаг" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour} data-testid={'hour'}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span className="text-xl">:</span>

      <div className="w-1/3">
        <Select value={minute} onValueChange={handleMinuteChange}>
          <SelectTrigger className="w-full" data-testid="minute-picker">
            <SelectValue placeholder="Минут" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute} data-testid={'minute'}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
