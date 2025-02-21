import { ChooseRoom } from '@/components/user/hotel-detail';
import { Room } from '@/generated';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock `useRouter` from Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: '/test',
    query: {},
    asPath: '/test',
  }),
}));

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock QueryState
}));

describe('ChooseRoom Component', () => {
  const mockRooms: (Room | null)[] = [
    { id: '1', bed: 1, hotelId: '', images: [] },
    { id: '2', bed: 2, hotelId: '', images: [] },
    { id: '3', bed: 3, hotelId: '', images: [] },
    { id: '4', bed: 1, hotelId: '', images: [] },
    { id: '5', bed: 2, hotelId: '', images: [] },
    { id: '6', bed: 3, hotelId: '', images: [] },
  ];

  it('should render ChooseRoom successfully', () => {
    render(<ChooseRoom hotelRoomData={mockRooms} />);
    expect(screen.getByText('Choose your room')).toBeInTheDocument();
  });

  it('should render all rooms by default', () => {
    render(<ChooseRoom hotelRoomData={mockRooms} />);
    expect(screen.getAllByTestId('room-card')).toHaveLength(mockRooms.length);
  });

  it('should filter rooms when clicking tabs', () => {
    render(<ChooseRoom hotelRoomData={mockRooms} />);

    fireEvent.click(screen.getByText('1 bed'));
    expect(screen.getAllByTestId('room-card')).toHaveLength(2); // 1-bed rooms

    fireEvent.click(screen.getByText('2 bed'));
    expect(screen.getAllByTestId('room-card')).toHaveLength(2); // 2-bed rooms

    fireEvent.click(screen.getByText('+3 bed'));
    expect(screen.getAllByTestId('room-card')).toHaveLength(2); // 3-bed rooms
  });

  it('should handle empty hotelRoomData gracefully', () => {
    render(<ChooseRoom hotelRoomData={[]} />);
    expect(screen.queryAllByTestId('room-card')).toHaveLength(0); // No rooms
  });
});
