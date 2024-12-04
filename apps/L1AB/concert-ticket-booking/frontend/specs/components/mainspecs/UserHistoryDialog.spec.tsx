import { UserHistoryDialog } from '@/components';
import { fireEvent, render } from '@testing-library/react';

jest.mock('@/generated', () => ({
  useUpdateBookingEverythingMutation: jest.fn(() => [
    jest.fn(), // Mock mutation function
    { loading: false }, // Mock additional return value
  ]),
}));

describe('UserHistoryDialog', () => {
  it('should click tsutslah hvselt ilgeeh button', async () => {
    const { getByTestId } = render(<UserHistoryDialog bookingId="123" />);

    const SelectTrigger = getByTestId('select');
    fireEvent.click(SelectTrigger);

    const NumberInput = getByTestId('NumberInput');
    fireEvent.input(NumberInput, { target: { value: '12345678' } });

    const select = getByTestId('bankName-select');
    fireEvent.keyDown(select, { key: 'Enter' });

    const options = getByTestId('option');
    fireEvent.keyDown(options, { key: 'Enter' });

    const end = getByTestId('end');
    fireEvent.click(end);
  });
});
