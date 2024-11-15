import { TimePicker } from '@/components/TimePicker';
import { fireEvent, render } from '@testing-library/react';

describe('Time Picker', () => {
  it('should render hours successfully', () => {
    const { getByTestId, getAllByTestId } = render(<TimePicker />);
    const hourPick = getByTestId('time-picker');
    fireEvent.keyDown(hourPick, { key: 'Enter' });
    const time = getAllByTestId('hour');
    fireEvent.keyDown(time[0], { key: 'Enter' });
    const hourPick2 = getByTestId('time-picker');
    fireEvent.keyDown(hourPick2, { key: 'Enter' });
    const time2 = getAllByTestId('hour');
    fireEvent.keyDown(time2[1], { key: 'Enter' });
  });
  it('should render minutes successfully', () => {
    const { getByTestId, getAllByTestId } = render(<TimePicker />);
    const minutePick = getByTestId('minute-picker');
    fireEvent.keyDown(minutePick, { key: 'Enter' });
    const time = getAllByTestId('minute');
    fireEvent.keyDown(time[0], { key: 'Enter' });
    const minutePick2 = getByTestId('minute-picker');
    fireEvent.keyDown(minutePick2, { key: 'Enter' });
    const time2 = getAllByTestId('minute');
    fireEvent.keyDown(time2[1], { key: 'Enter' });
  });
});
