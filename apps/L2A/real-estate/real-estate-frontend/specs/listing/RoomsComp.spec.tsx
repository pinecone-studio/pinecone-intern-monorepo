import RoomsComp from '@/app/listing/_components/RoomsComp';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('RoomsComp', () => {
  it('renders Өрөө label and 5 room checkboxes', () => {
    const setTotalRooms = jest.fn();
    render(<RoomsComp totalRooms="" setTotalRooms={setTotalRooms} />);

    expect(screen.getByText('Өрөө')).toBeInTheDocument();
    [1, 2, 3, 4, 5].forEach((room) => {
      expect(screen.getByRole('checkbox', { name: `${room} өрөө` })).toBeInTheDocument();
    });
  });

  it('checkboxes reflect checked state from totalRooms', () => {
    const setTotalRooms = jest.fn();
    render(<RoomsComp totalRooms="2,4" setTotalRooms={setTotalRooms} />);

    expect(screen.getByRole('checkbox', { name: '2 өрөө' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('checkbox', { name: '4 өрөө' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('checkbox', { name: '1 өрөө' })).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles checkbox and calls setTotalRooms correctly', () => {
    const setTotalRooms = jest.fn();
    render(<RoomsComp totalRooms="1,2" setTotalRooms={setTotalRooms} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '3 өрөө' }));
    expect(setTotalRooms).toHaveBeenCalledWith('1,2,3');

    fireEvent.click(screen.getByRole('checkbox', { name: '2 өрөө' }));
    expect(setTotalRooms).toHaveBeenCalledWith('1');
  });

  it('renders with undefined totalRooms (fallback to empty array)', () => {
  const setTotalRooms = jest.fn();
  render(<RoomsComp totalRooms={undefined as any} setTotalRooms={setTotalRooms} />);
  expect(screen.getByText('Өрөө')).toBeInTheDocument();
});

});
