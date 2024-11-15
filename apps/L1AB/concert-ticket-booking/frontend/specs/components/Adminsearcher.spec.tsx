import { render,  fireEvent, } from '@testing-library/react';
import { AdminSearcher } from '@/components/AdminDashboardSearcher';

jest.mock('@/components/ui/calendar', () => ({
    Calendar: ({ onSelect}: { onSelect: (_: Date) => void}) => (
      <div data-testid="calendar">
        <button onClick={() => onSelect(new Date())}>
          Select Date
        </button>
      </div>
    ),
  }));
describe('AdminSearcher Component', () => {
  it('should successfully render', () => {
    const { getByTestId, getAllByTestId } = render(<AdminSearcher />);

    const select = getByTestId('admin-searcher-select');
    fireEvent.keyDown(select, { key: 'Enter' });

    const options = getAllByTestId('option');
    fireEvent.keyDown(options[0], { key: 'Enter' });

    const select2 = getByTestId('admin-searcher-select');
    fireEvent.keyDown(select2, { key: 'Enter' });

    const optionsSecond = getAllByTestId('option');
    fireEvent.keyDown(optionsSecond[1], { key: 'Enter' });

    const select3 = getByTestId('admin-searcher-select');
    fireEvent.keyDown( select3, { key: 'Enter' });
    
    const optionsThird = getAllByTestId('option');
    fireEvent.keyDown(optionsThird[0], { key: 'Enter' });
  });

  it('should successfully render', () => {
    const { getByTestId } = render(<AdminSearcher />);

    const clearbtn = getByTestId('clear-btn');

    fireEvent.click(clearbtn);
  });
it('should successfully render and display placeholder for date when no date is selected', () => {
    const { getByTestId } = render(<AdminSearcher />);
    const dateButton = getByTestId('choose-date-id');
    fireEvent.click(dateButton);

    const calendar = getByTestId('calendar');
    fireEvent.click(calendar);
  });
})
