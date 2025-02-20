import React from 'react';
export const TimeTest = ({ initialTime = '00:00', onChange = jest.fn() }) => {
  const [time, setTime] = React.useState(initialTime);
  const [hours, minutes] = time.split(':');

  const handleHourChange = (newHour: string) => {
    const newTime = `${newHour}:${minutes}`;
    onChange(newTime);
    setTime(newTime);
  };

  const handleMinuteChange = (newMinute: string) => {
    const newTime = `${hours}:${newMinute}`;
    onChange(newTime);
    setTime(newTime);
  };

  return (
    <div>
      <select data-testid="hour-select" value={hours} onChange={(e) => handleHourChange(e.target.value)}>
        {[...Array(24)].map((_, i) => (
          <option key={i} value={i.toString().padStart(2, '0')}>
            {i.toString().padStart(2, '0')}
          </option>
        ))}
      </select>
      :
      <select data-testid="minute-select" value={minutes} onChange={(e) => handleMinuteChange(e.target.value)}>
        {[...Array(60)].map((_, i) => (
          <option key={i} value={i.toString().padStart(2, '0')}>
            {i.toString().padStart(2, '0')}
          </option>
        ))}
      </select>
      <div data-testid="time-display">{time}</div>
    </div>
  );
};
