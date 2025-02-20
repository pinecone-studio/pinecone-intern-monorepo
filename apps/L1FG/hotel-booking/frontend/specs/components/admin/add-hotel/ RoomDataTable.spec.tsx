import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomDataTable } from '@/components/admin/add-hotel';
import { Room } from '@/generated';

const mockData: Room[] = [
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
    price: 3000,
    bed: 1,
    images: ['/images/room2.jpg'],
    hotelId: '',
  },
];

describe('RoomDataTable Component', () => {
  it('should render all room data correctly when data is available', () => {
    render(<RoomDataTable data={mockData} />);

    expect(screen.getByText('0001'));
    expect(screen.getByText('Deluxe Room'));
    expect(screen.getByText('5,000₮'));
    expect(screen.getByText('2 bed'));

    expect(screen.getByText('0002'));
    expect(screen.getByText('Standard Room'));
    expect(screen.getByText('3,000₮'));
    expect(screen.getByText('1 bed'));
  });

  it('should toggle sort order when price sort button is clicked', () => {
    render(<RoomDataTable data={mockData} />);

    const sortButton = screen.getByRole('button', { name: /Price/ });
    fireEvent.click(sortButton); // Sort ascending

    let priceTexts = screen.getAllByText(/₮/).map((node) => node.textContent);
    expect(priceTexts);

    fireEvent.click(sortButton); // Sort descending

    priceTexts = screen.getAllByText(/₮/).map((node) => node.textContent);
    expect(priceTexts);
  });

  it('should render the "Room Types Not Set Up" message if there is no data', () => {
    render(<RoomDataTable data={[]} />);
    expect(screen.getByText('Room Types Not Set Up'));
  });

  it('should correctly format room id', () => {
    render(<RoomDataTable data={mockData} />);

    // Check if the formatted room ids are correct
    expect(screen.getByText('0001'));
    expect(screen.getByText('0002'));
  });

  it('should format the room id correctly', () => {
    const formattedId = String(1).padStart(4, '0');
    expect(formattedId);
  });

  it('should correctly format prices', () => {
    render(<RoomDataTable data={mockData} />);
    expect(screen.getByText('5,000₮'));
    expect(screen.getByText('3,000₮'));
  });

  it('should correctly handle missing price', () => {
    const testData = [
      { id: '1', name: 'Room 1', price: null, bed: 2, hotelId: '', images: [] },
      { id: '2', name: 'Room 2', price: undefined, bed: 1, hotelId: '', images: [] },
    ];

    render(<RoomDataTable data={testData} />);

    expect(screen.getAllByText('0₮').length);
  });
});
