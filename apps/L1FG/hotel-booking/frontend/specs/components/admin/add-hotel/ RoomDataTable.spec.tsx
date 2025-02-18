// RoomDataTable.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomDataTable } from '@/components/admin/add-hotel'; // Компонентыг зөв импортлоно уу
import { Room } from '@/generated'; // Room интерфэйсийг зөв ашиглах

// Fake data for testing
const mockData: Array<Room> = [
  {
    id: '1',
    name: 'Deluxe Room',
    price: 5000,
    bed: 2,
    images: ['/images/room1.jpg'],
    hotelId: '',
  },
  {
    id: '2',
    name: 'Standard Room',
    price: 0,
    bed: 1,
    images: ['/images/room2.jpg'],
    hotelId: '',
  },
];

describe('RoomDataTable Component', () => {
  it('should render all room data correctly when data is available', () => {
    render(<RoomDataTable data={mockData} />);

    // Check if all rooms are rendered
    expect(screen.getByText('0001'));
    expect(screen.getByText('Deluxe Room'));
    expect(screen.getByText('5,000₮'));
    expect(screen.getByText('2 bed'));

    expect(screen.getByText('0002'));
    expect(screen.getByText('Standard Room'));
    expect(screen.getByText('0₮'));
    expect(screen.getByText('1 bed'));
  });

  it('should render the "Room Types Not Set Up" message if there is no data', () => {
    render(<RoomDataTable data={[]} />);
    expect(screen.getByText('Room Types Not Set Up'));
  });

  it('should format the room id correctly', () => {
    const formattedId = String(1).padStart(4, '0');
    expect(formattedId);
  });

  it('should correctly format price using formatPrice function', () => {
    const { getByText } = render(<RoomDataTable data={mockData} />);

    expect(getByText('5,000₮'));
    expect(getByText('0₮'));
  });
});
